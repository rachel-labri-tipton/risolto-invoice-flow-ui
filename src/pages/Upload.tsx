
import InvoiceUploadForm from "@/components/InvoiceUploadForm";

export default function Upload() {
  // The header and role selection are handled globally in App.tsx now
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#e3ebfd] to-[#f7f9fa] font-sans">
      <main className="max-w-4xl mx-auto px-8 mt-10">
        <InvoiceUploadForm uploader={undefined} />
      </main>
    </div>
  );
}

