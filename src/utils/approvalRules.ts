
export type ApprovalLevel = {
  level: number;
  role: string;
  required: boolean;
  approver: string | null;
};

export type ApprovalRule = {
  threshold: number;
  departments: string[];
  chain: { role: string }[];
};

export const approvalRules: ApprovalRule[] = [
  {
    threshold: 1000,
    departments: ["default"],
    chain: [{ role: "AP Clerk" }, { role: "Finance Manager" }],
  },
  {
    threshold: 2500,
    departments: ["default"],
    chain: [{ role: "AP Clerk" }, { role: "Finance Manager" }, { role: "CFO" }],
  },
  {
    threshold: 300,
    departments: ["IT"],
    chain: [{ role: "IT Manager" }, { role: "Finance Manager" }],
  },
];

// Find appropriate rule for invoice
export function getApprovalChainForInvoice(invoice: {
  amount: number;
  department?: string;
  approvalHistory: { by: string; status: string }[];
}) {
  // Pick rule with highest threshold under the amount, matching department if possible
  const dept = invoice.department || "default";
  const possibleRules = approvalRules
    .filter((rule) => rule.threshold <= invoice.amount && rule.departments.includes(dept))
    .sort((a, b) => b.threshold - a.threshold);

  const rule = possibleRules[0] ||
    approvalRules
      .filter((r) => r.threshold <= invoice.amount && r.departments.includes("default"))
      .sort((a, b) => b.threshold - a.threshold)[0];

  if (!rule) return [];

  // Map to ApprovalLevel: attach history info if available
  let chain: ApprovalLevel[] = [];
  for (let i = 0; i < rule.chain.length; i++) {
    const role = rule.chain[i].role;
    const approved = invoice.approvalHistory.find(
      (h) => h.status === "approved" && h.by.toLowerCase().includes(role.toLowerCase())
    );
    chain.push({
      level: i + 1,
      role,
      required: true,
      approver: approved ? approved.by : null,
    });
  }
  return chain;
}

