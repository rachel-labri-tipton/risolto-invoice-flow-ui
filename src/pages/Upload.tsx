
import { useState } from "react";
import Header, { UserRole } from "@/components/Header";
import InvoiceUploadForm from "@/components/InvoiceUploadForm";

const DEFAULT_ROLE: UserRole = "Processor";

export default function Upload() {
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#e3ebfd] to-[#f7f9fa] font-sans">
      <Header role={role} setRole={setRole} />
      <main className="max-w-4xl mx-auto px-8 mt-10">
        <InvoiceUploadForm uploader={role} />
      </main>
    </div>
  );
}
