
import { Invoice } from "@/hooks/useInvoices";
import { Clock } from "lucide-react";

const statusOrder = ["pending", "review", "approved", "rejected"] as const;

export default function WorkflowTimeline({ invoice }: { invoice: Invoice }) {
  return (
    <ol className="relative border-l border-gray-300 ml-3">
      {invoice.approvalHistory.map((item, i) => (
        <li key={i} className="mb-4 ml-5">
          <span className={`absolute left-[-13px] flex items-center justify-center w-6 h-6 rounded-full ring-2 ring-white bg-risolto-blue-light`}>
            <Clock className="w-4 h-4 text-risolto-blue" />
          </span>
          <div className="pl-2">
            <div className="font-semibold capitalize">{item.status}</div>
            <div className="text-xs text-muted-foreground">
              By <span className="font-semibold">{item.by}</span>{item.comment && <> — <span>{item.comment}</span></>}
            </div>
            <div className="text-xs text-gray-400">{new Date(item.at).toLocaleString()}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
