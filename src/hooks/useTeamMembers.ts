
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  languages: string[];
  specialization: string;
  active_invoices: number;
  success_rate: number;
  average_resolution_days: number;
  leader_id: string;
};

async function fetchTeamMembers() {
  // Fetches team members for the current leader (the RLS enforces this)
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data as TeamMember[];
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
  });
}
