
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TeamMembersPage() {
  const { data, isLoading, error } = useTeamMembers();

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-tr from-white via-blue-50 to-blue-100">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-600">Error: {error.message}</div>}
          {data && data.length === 0 && <div>No team members assigned to you.</div>}
          {data && data.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Active Invoices</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg. Resolution Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{m.languages.join(", ")}</TableCell>
                      <TableCell>{m.specialization}</TableCell>
                      <TableCell>{m.active_invoices}</TableCell>
                      <TableCell>{(m.success_rate * 100).toFixed(1)}%</TableCell>
                      <TableCell>{m.average_resolution_days}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
