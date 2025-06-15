
import { BarChart3, Clock, FileText, BadgeCheck } from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";

export default function AnalyticsCards() {
  const { getInvoices } = useInvoices();
  const invoices = getInvoices();

  const total = invoices.length;
  const pending = invoices.filter(i => i.status === "pending").length;
  const approved = invoices.filter(i => i.status === "approved").length;
  const review = invoices.filter(i => i.status === "review").length;
  const rejected = invoices.filter(i => i.status === "rejected").length;

  const items = [
    { label: "Total Invoices", value: total, icon: FileText, color: "text-risolto-blue" },
    { label: "Pending", value: pending, icon: Clock, color: "text-yellow-500" },
    { label: "In Review", value: review, icon: BarChart3, color: "text-blue-400" },
    { label: "Approved", value: approved, icon: BadgeCheck, color: "text-green-500" },
    { label: "Rejected", value: rejected, icon: BadgeCheck, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
      {items.map(({ label, value, icon: Icon, color }, idx) => (
        <div key={idx} className="bg-white/90 rounded-xl px-6 py-5 shadow-md flex items-center gap-4 border">
          <div className={`rounded-full bg-risolto-blue-light p-2.5 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">{value}</div>
            <div className="text-xs text-muted-foreground font-medium">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
