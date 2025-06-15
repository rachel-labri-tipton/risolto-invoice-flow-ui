
import { UserRole } from "./Header";

export default function RoleGate({
  role,
  allow,
  children,
}: {
  role: UserRole;
  allow: UserRole[];
  children: React.ReactNode;
}) {
  return allow.includes(role) ? <>{children}</> : null;
}
