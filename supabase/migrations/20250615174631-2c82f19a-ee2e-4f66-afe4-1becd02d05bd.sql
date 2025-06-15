
-- 1. Add a leader_id column for mapping each team member to their leader (uses the leader's user id)
ALTER TABLE public.team_members
  ADD COLUMN leader_id uuid NOT NULL;

-- 2. Enable RLS on team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Team leaders can only view their own team members (where their user_id = leader_id)
CREATE POLICY "Team leaders can view their team members only"
  ON public.team_members
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = leader_id);

-- Note: Auth must be set up for this to work (users must be logged in)
