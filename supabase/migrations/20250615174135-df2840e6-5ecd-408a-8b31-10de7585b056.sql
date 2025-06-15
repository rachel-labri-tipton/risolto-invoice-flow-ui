
CREATE TABLE public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  specialization TEXT NOT NULL,
  active_invoices INT NOT NULL,
  success_rate FLOAT NOT NULL,
  average_resolution_days INT NOT NULL
);
