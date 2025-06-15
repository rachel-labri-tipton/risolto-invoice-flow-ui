
import { RISOLTO_BRAND } from "@/brand";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ROLES = ["Admin", "Manager", "Processor", "Viewer"] as const;

export type UserRole = typeof ROLES[number];

export default function Header({
  role,
  setRole,
}: {
  role: UserRole;
  setRole: (r: UserRole) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center px-8 py-3 z-10 relative">
      <div className="flex-1 flex items-center gap-6">
        <span className="text-2xl font-extrabold text-risolto-blue tracking-tight select-none">
          <span className="mr-2">🗎</span>
          {RISOLTO_BRAND.name}
        </span>
        <nav className="flex gap-4 font-semibold text-base">
          <a href="/" className="hover:text-risolto-blue transition">Dashboard</a>
          <a href="/upload" className="hover:text-risolto-blue transition">Upload Invoice</a>
        </nav>
      </div>
      {/* Role selector */}
      <div className="flex items-center gap-2 relative">
        <button
          type="button"
          className="flex items-center gap-2 font-semibold px-3 py-1.5 bg-risolto-blue text-white rounded hover:bg-risolto-blue-dark transition select-none"
          onClick={() => setOpen((v) => !v)}
        >
          Role: <span className="capitalize">{role}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute right-0 top-12 mt-1 z-20 min-w-[180px] bg-white shadow-lg border rounded-lg animate-fade-in">
            {ROLES.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => {
                  setRole(r);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-risolto-blue-light capitalize ${
                  r === role ? "text-risolto-blue font-bold" : ""
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
