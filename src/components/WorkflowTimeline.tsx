
import { Invoice } from "@/hooks/useInvoices";
import { Clock } from "lucide-react";

/**
 * Timeline showing the full approval history for an invoice.
 * Now optimized for a flawless mobile experience – horizontally scrollable and more touch-friendly.
 */
export default function WorkflowTimeline({ invoice }: { invoice: Invoice }) {
  return (
    <div className="w-full overflow-x-auto">
      <ol className="relative border-l border-gray-300 ml-3 min-w-[320px] sm:min-w-0">
        {invoice.approvalHistory.map((item, i) => (
          <li
            key={i}
            className="mb-6 ml-6 flex flex-col sm:flex-row sm:items-center"
          >
            {/* Timeline point */}
            <span
              className="absolute left-[-13px] flex items-center justify-center w-7 h-7 sm:w-6 sm:h-6 rounded-full ring-2 ring-white bg-risolto-blue-light"
            >
              <Clock className="w-4 h-4 text-risolto-blue" />
            </span>
            <div className="pl-2">
              <div className="font-semibold capitalize text-sm sm:text-base">
                {item.status}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground break-words">
                By <span className="font-semibold">{item.by}</span>
                {item.comment && (
                  <>
                    {" "}
                    — <span>{item.comment}</span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(item.at).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
