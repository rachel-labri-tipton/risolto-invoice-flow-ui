import { getApprovalChainForInvoice, ApprovalLevel } from "@/utils/approvalRules";
import { Invoice } from "@/hooks/useInvoices";
import { getDelegateFor } from "@/utils/delegation";

export default function ApprovalChain({ invoice }: { invoice: any }) {
  const chain = getApprovalChainForInvoice(invoice);

  // Determine which approvers (incl. delegate) can approve each step.
  function getApproverDisplay(step: ApprovalLevel) {
    if (!step.approver) return null;
    const delegate = getDelegateFor(step.approver);
    if (delegate) {
      return (
        <>
          <span>Approved by <span className="font-medium">{step.approver}</span></span>
          <div className="text-xs text-blue-700">(Delegate: {delegate})</div>
        </>
      );
    }
    return <span>Approved by <span className="font-medium">{step.approver}</span></span>;
  }

  // New logic: Match approvals by either main or delegate
  function wasStepApproved(step: ApprovalLevel) {
    if (!step.approver) return false;
    const stepApproverLower = step.approver.toLowerCase();
    const delegate = getDelegateFor(step.approver) || "";
    return (
      invoice.approvalHistory.some(
        (h: any) =>
          h.status === "approved" &&
          (h.by.toLowerCase().includes(step.role.toLowerCase()) ||
            (delegate && h.by.toLowerCase().includes(delegate.toLowerCase())))
      )
    );
  }

  if (!chain.length)
    return (
      <div className="p-4 rounded bg-red-50 border border-red-100 text-red-400">
        No approval chain applies to this invoice based on current rules.
      </div>
    );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 md:gap-4 items-center py-3 min-w-[340px] sm:min-w-0">
        {chain.map((step, idx) => {
          const delegate = getDelegateFor(step.role);
          const approved = wasStepApproved(step);
          return (
            <div
              key={step.level}
              className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] px-1"
            >
              <div
                className={`rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center mb-1
                  ${approved ? "bg-green-200 text-green-700" : idx === 0 || !chain[idx - 1].approver ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-500"}
                  border-2 ${approved ? "border-green-400" : idx === 0 || !chain[idx - 1].approver ? "border-yellow-400" : "border-gray-300"}
                  font-bold`}
              >
                {step.level}
              </div>
              <div
                className={`text-xs sm:text-[13px] font-semibold uppercase tracking-tight ${
                  approved ? "text-green-700" : "text-gray-700"
                } text-center`}
              >
                {step.role}
                {delegate && (
                  <span className="block text-[9px] sm:text-[10px] text-blue-600 normal-case font-normal">
                    Delegate: {delegate}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-1 text-nowrap text-center max-w-[90px]">
                {approved
                  ? getApproverDisplay(step)
                  : idx === 0 || chain[idx - 1].approver
                  ? <span>Pending</span>
                  : <span>Waiting</span>}
              </div>
              {idx < chain.length - 1 && (
                <div className="h-6 sm:h-8 flex flex-col justify-center">
                  <div className="w-1 h-6 sm:h-8 bg-gray-300 rounded mx-auto" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
