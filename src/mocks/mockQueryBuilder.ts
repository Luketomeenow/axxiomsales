import { getMockStore } from "./fixtures";

type Row = Record<string, unknown>;
type Filter = { column: string; op: string; value: unknown };

const FK_EMBED: Record<string, Record<string, { table: string; fk: string }>> = {
  deals: {
    companies: { table: "companies", fk: "company_id" },
    contacts: { table: "contacts", fk: "primary_contact_id" },
  },
  contacts: {
    companies: { table: "companies", fk: "company_id" },
  },
  tasks: {
    deals: { table: "deals", fk: "deal_id" },
    contacts: { table: "contacts", fk: "contact_id" },
    companies: { table: "companies", fk: "company_id" },
  },
  calls: {
    companies: { table: "companies", fk: "related_company_id" },
    contacts: { table: "contacts", fk: "related_contact_id" },
    deals: { table: "deals", fk: "related_deal_id" },
  },
  messages: {
    conversations: { table: "conversations", fk: "conversation_id" },
  },
  emails: {
    companies: { table: "companies", fk: "company_id" },
    contacts: { table: "contacts", fk: "contact_id" },
    deals: { table: "deals", fk: "deal_id" },
  },
  conversation_participants: {
    conversations: { table: "conversations", fk: "conversation_id" },
  },
};

function parseSelectParts(select: string): Array<{ alias: string; table: string; fk?: string; cols: string[] }> {
  const parts: Array<{ alias: string; table: string; fk?: string; cols: string[] }> = [];
  const trimmed = select.replace(/\s+/g, " ").trim();
  if (trimmed === "*") return parts;

  const regex = /(\w+)(?::(\w+))?\s*\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(trimmed)) !== null) {
    const alias = match[1];
    const fk = match[2];
    const cols = match[3].split(",").map((c) => c.trim());
    parts.push({
      alias,
      table: fk ? alias : alias,
      fk,
      cols: cols[0] === "*" ? ["*"] : cols,
    });
  }
  return parts;
}

function pickColumns(row: Row, cols: string[]): Row {
  if (cols.includes("*")) return { ...row };
  const out: Row = {};
  for (const c of cols) {
    if (c in row) out[c] = row[c];
  }
  return out;
}

function embedRelations(table: string, rows: Row[], select: string): Row[] {
  const embeds = parseSelectParts(select);
  if (embeds.length === 0) return rows;

  const store = getMockStore();
  return rows.map((row) => {
    const enriched = { ...row };
    for (const emb of embeds) {
      const fk =
        emb.fk ||
        FK_EMBED[table]?.[emb.alias]?.fk ||
        FK_EMBED[table]?.[emb.table]?.fk ||
        `${emb.table.replace(/s$/, "")}_id`;

      const fkVal = row[fk] ?? row[`${emb.alias}_id`];
      const relatedTable = FK_EMBED[table]?.[emb.alias]?.table || emb.table;
      const related = (store[relatedTable] || []).find((r) => r.id === fkVal);
      enriched[emb.alias] = related ? pickColumns(related, emb.cols) : null;
    }
    return enriched;
  });
}

function applyFilters(rows: Row[], filters: Filter[]): Row[] {
  return rows.filter((row) =>
    filters.every((f) => {
      const val = row[f.column];
      switch (f.op) {
        case "eq":
          return val === f.value;
        case "neq":
          return val !== f.value;
        case "gt":
          return (val as string) > (f.value as string);
        case "gte":
          return (val as string) >= (f.value as string);
        case "lt":
          return (val as string) < (f.value as string);
        case "lte":
          return (val as string) <= (f.value as string);
        case "in":
          return Array.isArray(f.value) && f.value.includes(val);
        case "is":
          return f.value === null ? val == null : val === f.value;
        case "ilike":
          return String(val ?? "").toLowerCase().includes(String(f.value).replace(/%/g, "").toLowerCase());
        default:
          return true;
      }
    })
  );
}

function applyOrder(rows: Row[], column: string, ascending: boolean): Row[] {
  return [...rows].sort((a, b) => {
    const av = a[column];
    const bv = b[column];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return ascending ? cmp : -cmp;
  });
}

