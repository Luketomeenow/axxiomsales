import { MOCK } from "./ids";

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600000).toISOString();
const today = () => new Date().toISOString().split("T")[0];

export type MockTableData = Record<string, Record<string, unknown>[]>;

function buildFixtures(): MockTableData {
  const companies = [
    { id: "mock-co-001", name: "Sunset Hospitality Group", website: "https://sunsethospitality.com", phone: "+1 (702) 555-0101", industry: "Hospitality", employees_count: 240, city: "Las Vegas", state: "NV", country: "USA", timezone: "America/Los_Angeles", created_at: daysAgo(90), updated_at: daysAgo(2), description: "Luxury resort portfolio" },
    { id: "mock-co-002", name: "Coastal Wealth Advisors", website: "https://coastalwealth.com", phone: "+1 (305) 555-0182", industry: "Financial Services", employees_count: 85, city: "Miami", state: "FL", country: "USA", timezone: "America/New_York", created_at: daysAgo(60), updated_at: daysAgo(5) },
    { id: "mock-co-003", name: "Meridian Health Partners", website: "https://meridianhealth.io", phone: "+1 (312) 555-0144", industry: "Healthcare", employees_count: 1200, city: "Chicago", state: "IL", country: "USA", timezone: "America/Chicago", created_at: daysAgo(45), updated_at: daysAgo(1) },
    { id: "mock-co-004", name: "Atlas Logistics LLC", website: "https://atlaslogistics.com", phone: "+1 (469) 555-0199", industry: "Logistics", employees_count: 420, city: "Dallas", state: "TX", country: "USA", timezone: "America/Chicago", created_at: daysAgo(30), updated_at: daysAgo(3) },
    { id: "mock-co-005", name: "Palm Grove Developments", website: "https://palmgrove.dev", phone: "+1 (561) 555-0120", industry: "Real Estate", employees_count: 65, city: "West Palm Beach", state: "FL", country: "USA", timezone: "America/New_York", created_at: daysAgo(20), updated_at: daysAgo(0) },
  ];

  const contacts = [
    { id: "mock-ct-001", first_name: "Sarah", last_name: "Mitchell", email: "sarah.mitchell@sunsethospitality.com", phone: "+1 (702) 555-0102", company_id: "mock-co-001", lifecycle_stage: "customer", city: "Las Vegas", state: "NV", created_at: daysAgo(80), updated_at: daysAgo(2) },
    { id: "mock-ct-002", first_name: "James", last_name: "Chen", email: "jchen@coastalwealth.com", phone: "+1 (305) 555-0183", company_id: "mock-co-002", lifecycle_stage: "lead", city: "Miami", state: "FL", created_at: daysAgo(55), updated_at: daysAgo(4) },
    { id: "mock-ct-003", first_name: "Elena", last_name: "Rodriguez", email: "elena.r@meridianhealth.io", phone: "+1 (312) 555-0145", company_id: "mock-co-003", lifecycle_stage: "opportunity", city: "Chicago", state: "IL", created_at: daysAgo(40), updated_at: daysAgo(1) },
    { id: "mock-ct-004", first_name: "Marcus", last_name: "Thompson", email: "mthompson@atlaslogistics.com", phone: "+1 (469) 555-0200", company_id: "mock-co-004", lifecycle_stage: "lead", created_at: daysAgo(25), updated_at: daysAgo(3) },
    { id: "mock-ct-005", first_name: "Victoria", last_name: "Hayes", email: "vhayes@palmgrove.dev", phone: "+1 (561) 555-0121", company_id: "mock-co-005", lifecycle_stage: "customer", created_at: daysAgo(18), updated_at: daysAgo(0) },
    { id: "mock-ct-006", first_name: "David", last_name: "Park", email: "dpark@sunsethospitality.com", phone: "+1 (702) 555-0108", company_id: "mock-co-001", lifecycle_stage: "lead", created_at: daysAgo(15), updated_at: daysAgo(2) },
  ];

  const user_profiles = [
    { id: MOCK.profileId, user_id: MOCK.userId, email: "luke@gmail.com", first_name: "Luke", last_name: "Admin", role: "admin", is_active: true, phone: "+1 (555) 100-0001", timezone: "America/New_York", created_at: daysAgo(365), updated_at: daysAgo(0), points_balance: 1250 },
    { id: MOCK.profile2Id, user_id: MOCK.user2Id, email: "alex.manager@whitesands.demo", first_name: "Alex", last_name: "Rivera", role: "manager", is_active: true, phone: "+1 (555) 100-0002", timezone: "America/New_York", created_at: daysAgo(200), updated_at: daysAgo(1), points_balance: 890 },
    { id: MOCK.profile3Id, user_id: MOCK.user3Id, email: "sam.rep@whitesands.demo", first_name: "Sam", last_name: "Brooks", role: "rep", is_active: true, phone: "+1 (555) 100-0003", timezone: "America/Chicago", created_at: daysAgo(150), updated_at: daysAgo(2), points_balance: 640 },
    { id: "mock-profile-004", user_id: "mock-user-004", email: "jordan.eod@whitesands.demo", first_name: "Jordan", last_name: "Lee", role: "eod_user", is_active: true, timezone: "America/Los_Angeles", created_at: daysAgo(100), updated_at: daysAgo(1), points_balance: 420 },
  ];

  const pipelines = [
    {
      id: MOCK.pipelineEnterprise,
      name: "Enterprise Sales",
      description: "High-value B2B opportunities",
      is_active: true,
      stages: ["not contacted", "no answer / gatekeeper", "decision maker", "nurturing", "interested", "strategy call booked", "strategy call attended", "proposal / scope", "closed won", "closed lost"],
      stage_order: [
        { name: "Not Contacted", color: "#6b7280" },
        { name: "Interested", color: "#d4af5c" },
        { name: "Proposal / Scope", color: "#3b82f6" },
        { name: "Closed Won", color: "#22c55e" },
      ],
      created_at: daysAgo(300),
      updated_at: daysAgo(10),
    },
    {
      id: MOCK.pipelineOutbound,
      name: "Outbound Funnel",
      description: "Outbound prospecting pipeline",
      is_active: true,
      stages: ["not contacted", "interested", "strategy call booked", "closed won", "closed lost"],
      stage_order: [{ name: "Not Contacted", color: "#6b7280" }, { name: "Closed Won", color: "#22c55e" }],
      created_at: daysAgo(200),
      updated_at: daysAgo(5),
    },
  ];

  const deals = [
    { id: "mock-deal-001", name: "Sunset Resorts — Annual Retainer", stage: "proposal / scope", amount: 185000, priority: "high", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-001", primary_contact_id: "mock-ct-001", deal_status: "open", currency: "USD", account_manager: MOCK.profileId, account_manager_id: MOCK.userId, owner_id: MOCK.userId, close_date: daysAgo(-30), created_at: daysAgo(45), updated_at: daysAgo(1), timezone: "America/Los_Angeles" },
    { id: "mock-deal-002", name: "Coastal Wealth — CRM Rollout", stage: "strategy call attended", amount: 72000, priority: "high", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-002", primary_contact_id: "mock-ct-002", deal_status: "open", account_manager: MOCK.profile2Id, account_manager_id: MOCK.user2Id, created_at: daysAgo(30), updated_at: daysAgo(2) },
    {
      id: "mock-deal-003",
      name: "Meridian — Patient Engagement Suite",
      stage: "interested",
      amount: 240000,
      priority: "high",
      pipeline_id: MOCK.pipelineEnterprise,
      company_id: "mock-co-003",
      primary_contact_id: "mock-ct-003",
      deal_status: "open",
      description: "Enterprise patient engagement platform for 12 clinic locations. Phase 1 covers CRM integration, automated outreach, and executive analytics.",
      annual_revenue: "1M+",
      source: "Referral",
      product_segment: "Remote Operator, AI Adoption",
      deal_owner_id: MOCK.userId,
      setter_id: MOCK.profile3Id,
      account_manager: MOCK.profileId,
      account_manager_id: MOCK.userId,
      currency: "USD",
      timezone: "America/Chicago",
      referral_source: "Healthcare Innovation Summit",
      city: "Chicago",
      state: "IL",
      country: "USA",
      close_date: daysAgo(-45),
      last_activity_date: hoursAgo(2),
      last_contact_date: hoursAgo(2),
      created_at: daysAgo(20),
      updated_at: daysAgo(0),
    },
    { id: "mock-deal-004", name: "Atlas — Fleet Optimization", stage: "decision maker", amount: 95000, priority: "medium", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-004", primary_contact_id: "mock-ct-004", deal_status: "open", created_at: daysAgo(18), updated_at: daysAgo(3) },
    { id: "mock-deal-005", name: "Palm Grove — Sales Enablement", stage: "closed won", amount: 54000, priority: "medium", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-005", primary_contact_id: "mock-ct-005", deal_status: "won", account_manager: MOCK.profile2Id, created_at: daysAgo(60), updated_at: daysAgo(5) },
    { id: "mock-deal-006", name: "Sunset — Phase 2 Expansion", stage: "nurturing", amount: 120000, priority: "medium", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-001", primary_contact_id: "mock-ct-006", deal_status: "open", created_at: daysAgo(12), updated_at: daysAgo(1) },
    { id: "mock-deal-007", name: "Coastal — Outbound Pilot", stage: "not contacted", amount: 28000, priority: "low", pipeline_id: MOCK.pipelineOutbound, company_id: "mock-co-002", primary_contact_id: "mock-ct-002", deal_status: "open", created_at: daysAgo(8), updated_at: daysAgo(2) },
    { id: "mock-deal-008", name: "Meridian — Compliance Module", stage: "strategy call booked", amount: 156000, priority: "high", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-003", primary_contact_id: "mock-ct-003", deal_status: "open", created_at: daysAgo(14), updated_at: daysAgo(0) },
    { id: "mock-deal-009", name: "Atlas — Q2 Implementation", stage: "no answer / gatekeeper", amount: 67000, priority: "low", pipeline_id: MOCK.pipelineOutbound, company_id: "mock-co-004", primary_contact_id: "mock-ct-004", deal_status: "open", created_at: daysAgo(6), updated_at: daysAgo(1) },
    { id: "mock-deal-010", name: "Palm Grove — Referral Program", stage: "closed lost", amount: 32000, priority: "low", pipeline_id: MOCK.pipelineEnterprise, company_id: "mock-co-005", primary_contact_id: "mock-ct-005", deal_status: "lost", created_at: daysAgo(40), updated_at: daysAgo(10) },
  ];

  const tasks = [
    { id: "mock-task-001", title: "Send proposal deck to Sarah", status: "pending", priority: "high", due_date: daysAgo(-1), deal_id: "mock-deal-001", company_id: "mock-co-001", contact_id: "mock-ct-001", assigned_to: MOCK.profileId, created_by: MOCK.profileId, created_at: daysAgo(2), updated_at: daysAgo(0) },
    { id: "mock-task-002", title: "Follow up on strategy call notes", status: "in_progress", priority: "high", due_date: today(), deal_id: "mock-deal-002", company_id: "mock-co-002", assigned_to: MOCK.profile2Id, created_at: daysAgo(3), updated_at: daysAgo(0) },
    { id: "mock-task-003", title: "Schedule demo with Elena", description: "45-minute product walkthrough; send calendar invite after confirmation.", status: "pending", priority: "medium", due_date: daysAgo(-2), deal_id: "mock-deal-003", contact_id: "mock-ct-003", assigned_to: MOCK.profileId, created_at: daysAgo(1), updated_at: daysAgo(1) },
    { id: "mock-task-004", title: "Contract review — Palm Grove", status: "completed", priority: "medium", due_date: daysAgo(3), deal_id: "mock-deal-005", completed_at: daysAgo(4), assigned_to: MOCK.profile2Id, created_at: daysAgo(10), updated_at: daysAgo(4) },
    { id: "mock-task-005", title: "Update pipeline forecast", status: "pending", priority: "low", due_date: daysAgo(-5), assigned_to: MOCK.profileId, created_at: daysAgo(0), updated_at: daysAgo(0) },
  ];

  const calls = [
    { id: "mock-call-001", call_outcome: "connected", call_direction: "outbound", outbound_type: "cold_call", duration_seconds: 420, call_timestamp: hoursAgo(2), related_deal_id: "mock-deal-001", related_contact_id: "mock-ct-001", related_company_id: "mock-co-001", rep_id: MOCK.profileId, notes: "Discussed Q2 scope", created_at: hoursAgo(2), updated_at: hoursAgo(2) },
    { id: "mock-call-002", call_outcome: "connected", call_direction: "outbound", outbound_type: "follow_up", duration_seconds: 180, call_timestamp: hoursAgo(5), related_deal_id: "mock-deal-002", related_contact_id: "mock-ct-002", rep_id: MOCK.profile2Id, created_at: hoursAgo(5), updated_at: hoursAgo(5) },
    { id: "mock-call-003", call_outcome: "no answer", call_direction: "outbound", outbound_type: "cold_call", duration_seconds: 0, call_timestamp: hoursAgo(8), related_deal_id: "mock-deal-009", rep_id: MOCK.profileId, created_at: hoursAgo(8), updated_at: hoursAgo(8) },
    { id: "mock-call-004", call_outcome: "voicemail", call_direction: "outbound", outbound_type: "cold_call", duration_seconds: 45, call_timestamp: hoursAgo(12), related_deal_id: "mock-deal-004", rep_id: MOCK.profile3Id, created_at: hoursAgo(12), updated_at: hoursAgo(12) },
    { id: "mock-call-005", call_outcome: "connected", call_direction: "inbound", outbound_type: "inbound", duration_seconds: 600, call_timestamp: hoursAgo(24), related_deal_id: "mock-deal-003", related_contact_id: "mock-ct-003", rep_id: MOCK.profileId, created_at: hoursAgo(24), updated_at: hoursAgo(24) },
    { id: "mock-call-006", call_outcome: "connected", call_direction: "outbound", outbound_type: "follow_up", duration_seconds: 300, call_timestamp: daysAgo(1), related_deal_id: "mock-deal-005", rep_id: MOCK.profile2Id, created_at: daysAgo(1), updated_at: daysAgo(1) },
    { id: "mock-call-007", call_outcome: "connected", call_direction: "outbound", outbound_type: "cold_call", duration_seconds: 240, call_timestamp: daysAgo(2), related_deal_id: "mock-deal-006", rep_id: MOCK.profileId, created_at: daysAgo(2), updated_at: daysAgo(2) },
    { id: "mock-call-008", call_outcome: "no answer", call_direction: "outbound", outbound_type: "cold_call", duration_seconds: 0, call_timestamp: daysAgo(3), rep_id: MOCK.profile3Id, created_at: daysAgo(3), updated_at: daysAgo(3) },
  ];

  const emails = [
    { id: "mock-email-001", subject: "Proposal — Sunset Resorts Retainer", body: "Hi Sarah, attached is the proposal...", from_email: "luke@gmail.com", to_email: "sarah.mitchell@sunsethospitality.com", status: "sent", deal_id: "mock-deal-001", contact_id: "mock-ct-001", sent_at: hoursAgo(4), opened_at: hoursAgo(3), created_at: hoursAgo(4), updated_at: hoursAgo(3) },
    { id: "mock-email-002", subject: "Re: Strategy call recap", body: "Thanks for your time today...", from_email: "alex.manager@whitesands.demo", to_email: "jchen@coastalwealth.com", status: "opened", deal_id: "mock-deal-002", sent_at: hoursAgo(20), opened_at: hoursAgo(18), created_at: hoursAgo(20), updated_at: hoursAgo(18) },
    { id: "mock-email-003", subject: "Meridian demo scheduling", body: "Elena, here are available slots...", from_email: "luke@gmail.com", to_email: "elena.r@meridianhealth.io", status: "sent", deal_id: "mock-deal-003", sent_at: daysAgo(1), created_at: daysAgo(1), updated_at: daysAgo(1) },
  ];

  const notes = [
    { id: "mock-note-001", content: "Strong interest in annual retainer. Decision by end of month.", note_type: "call", deal_id: "mock-deal-001", contact_id: "mock-ct-001", created_by: MOCK.profileId, created_at: hoursAgo(2), updated_at: hoursAgo(2) },
    { id: "mock-note-002", content: "Needs legal review on MSA before signing.", note_type: "general", deal_id: "mock-deal-002", created_at: daysAgo(1), updated_at: daysAgo(1) },
  ];

  const meetings = [
    { id: "mock-meeting-001", title: "Strategy Call — Coastal Wealth", meeting_type: "strategy_call", scheduled_at: hoursAgo(-24), duration_minutes: 45, deal_id: "mock-deal-002", contact_id: "mock-ct-002", is_booked: true, is_attended: true, scheduled_by: MOCK.profile2Id, created_at: daysAgo(3), updated_at: daysAgo(1) },
    { id: "mock-meeting-002", title: "Demo — Meridian Health", meeting_type: "demo", scheduled_at: hoursAgo(-48), duration_minutes: 60, deal_id: "mock-deal-003", contact_id: "mock-ct-003", is_booked: true, is_attended: false, scheduled_by: MOCK.profileId, created_at: daysAgo(2), updated_at: daysAgo(2) },
  ];

  const conversations = [{ id: "mock-conv-001", created_at: daysAgo(10), updated_at: hoursAgo(1) }];
  const conversation_participants = [
    { id: "mock-cp-001", conversation_id: "mock-conv-001", user_id: MOCK.userId, last_read_at: hoursAgo(2), created_at: daysAgo(10) },
    { id: "mock-cp-002", conversation_id: "mock-conv-001", user_id: MOCK.user2Id, last_read_at: hoursAgo(1), created_at: daysAgo(10) },
  ];
  const messages = [
    { id: "mock-msg-001", conversation_id: "mock-conv-001", sender_id: MOCK.user2Id, content: "Luke, can you review the Sunset proposal before EOD?", created_at: hoursAgo(3), is_read: false },
    { id: "mock-msg-002", conversation_id: "mock-conv-001", sender_id: MOCK.userId, content: "On it — will send feedback within the hour.", created_at: hoursAgo(2), is_read: true },
    { id: "mock-msg-003", conversation_id: "mock-conv-001", sender_id: MOCK.user2Id, content: "Thanks! Meridian demo moved to Thursday.", created_at: hoursAgo(1), is_read: false },
  ];

  const group_chats = [{ id: "mock-gc-001", name: "Sales Team", created_by: MOCK.userId, created_at: daysAgo(30), updated_at: daysAgo(0) }];
  const group_chat_members = [
    { id: "mock-gcm-001", group_id: "mock-gc-001", user_id: MOCK.userId, last_read_at: hoursAgo(4), joined_at: daysAgo(30) },
    { id: "mock-gcm-002", group_id: "mock-gc-001", user_id: MOCK.user2Id, last_read_at: hoursAgo(2), joined_at: daysAgo(30) },
    { id: "mock-gcm-003", group_id: "mock-gc-001", user_id: MOCK.user3Id, last_read_at: daysAgo(1), joined_at: daysAgo(25) },
  ];
  const group_chat_messages = [
    { id: "mock-gmsg-001", group_id: "mock-gc-001", sender_id: MOCK.user2Id, content: "Great week everyone — 3 deals moved to proposal!", created_at: hoursAgo(6) },
    { id: "mock-gmsg-002", group_id: "mock-gc-001", sender_id: MOCK.userId, content: "Palm Grove closed — nice work Alex.", created_at: hoursAgo(5) },
  ];

  const eod_queue_tasks = [
    { id: "mock-eod-q-001", user_id: MOCK.userId, client_name: "Sunset Hospitality Group", task_name: "Proposal finalization", status: "in_progress", priority: "high", estimated_minutes: 90, started_at: hoursAgo(1), created_at: daysAgo(0), updated_at: hoursAgo(0), date: today() },
    { id: "mock-eod-q-002", user_id: MOCK.userId, client_name: "Meridian Health Partners", task_name: "Demo prep & slides", status: "pending", priority: "medium", estimated_minutes: 60, created_at: daysAgo(0), updated_at: daysAgo(0), date: today() },
    { id: "mock-eod-q-003", user_id: MOCK.user3Id, client_name: "Atlas Logistics LLC", task_name: "Discovery call follow-up", status: "completed", priority: "low", estimated_minutes: 30, completed_at: hoursAgo(3), created_at: daysAgo(0), updated_at: hoursAgo(3), date: today() },
  ];

  const eod_clock_ins = [
    { id: "mock-clock-001", user_id: MOCK.userId, clock_in_time: hoursAgo(8), clock_out_time: null, date: today(), created_at: hoursAgo(8) },
    { id: "mock-clock-002", user_id: "mock-user-004", clock_in_time: hoursAgo(7), clock_out_time: null, date: today(), created_at: hoursAgo(7) },
  ];

  const eod_time_entries = [
    { id: "mock-te-001", user_id: MOCK.userId, client_name: "Sunset Hospitality Group", task_name: "Proposal finalization", start_time: hoursAgo(2), end_time: hoursAgo(1), duration_minutes: 60, date: today(), created_at: hoursAgo(2) },
    { id: "mock-te-002", user_id: MOCK.userId, client_name: "Coastal Wealth Advisors", task_name: "CRM rollout planning", start_time: hoursAgo(4), end_time: hoursAgo(3), duration_minutes: 45, date: today(), created_at: hoursAgo(4) },
  ];

  const recurring_task_templates = [
    { id: "mock-rtt-001", user_id: MOCK.userId, title: "Weekly pipeline review", default_client: "Internal", recurrence: "weekly", is_active: true, created_at: daysAgo(30), updated_at: daysAgo(5) },
    { id: "mock-rtt-002", user_id: MOCK.user3Id, title: "Client check-in call", default_client: "Sunset Hospitality Group", recurrence: "daily", is_active: true, created_at: daysAgo(20), updated_at: daysAgo(2) },
  ];

  const eod_submissions = [
    { id: "mock-sub-001", user_id: MOCK.user3Id, submission_date: daysAgo(1), status: "submitted", total_hours: 7.5, created_at: daysAgo(1), updated_at: daysAgo(1) },
    { id: "mock-sub-002", user_id: "mock-user-004", submission_date: daysAgo(1), status: "submitted", total_hours: 8, created_at: daysAgo(1), updated_at: daysAgo(1) },
  ];

  const eod_submission_tasks = [
    { id: "mock-st-001", submission_id: "mock-sub-001", task_name: "Outbound calls", client_name: "Atlas Logistics", hours: 3, created_at: daysAgo(1) },
    { id: "mock-st-002", submission_id: "mock-sub-001", task_name: "Email sequences", client_name: "Coastal Wealth", hours: 2.5, created_at: daysAgo(1) },
  ];

  const eod_submission_images: Record<string, unknown>[] = [];
  const eod_reports: Record<string, unknown>[] = [];
  const eod_report_images: Record<string, unknown>[] = [];

  const admin_notifications = [
    { id: "mock-an-001", type: "eod_submitted", title: "EOD Submitted", message: "Jordan Lee submitted end-of-day report", user_id: "mock-user-004", is_read: false, redirect_url: "/admin", created_at: hoursAgo(2) },
    { id: "mock-an-002", type: "task_started", title: "Task Started", message: "Sam Brooks started Discovery call follow-up", user_id: MOCK.user3Id, is_read: false, created_at: hoursAgo(3) },
    { id: "mock-an-003", type: "clock_in", title: "Clock In", message: "Luke Admin clocked in", user_id: MOCK.userId, is_read: true, created_at: hoursAgo(8) },
  ];

  const user_feedback = [
    { id: "mock-fb-001", user_id: MOCK.user3Id, feedback_type: "feature", content: "Would love calendar sync in DAR portal", status: "open", created_at: daysAgo(5) },
  ];

  const invoices = [
    { id: "mock-inv-001", user_id: MOCK.user3Id, invoice_number: "WS-2025-0042", amount: 2400, status: "paid", period_start: daysAgo(30), period_end: daysAgo(0), created_at: daysAgo(15), updated_at: daysAgo(10) },
  ];

  const points_history = [
    { id: "mock-ph-001", user_id: MOCK.userId, points: 50, reason: "Deal moved to proposal", created_at: daysAgo(1) },
    { id: "mock-ph-002", user_id: MOCK.user3Id, points: 25, reason: "Completed daily tasks", created_at: daysAgo(0) },
  ];

  const mood_entries = [
    { id: "mock-mood-001", user_id: MOCK.userId, mood_score: 4, notes: "Productive morning", created_at: hoursAgo(6) },
  ];

  const energy_entries = [
    { id: "mock-energy-001", user_id: MOCK.userId, energy_level: 4, created_at: hoursAgo(6) },
  ];

  const dialpad_tokens: Record<string, unknown>[] = [];
  const job_postings = [
    { id: "mock-job-001", title: "Account Executive", department: "Sales", location: "Remote", status: "open", created_at: daysAgo(14) },
  ];

  const smart_dar_snapshots: Record<string, unknown>[] = [];
  const user_client_assignments: Record<string, unknown>[] = [];
  const manual_call_logs: Record<string, unknown>[] = [];
  const notification_log: Record<string, unknown>[] = [];
  const survey_events: Record<string, unknown>[] = [];
  const mood_check_ins: Record<string, unknown>[] = [];
  const line_items: Record<string, unknown>[] = [];
  const attachments: Record<string, unknown>[] = [];
  const call_analytics: Record<string, unknown>[] = [];
  const sms_messages: Record<string, unknown>[] = [];
  const task_queues: Record<string, unknown>[] = [];
  const dialpad_webhooks: Record<string, unknown>[] = [];

  return {
    companies,
    contacts,
    user_profiles,
    pipelines,
    deals,
    tasks,
    calls,
    emails,
    notes,
    meetings,
    conversations,
    conversation_participants,
    messages,
    group_chats,
    group_chat_members,
    group_chat_messages,
    eod_queue_tasks,
    eod_clock_ins,
    eod_time_entries,
    recurring_task_templates,
    eod_submissions,
    eod_submission_tasks,
    eod_submission_images,
    eod_reports,
    eod_report_images,
    admin_notifications,
    user_feedback,
    invoices,
    points_history,
    mood_entries,
    energy_entries,
    dialpad_tokens,
    job_postings,
    smart_dar_snapshots,
    user_client_assignments,
    manual_call_logs,
    notification_log,
    survey_events,
    mood_check_ins,
    line_items,
    attachments,
    call_analytics,
    sms_messages,
    task_queues,
    dialpad_webhooks,
  };
}

let store: MockTableData | null = null;

export function getMockStore(): MockTableData {
  if (!store) {
    store = JSON.parse(JSON.stringify(buildFixtures()));
  }
  return store;
}

export function resetMockStore() {
  store = null;
}
