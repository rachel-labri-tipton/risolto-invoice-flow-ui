
import { useState } from "react";
import { getDelegates, setDelegate, getDelegateFor } from "@/utils/delegation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Ideally, you'd fetch user list from backend, here it's a free text input for demo
export default function DelegateSetting({ currentUser }: { currentUser: string }) {
  const [delegate, setDelegateState] = useState<string>(getDelegateFor(currentUser) || "");
  const [editing, setEditing] = useState(false);

  function handleSave() {
    setDelegate(currentUser, delegate.trim());
    setEditing(false);
  }

  function handleClear() {
    setDelegate(currentUser, "");
    setDelegateState("");
    setEditing(false);
  }

  return (
    <div className="rounded-md border px-4 py-2 bg-gray-50 mb-4">
      <div className="font-semibold text-sm mb-1">Approval Delegate</div>
      {!editing ? (
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {delegate ? (
              <>
                Current delegate: <span className="font-medium text-green-700">{delegate}</span>
              </>
            ) : (
              <span className="text-muted-foreground">No delegate set</span>
            )}
          </span>
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            {delegate ? "Change" : "Set"}
          </Button>
          {delegate && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Input
            value={delegate}
            onChange={e => setDelegateState(e.target.value)}
            placeholder="Enter delegate's name"
            className="w-48"
            autoFocus
          />
          <Button size="sm" onClick={handleSave} disabled={!delegate.trim()}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-1">
        Your delegate can approve invoices on your behalf.
      </div>
    </div>
  );
}
