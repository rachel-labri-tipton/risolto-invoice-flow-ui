
import { getApprovalChainForInvoice, ApprovalLevel } from "@/utils/approvalRules";
import { Invoice } from "@/hooks/useInvoices";

export default function ApprovalChain({ invoice }: { invoice: Invoice }) {
  const chain: ApprovalLevel[] = getApprovalChainForInvoice(invoice);

  if (!chain.length) return (
    <div className="p-4 rounded bg-red-50 border border-red-100 text-red-400">
      No approval chain applies to this invoice based on current rules.
    </div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 md:gap-4 items-center py-3">
        {chain.map((step, idx) => (
          <div
            key={step.level}
            className={`flex flex-col items-center min-w-[120px]`}
          >
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center mb-1
                ${step.approver ? "bg-green-200 text-green-700" : idx === 0 || !chain[idx - 1].approver ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-500"}
                border-2 ${step.approver ? "border-green-400" : idx === 0 || !chain[idx - 1].approver ? "border-yellow-400" : "border-gray-300"}
                font-bold`}
            >
              {step.level}
            </div>
            <div className={`text-xs font-semibold uppercase tracking-tight ${step.approver ? 'text-green-700' : 'text-gray-700'}`}>{step.role}</div>
            <div className="text-xs text-muted-foreground mb-1 text-nowrap">
              {step.approver ? <>Approved by <span className="font-medium">{step.approver}</span></>
                : idx === 0 || chain[idx - 1].approver ? <span>Pending</span>
                : <span>Waiting</span>}
            </div>
            {idx < chain.length - 1 && (
              <div className="h-8 flex flex-col justify-center">
                <div className="w-1 h-8 bg-gray-300 rounded mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
