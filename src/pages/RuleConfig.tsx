
import { useState } from "react";
import Header, { UserRole } from "@/components/Header";
import { getApprovalRules, setApprovalRules } from "@/utils/approvalRulesStorage";
import { ApprovalRule } from "@/utils/approvalRules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function RuleConfig() {
  const [role, setRole] = useState<UserRole>("Admin");
  const [rules, setRules] = useState<ApprovalRule[]>(getApprovalRules());
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ApprovalRule, "chain"> & { chainStr: string }>({
    threshold: 0,
    departments: [],
    chainStr: "",
  });

  // Only allow Admin
  if (role !== "Admin") {
    return (
      <div>
        <div className="max-w-xl mx-auto p-8 mt-10 text-red-600 font-semibold bg-white rounded shadow">
          Access denied. Only Admins can configure rules.
        </div>
      </div>
    );
  }

  // When editing, populate form
  const onEdit = (idx: number) => {
    setEditingIndex(idx);
    const r = rules[idx];
    setForm({
      threshold: r.threshold,
      departments: r.departments,
      chainStr: r.chain.map(c => c.role).join(", "),
    });
    setShowForm(true);
  };

  // Handle save (add/edit)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const chain = form.chainStr.split(",").map((s) => ({ role: s.trim() })).filter((x) => x.role);
    if (isNaN(form.threshold) || chain.length === 0 || form.departments.length === 0) {
      toast({ title: "Invalid input", description: "Please fill all fields.", duration: 2200});
      return;
    }
    const newRule: ApprovalRule = {
      threshold: Number(form.threshold),
      departments: form.departments.map(d => d.trim()),
      chain,
    };
    let updated;
    if (editingIndex !== null) {
      updated = rules.slice();
      updated[editingIndex] = newRule;
    } else {
      updated = [...rules, newRule];
    }
    setApprovalRules(updated);
    setRules(updated);
    setShowForm(false);
    setEditingIndex(null);
    setForm({ threshold: 0, departments: [], chainStr: "" });
    toast({ title: "Rule saved", duration: 1800 });
  };

  // Remove rule
  const removeRule = (idx: number) => {
    if (!window.confirm("Delete this rule?")) return;
    const updated = rules.filter((_, i) => i !== idx);
    setApprovalRules(updated);
    setRules(updated);
    toast({ title: "Rule removed", duration: 1500 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#e3ebfd] to-[#f7f9fa]">
      <Header role={role} setRole={setRole} />
      <main className="max-w-3xl mx-auto px-8 mt-12 mb-24">
        <div className="bg-white/95 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-risolto-blue">Approval Rules Configuration</h2>
          <div className="mb-4 flex justify-between items-center">
            <span className="text-md text-muted-foreground">
              Add or edit invoice approval routing rules.
            </span>
            <Button onClick={() => { setShowForm(true); setEditingIndex(null); setForm({ threshold: 0, departments: [], chainStr: "" }) }}>
              Add Rule
            </Button>
          </div>
          {/* Rules Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border rounded">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3">Amount Threshold</th>
                  <th className="py-2 px-3">Departments</th>
                  <th className="py-2 px-3">Approval Chain</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-3">${r.threshold}</td>
                    <td className="py-2 px-3">{r.departments.join(", ")}</td>
                    <td className="py-2 px-3">{r.chain.map(c => c.role).join(" > ")}</td>
                    <td className="py-2 px-3">
                      <Button size="sm" className="mr-2" onClick={() => onEdit(i)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => removeRule(i)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Rule form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <form
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                style={{ minWidth: 360 }}
                onSubmit={handleSave}
              >
                <h3 className="text-xl font-bold mb-3">{editingIndex !== null ? "Edit Rule" : "Add Rule"}</h3>
                <div className="mb-4">
                  <label className="font-semibold">Amount Threshold</label>
                  <Input
                    type="number"
                    min={0}
                    value={form.threshold}
                    onChange={e => setForm(f => ({ ...f, threshold: Number(e.target.value) }))}
                    required
                    className="w-full mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Departments (comma separated)</label>
                  <Input
                    type="text"
                    value={form.departments.join(", ")}
                    onChange={e => setForm(f => ({ ...f, departments: e.target.value.split(",") }))}
                    required
                    className="w-full mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold">Approval Chain (comma separated roles)</label>
                  <Input
                    type="text"
                    value={form.chainStr}
                    onChange={e => setForm(f => ({ ...f, chainStr: e.target.value }))}
                    required
                    className="w-full mt-1"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <Button type="submit">{editingIndex !== null ? "Save" : "Add"}</Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingIndex(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
