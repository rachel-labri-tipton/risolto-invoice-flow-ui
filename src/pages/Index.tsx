
import { useState } from "react";
import Header, { UserRole } from "@/components/Header";
import AnalyticsCards from "@/components/AnalyticsCards";
import InvoiceTable from "@/components/InvoiceTable";

const DEFAULT_ROLE: UserRole = "Manager";

export default function Index() {
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#e3ebfd] to-[#f7f9fa] pb-24 font-sans">
      <Header role={role} setRole={setRole} />
      <main className="max-w-7xl mx-auto px-8 mt-10">
        <h1 className="text-3xl font-extrabold text-risolto-blue mb-2 tracking-tight">Invoice Dashboard</h1>
        <p className="text-base text-muted-foreground mb-6">
          Overview, analytics, and workflow status of all invoices. Role: <span className="font-semibold capitalize">{role}</span>
        </p>
        <AnalyticsCards />
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-bold">Recent Invoices</h2>
          </div>
          <InvoiceTable role={role} />
        </div>
      </main>
    </div>
  );
}
