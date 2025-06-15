import { useState, useMemo } from "react";
import { useInvoices, Invoice } from "@/hooks/useInvoices";
import { Link } from "react-router-dom";
import { BadgeCheck, Ban, Check } from "lucide-react";
import { UserRole } from "./Header";
import RoleGate from "./RoleGate";
import { Button } from "@/components/ui/button";
import InvoiceSearchBar, { InvoiceSearchState } from "./InvoiceSearchBar";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function InvoiceTable({ role }: { role: UserRole }) {
  const { getInvoices, updateInvoiceStatus } = useInvoices();
  const invoices = getInvoices().slice(0, 10);

  // --- Search/filter state ---
  const [search, setSearch] = useState<InvoiceSearchState>({
    query: "",
    date: { from: null, to: null },
    amount: { min: "", max: "" },
  });

  // --- Filtering logic (could be extracted for reuse if needed) ---
  const filtered = useMemo(() => {
    if (!search.query && !search.date.from && !search.date.to && !search.amount.min && !search.amount.max) {
      return invoices;
    }
    return invoices.filter(inv => {
      // Search across text fields
      const q = search.query.trim().toLowerCase();
      const textContent =
        `${inv.id} ${inv.vendor} ${inv.uploadedBy} ${inv.fileName} ${inv.status}`.toLowerCase();

      let queryMatch = !q || textContent.includes(q);

      // Amount filter
      let minOk = !search.amount.min || inv.amount >= parseFloat(search.amount.min);
      let maxOk = !search.amount.max || inv.amount <= parseFloat(search.amount.max);

      // Date filter
      let dateOk = true;
      if (search.date.from) {
        dateOk = new Date(inv.date) >= search.date.from;
      }
      if (search.date.to && dateOk) {
        dateOk = new Date(inv.date) <= search.date.to;
      }

      return queryMatch && minOk && maxOk && dateOk;
    });
  }, [invoices, search]);

  // Bulk approval state
  const [selected, setSelected] = useState<string[]>([]);

  // Helper for visible checkboxes (Managers/Admin, pending invoices)
  const bulkableIds = invoices.filter((i) => i.status === "pending").map(i => i.id);

  // Handle select all/none
  const allSelected = bulkableIds.length > 0 && selected.length === bulkableIds.length;
  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? bulkableIds : []);
  };

  // Handle row select
  const handleRowSelect = (id: string, checked: boolean) => {
    setSelected(prev =>
      checked ? [...prev, id] : prev.filter(sid => sid !== id)
    );
  };

  // Bulk approve
  const handleBulkApprove = () => {
    selected.forEach(id => updateInvoiceStatus(id, "approved", "Manager"));
    setSelected([]);
  };

  // --- Helper to highlight matches ---
  function highlight(text: string, q: string) {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-200">{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </>
    );
  }

  return (
    <div>
      <InvoiceSearchBar value={search} onChange={setSearch} />
      <div className="shadow-md rounded-xl overflow-x-auto border bg-white/95">
        <table className="w-full text-left font-medium">
          <thead>
            <tr className="bg-risolto-blue-light uppercase text-xs text-risolto-blue font-extrabold">
              <th className="px-4 py-3">
                <RoleGate role={role} allow={["Admin", "Manager"]}>
                  {bulkableIds.length > 0 && (
                    <input
                      type="checkbox"
                      aria-label="Select all"
                      checked={allSelected}
                      onChange={e => handleSelectAll(e.target.checked)}
                    />
                  )}
                </RoleGate>
              </th>
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
            {filtered.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-risolto-blue-light/80 transition">
                <td className="px-4 py-3">
                  <RoleGate role={role} allow={["Admin", "Manager"]}>
                    {inv.status === "pending" && (
                      <input
                        type="checkbox"
                        checked={selected.includes(inv.id)}
                        aria-label={`Select invoice ${inv.id}`}
                        onChange={e => handleRowSelect(inv.id, e.target.checked)}
                      />
                    )}
                  </RoleGate>
                </td>
                <td className="px-4 py-3">{highlight(inv.id, search.query)}</td>
                <td className="px-4 py-3">{highlight(inv.vendor, search.query)}</td>
                <td className="px-4 py-3">{highlight(`$${inv.amount.toFixed(2)}`, search.query)}</td>
                <td className="px-4 py-3">{highlight(inv.date, search.query)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded font-semibold text-xs ${statusColors[inv.status]}`}>
                    {highlight(inv.status, search.query)}
                  </span>
                </td>
                <td className="px-4 py-3">{highlight(inv.uploadedBy, search.query)}</td>
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
        {/* Bulk Approve Bar */}
        <RoleGate role={role} allow={["Admin", "Manager"]}>
          {selected.length > 0 && (
            <div className="flex items-center gap-4 px-4 py-2 bg-green-50 border-t">
              <span className="text-sm">
                {selected.length} invoice{selected.length > 1 ? "s" : ""} selected.
              </span>
              <Button
                onClick={handleBulkApprove}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-1" /> Bulk Approve
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                Cancel
              </Button>
            </div>
          )}
        </RoleGate>
      </div>
    </div>
  );
}
