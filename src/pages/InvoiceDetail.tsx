
import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "@/hooks/useInvoices";
import Header, { UserRole } from "@/components/Header";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import RoleGate from "@/components/RoleGate";

const ROLES = ["Admin", "Manager", "Processor", "Viewer"] as const;

export default function InvoiceDetail() {
  const [role, setRole] = useState<UserRole>("Manager");
  const { invoiceId } = useParams();
  const { getInvoices, updateInvoiceStatus } = useInvoices();
  const navigate = useNavigate();

  const invoice = getInvoices().find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-lg text-red-600 font-semibold">
          Invoice not found. <a href="/" className="text-risolto-blue hover:underline">Return to dashboard.</a>
        </div>
      </div>
    );
  }

  function handleApprove() {
    updateInvoiceStatus(invoice.id, "approved", role);
    toast({ title: "Invoice Approved", description: invoice.id, duration: 2500 });
    navigate("/");
  }

  function handleReject() {
    updateInvoiceStatus(invoice.id, "rejected", role, "See details.");
    toast({ title: "Invoice Rejected", description: invoice.id, duration: 2500 });
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#e3ebfd] to-[#f7f9fa] font-sans">
      <Header role={role} setRole={setRole} />
      <main className="max-w-4xl mx-auto px-8 mt-10">
        <div className="bg-white/95 shadow-lg rounded-xl p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-risolto-blue mb-1">{invoice.vendor} <span className="text-lg text-muted-foreground">({invoice.id})</span></h2>
            <div className="text-base text-muted-foreground font-medium mb-2">Status: <span className="capitalize">{invoice.status}</span></div>
            <div className="flex gap-6 text-base font-medium">
              <div>Amount: <span className="font-semibold">${invoice.amount.toFixed(2)}</span></div>
              <div>Date: {invoice.date}</div>
              <div>Uploaded By: {invoice.uploadedBy}</div>
            </div>
            <div className="flex gap-3 mt-4">
              <RoleGate role={role} allow={["Admin", "Manager"]}>
                {invoice.status === "pending" && (
                  <>
                    <button onClick={handleApprove} className="bg-green-600 text-white px-5 py-2 rounded font-semibold shadow hover:bg-green-700 transition">Approve</button>
                    <button onClick={handleReject} className="bg-red-600 text-white px-5 py-2 rounded font-semibold shadow hover:bg-red-700 transition">Reject</button>
                  </>
                )}
              </RoleGate>
            </div>
          </div>
          <div>
            <div className="text-base font-bold mb-2">Approval Timeline</div>
            <WorkflowTimeline invoice={invoice} />
          </div>
        </div>
      </main>
    </div>
  );
}
