import { supabase } from "@/integrations/supabase/client";

const DEMO_ORG_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Get the current user's organization_id from their profile.
 * Uses explicit user_id filter to avoid RLS/PostgREST 406 errors.
 * If no profile exists, creates one with the demo org.
 */
export async function getOrganizationId(): Promise<string> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("user_id", user.id)
    .single();

  if (profile?.organization_id) {
    return profile.organization_id;
  }

  // No profile found — create one with demo org (mirrors Auth.tsx signup flow)
  await supabase.from("profiles").insert({
    user_id: user.id,
    organization_id: DEMO_ORG_ID,
    full_name: user.email?.split("@")[0] || "User",
  });

  return DEMO_ORG_ID;
}

/**
 * Get the current user's profile_id and organization_id.
 * Used by hooks that need both (e.g., evidence upload).
 */
export async function getProfileAndOrgId(): Promise<{ profileId: string; organizationId: string }> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, organization_id")
    .eq("user_id", user.id)
    .single();

  if (profile?.organization_id) {
    return { profileId: profile.id, organizationId: profile.organization_id };
  }

  // No profile — create one
  const { data: newProfile } = await supabase
    .from("profiles")
    .insert({
      user_id: user.id,
      organization_id: DEMO_ORG_ID,
      full_name: user.email?.split("@")[0] || "User",
    })
    .select("id")
    .single();

  return { profileId: newProfile?.id ?? "", organizationId: DEMO_ORG_ID };
}
