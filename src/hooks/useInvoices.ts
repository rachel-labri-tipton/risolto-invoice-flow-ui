
import { useCallback } from "react";

export type InvoiceStatus = "pending" | "review" | "approved" | "rejected";
export type Invoice = {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  fileName: string;
  status: InvoiceStatus;
  uploadedBy: string;
  approvalHistory: {
    status: InvoiceStatus;
    by: string;
    at: string;
    comment?: string;
  }[];
};

// Simulated "API" state in localStorage with fallback to mock data
function getInvoices(): Invoice[] {
  const data = localStorage.getItem("risolto_invoices");
  if (data) return JSON.parse(data);
  // Seed with 4 mock invoices
  return [
    {
      id: "INV-001",
      vendor: "Acme Supplies",
      amount: 1200.5,
      date: "2025-06-10",
      fileName: "acme-invoice-may.pdf",
      status: "pending",
      uploadedBy: "Alice",
      approvalHistory: [
        { status: "pending", by: "Alice", at: "2025-06-10T10:00", comment: "" },
      ],
    },
    {
      id: "INV-002",
      vendor: "Globex Corp",
      amount: 597.25,
      date: "2025-06-09",
      fileName: "globex-apr.pdf",
      status: "review",
      uploadedBy: "Bob",
      approvalHistory: [
        { status: "pending", by: "Bob", at: "2025-06-09T13:00" },
        { status: "review", by: "Charlie", at: "2025-06-10T09:00", comment: "Need more info." },
      ],
    },
    {
      id: "INV-003",
      vendor: "ValueMart",
      amount: 2300,
      date: "2025-06-08",
      fileName: "valuemart-march.pdf",
      status: "approved",
      uploadedBy: "Charlie",
      approvalHistory: [
        { status: "pending", by: "Charlie", at: "2025-06-07T14:00" },
        { status: "approved", by: "Manager Sue", at: "2025-06-09T08:00" },
      ],
    },
    {
      id: "INV-004",
      vendor: "PaperPro",
      amount: 100,
      date: "2025-06-06",
      fileName: "paperpro-apr.pdf",
      status: "rejected",
      uploadedBy: "Sue",
      approvalHistory: [
        { status: "pending", by: "Sue", at: "2025-06-06T10:00" },
        { status: "rejected", by: "Manager Sue", at: "2025-06-06T15:00", comment: "Duplicate." },
      ],
    },
  ];
}

function setInvoices(invoices: Invoice[]) {
  localStorage.setItem("risolto_invoices", JSON.stringify(invoices));
}

export function useInvoices() {
  // Changing this triggers rerender since localStorage is external to React
  const refresh = useCallback(() => {
    return getInvoices();
  }, []);

  const addInvoice = (inv: Omit<Invoice, "id" | "approvalHistory">) => {
    const invoices = getInvoices();
    const newId = `INV-${String(Math.floor(Math.random() * 9000 + 1000))}`;
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      ...inv,
      id: newId,
      approvalHistory: [
        { status: "pending", by: inv.uploadedBy, at: now, comment: "" },
      ],
    };
    setInvoices([newInvoice, ...invoices]);
    return newInvoice;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus, by: string, comment?: string) => {
    const invoices = getInvoices();
    const idx = invoices.findIndex((inv) => inv.id === id);
    if (idx < 0) return;
    const at = new Date().toISOString();
    invoices[idx].status = status;
    invoices[idx].approvalHistory = [
      ...(invoices[idx].approvalHistory || []),
      { status, by, at, comment },
    ];
    setInvoices([...invoices]);
  };

  return { getInvoices, addInvoice, updateInvoiceStatus, refresh };
}
