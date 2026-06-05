import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { resetMockStore } from "@/mocks/fixtures";

// Manual auth credentials (temporary)
const MANUAL_CREDENTIALS = {
  email: "luke@gmail.com",
  password: "pass123",
};

// Manual auth user — full admin access
const MANUAL_USER = {
  id: "manual-user-001",
  email: "luke@gmail.com",
  role: "admin" as const,
  first_name: "Luke",
  last_name: "Admin",
};

export type UserProfile = {
  id?: string;
  user_id: string;
  email: string;
  role: string;
  first_name?: string | null;
  last_name?: string | null;
  is_active?: boolean;
};

let authBridgeInitialized = false;

export function isManualAuthEnabled(): boolean {
  return true; // Toggle to false to use Supabase auth
}

export function getManualUser() {
  const authData = localStorage.getItem("manual_auth");
  if (authData) {
    return JSON.parse(authData).user as typeof MANUAL_USER;
  }
  return null;
}

export function getManualUserProfile(): UserProfile {
  return {
    id: "manual-profile-001",
    user_id: MANUAL_USER.id,
    email: MANUAL_USER.email,
    role: "admin",
    first_name: MANUAL_USER.first_name,
    last_name: MANUAL_USER.last_name,
    is_active: true,
  };
}

function buildManualSupabaseUser(): User {
  const manual = getManualUser() ?? MANUAL_USER;
  return {
    id: manual.id,
    email: manual.email,
    app_metadata: {},
    user_metadata: {
      first_name: manual.first_name,
      last_name: manual.last_name,
      role: manual.role,
    },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
  } as User;
}

function buildManualSession(): Session {
  const user = buildManualSupabaseUser();
  return {
    access_token: "manual-token",
    refresh_token: "manual-refresh",
    expires_in: 60 * 60 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    token_type: "bearer",
    user,
  } as Session;
}

/** Patches supabase.auth so existing getUser/getSession/signOut calls work with manual login */
export function initManualAuthBridge() {
  if (!isManualAuthEnabled() || authBridgeInitialized) return;
  authBridgeInitialized = true;

  const originalGetUser = supabase.auth.getUser.bind(supabase.auth);
  const originalGetSession = supabase.auth.getSession.bind(supabase.auth);
  const originalSignOut = supabase.auth.signOut.bind(supabase.auth);
  const noopSubscription = { unsubscribe: () => {} };

  supabase.auth.onAuthStateChange = (callback) => {
    const manual = getManualUser();
    if (manual) {
      setTimeout(() => callback("SIGNED_IN", buildManualSession()), 0);
    }
    return { data: { subscription: noopSubscription } };
  };

  supabase.auth.getUser = async () => {
    const manual = getManualUser();
    if (manual) {
      return { data: { user: buildManualSupabaseUser() }, error: null };
    }
    return originalGetUser();
  };

  supabase.auth.getSession = async () => {
    const manual = getManualUser();
    if (manual) {
      return { data: { session: buildManualSession() }, error: null };
    }
    return originalGetSession();
  };

  supabase.auth.signOut = async (options) => {
    if (getManualUser()) {
      localStorage.removeItem("manual_auth");
      return { error: null };
    }
    return originalSignOut(options);
  };
}

export async function getAuthUser(): Promise<{ id: string; email?: string } | null> {
  initManualAuthBridge();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function fetchUserProfile(userId?: string): Promise<UserProfile | null> {
  if (isManualAuthEnabled()) {
    const manual = getManualUser();
    if (!manual) return null;
    if (!userId || userId === manual.id) return getManualUserProfile();
    return null;
  }

  initManualAuthBridge();
  const uid = userId ?? (await supabase.auth.getUser()).data.user?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", uid)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function isAdminUser(): Promise<boolean> {
  const profile = await fetchUserProfile();
  return profile?.role === "admin";
}

export async function signInWithEmailPassword(email: string, password: string) {
  if (isManualAuthEnabled()) {
    if (email === MANUAL_CREDENTIALS.email && password === MANUAL_CREDENTIALS.password) {
      const authData = {
        user: MANUAL_USER,
        session: { access_token: "manual-token", user: MANUAL_USER },
      };
      resetMockStore();
      localStorage.setItem("manual_auth", JSON.stringify(authData));
      initManualAuthBridge();
      return authData;
    }
    throw new Error("Invalid email or password");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUpWithEmailPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (isManualAuthEnabled()) {
    localStorage.removeItem("manual_auth");
    resetMockStore();
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession() {
  initManualAuthBridge();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