export class MockQueryBuilder implements PromiseLike<{ data: unknown; error: null; count?: number | null }> {
  private table: string;
  private selectStr = "*";
  private filters: Filter[] = [];
  private orderCol: string | null = null;
  private orderAsc = true;
  private limitN: number | null = null;
  private head = false;
  private countExact = false;
  private wantSingle = false;
  private wantMaybeSingle = false;
  private mutation: "insert" | "update" | "delete" | "upsert" | null = null;
  private payload: Row | Row[] | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string, options?: { count?: "exact"; head?: boolean }) {
    if (options?.head) this.head = true;
    if (options?.count === "exact") this.countExact = true;
    this.selectStr = columns;
    return this;
  }

  insert(data: Row | Row[]) {
    this.mutation = "insert";
    this.payload = data;
    return this;
  }

  update(data: Row) {
    this.mutation = "update";
    this.payload = data;
    return this;
  }

  upsert(data: Row | Row[]) {
    this.mutation = "upsert";
    this.payload = data;
    return this;
  }

  delete() {
    this.mutation = "delete";
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters.push({ column, op: "eq", value });
    return this;
  }

  neq(column: string, value: unknown) {
    this.filters.push({ column, op: "neq", value });
    return this;
  }

  gt(column: string, value: unknown) {
    this.filters.push({ column, op: "gt", value });
    return this;
  }

  gte(column: string, value: unknown) {
    this.filters.push({ column, op: "gte", value });
    return this;
  }

  lt(column: string, value: unknown) {
    this.filters.push({ column, op: "lt", value });
    return this;
  }

  lte(column: string, value: unknown) {
    this.filters.push({ column, op: "lte", value });
    return this;
  }

  in(column: string, values: unknown[]) {
    this.filters.push({ column, op: "in", value: values });
    return this;
  }

  is(column: string, value: unknown) {
    this.filters.push({ column, op: "is", value });
    return this;
  }

  ilike(column: string, pattern: string) {
    this.filters.push({ column, op: "ilike", value: pattern });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderCol = column;
    this.orderAsc = options?.ascending !== false;
    return this;
  }

  limit(n: number) {
    this.limitN = n;
    return this;
  }

  single() {
    this.wantSingle = true;
    return this;
  }

  maybeSingle() {
    this.wantMaybeSingle = true;
    return this;
  }

  then<TResult1 = { data: unknown; error: null; count?: number | null }, TResult2 = never>(
    onfulfilled?: ((value: { data: unknown; error: null; count?: number | null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  private execute(): Promise<{ data: unknown; error: null; count?: number | null }> {
    const store = getMockStore();
    if (!store[this.table]) {
      store[this.table] = [];
    }

    let rows = [...(store[this.table] as Row[])];

    if (this.mutation === "insert" && this.payload) {
      const items = Array.isArray(this.payload) ? this.payload : [this.payload];
      const inserted = items.map((item, i) => ({
        id: (item.id as string) || `mock-${this.table}-${Date.now()}-${i}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...item,
      }));
      store[this.table].push(...inserted);
      return Promise.resolve({ data: Array.isArray(this.payload) ? inserted : inserted[0], error: null });
    }

    if (this.mutation === "update" && this.payload) {
      const tableRows = store[this.table] as Row[];
      const updated: Row[] = [];
      tableRows.forEach((row) => {
        if (applyFilters([row], this.filters).length) {
          Object.assign(row, this.payload, { updated_at: new Date().toISOString() });
          updated.push(row);
        }
      });
      return Promise.resolve({
        data: this.wantSingle || this.wantMaybeSingle ? updated[0] ?? null : updated,
        error: null,
      });
    }

    if (this.mutation === "delete") {
      const tableRows = store[this.table] as Row[];
      const toRemove = applyFilters([...tableRows], this.filters);
      const removeIds = new Set(toRemove.map((r) => r.id));
      store[this.table] = tableRows.filter((r) => !removeIds.has(r.id));
      return Promise.resolve({ data: null, error: null });
    }

    if (this.mutation === "upsert" && this.payload) {
      const items = Array.isArray(this.payload) ? this.payload : [this.payload];
      for (const item of items) {
        const idx = (store[this.table] as Row[]).findIndex((r) => r.id === item.id);
        if (idx >= 0) Object.assign(store[this.table][idx], item);
        else store[this.table].push({ id: `mock-${this.table}-${Date.now()}`, ...item });
      }
      return Promise.resolve({ data: items, error: null });
    }

    rows = applyFilters(rows, this.filters);

    if (this.head && this.countExact) {
      return Promise.resolve({ data: null, error: null, count: rows.length });
    }

    if (this.orderCol) {
      rows = applyOrder(rows, this.orderCol, this.orderAsc);
    }

    const totalCount = rows.length;

    if (this.limitN != null) {
      rows = rows.slice(0, this.limitN);
    }

    if (this.selectStr !== "*" && !this.head) {
      const topLevelCols = this.selectStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => !s.includes("("));
      if (topLevelCols.length > 0 && topLevelCols[0] !== "*") {
        rows = rows.map((r) => pickColumns(r, topLevelCols));
      }
      rows = embedRelations(this.table, rows, this.selectStr);
    }

    if (this.wantSingle) {
      if (rows.length !== 1) {
        return Promise.resolve({ data: null, error: null });
      }
      return Promise.resolve({ data: rows[0], error: null, count: this.countExact ? totalCount : undefined });
    }

    if (this.wantMaybeSingle) {
      return Promise.resolve({
        data: rows[0] ?? null,
        error: null,
        count: this.countExact ? totalCount : undefined,
      });
    }

    return Promise.resolve({
      data: this.head ? null : rows,
      error: null,
      count: this.countExact ? totalCount : undefined,
    });
  }
}

export function mockFrom(table: string) {
  return new MockQueryBuilder(table);
}
