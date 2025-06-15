
import { useInvoices, Invoice } from "@/hooks/useInvoices";
import { Link } from "react-router-dom";
import { BadgeCheck, Ban } from "lucide-react";
import { UserRole } from "./Header";
import RoleGate from "./RoleGate";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function InvoiceTable({ role }: { role: UserRole }) {
  const { getInvoices } = useInvoices();
  const invoices = getInvoices().slice(0, 10);

  return (
    <div className="shadow-md rounded-xl overflow-x-auto border bg-white/95">
      <table className="w-full text-left font-medium">
        <thead>
          <tr className="bg-risolto-blue-light uppercase text-xs text-risolto-blue font-extrabold">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Vendor</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Uploaded By</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-t hover:bg-risolto-blue-light/80 transition">
              <td className="px-4 py-3">{inv.id}</td>
              <td className="px-4 py-3">{inv.vendor}</td>
              <td className="px-4 py-3">${inv.amount.toFixed(2)}</td>
              <td className="px-4 py-3">{inv.date}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded font-semibold text-xs ${statusColors[inv.status]}`}>
                  {inv.status}
                </span>
              </td>
              <td className="px-4 py-3">{inv.uploadedBy}</td>
              <td className="px-4 py-3">
                <Link
                  to={`/invoice/${inv.id}`}
                  className="inline-flex items-center gap-1 text-risolto-blue hover:underline"
                >
                  View
                </Link>
                <RoleGate role={role} allow={["Admin", "Manager"]}>
                  {inv.status === "pending" && (
                    <span className="ml-2 text-green-600"><BadgeCheck className="inline w-4 h-4" /> Approve</span>
                  )}
                  {inv.status === "pending" && (
                    <span className="ml-2 text-red-600"><Ban className="inline w-4 h-4" /> Reject</span>
                  )}
                </RoleGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
