
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoices } from "@/hooks/useInvoices";
import { toast } from "@/hooks/use-toast";

export default function InvoiceUploadForm({ uploader }: { uploader: string }) {
  const [dragOver, setDragOver] = useState(false);
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addInvoice } = useInvoices();
  const navigate = useNavigate();

  function handleFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setPending(true);
    setTimeout(() => {
      addInvoice({
        vendor: "Imported Vendor",
        amount: Math.round(Math.random() * 1200 + 100),
        date: new Date().toISOString().substr(0, 10),
        fileName: file.name,
        status: "pending",
        uploadedBy: uploader,
      });
      setPending(false);
      toast({ title: "Invoice uploaded", description: file.name, duration: 2400 });
      navigate("/");
    }, 1200);
  }

  return (
    <div className="mx-auto w-full max-w-lg bg-white/95 shadow-md rounded-xl p-10 flex flex-col gap-8 mt-8">
      <div className="text-xl font-extrabold text-risolto-blue mb-1">Upload Invoice</div>
      <div
        className={`border-2 border-dashed rounded-lg p-10 transition flex flex-col items-center justify-center cursor-pointer bg-gray-50 ${
          dragOver ? "border-risolto-blue bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={() => setDragOver(true)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files);
        }}
      >
        <span className="text-4xl mb-2 text-risolto-blue">🗎</span>
        <p className="mb-2">Drag & drop or click to select PDF/JPG invoice</p>
        <input
          type="file"
          accept="application/pdf,image/*"
          ref={inputRef}
          className="hidden"
          disabled={pending}
          onChange={e => handleFile(e.target.files)}
        />
        {pending && <div className="mt-2 text-xs text-risolto-blue">Uploading...</div>}
      </div>
      <div>
        <div className="font-bold mb-2 text-sm">Or enter details:</div>
        <button className="bg-risolto-blue text-white px-6 py-2 rounded font-semibold text-base shadow hover:bg-risolto-blue-dark transition" disabled={pending}>
          Upload Details Form (Coming soon)
        </button>
      </div>
    </div>
  );
}
