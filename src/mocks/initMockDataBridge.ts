import { supabase } from "@/integrations/supabase/client";
import { isManualAuthEnabled } from "@/integrations/supabase/auth";
import { getMockStore } from "./fixtures";
import { mockFrom } from "./mockQueryBuilder";

let initialized = false;

function createMockChannel() {
  const channel: {
    on: () => typeof channel;
    subscribe: (cb?: (status: string) => void) => typeof channel;
  } = {
    on: () => channel,
    subscribe: (cb?: (status: string) => void) => {
      setTimeout(() => cb?.("SUBSCRIBED"), 0);
      return channel;
    },
  };
  return channel;
}

/** Intercept Supabase data calls when manual demo auth is active */
export function initMockDataBridge() {
  if (!isManualAuthEnabled() || initialized) return;
  initialized = true;

  const client = supabase as typeof supabase & {
    from: typeof supabase.from;
    rpc: typeof supabase.rpc;
    channel: typeof supabase.channel;
    removeChannel: typeof supabase.removeChannel;
  };

  client.from = ((table: string) => mockFrom(table)) as typeof supabase.from;

  const originalRpc = supabase.rpc.bind(supabase);
  client.rpc = ((fn: string, params?: Record<string, unknown>) => {
    const store = getMockStore();

    if (fn === "get_all_users_for_eod") {
      return Promise.resolve({ data: store.user_profiles, error: null });
    }
    if (fn === "create_admin_profile") {
      return Promise.resolve({ data: null, error: null });
    }
    if (fn === "generate_invoice_number" || fn.includes("invoice")) {
      return Promise.resolve({ data: "WS-2025-DEMO-001", error: null });
    }

    return originalRpc(fn, params);
  }) as typeof supabase.rpc;

  client.channel = (() => createMockChannel()) as typeof supabase.channel;
  client.removeChannel = (() => {}) as typeof supabase.removeChannel;

  const storageFrom = supabase.storage.from.bind(supabase.storage);
  supabase.storage.from = ((bucket: string) => ({
    upload: async (path: string) => ({ data: { path: `${bucket}/${path}` }, error: null }),
    getPublicUrl: (path: string) => ({
      data: { publicUrl: `https://placehold.co/800x600/1a1a1a/d4af5c?text=White+Sands+Demo` },
    }),
    download: async () => ({ data: new Blob(["demo"]), error: null }),
    remove: async () => ({ data: [], error: null }),
    list: async () => ({ data: [], error: null }),
    createSignedUrl: async () => ({
      data: { signedUrl: "https://placehold.co/800x600?text=Demo" },
      error: null,
    }),
  })) as typeof supabase.storage.from;
}
