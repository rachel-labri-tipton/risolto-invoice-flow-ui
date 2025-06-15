
/**
 * Stores and retrieves delegate approvers keyed by user name (case-insensitive).
 * Uses localStorage for persistence.
 */

const STORAGE_KEY = "risolto_delegates";

// Returns: { [mainApproverUsername: string]: delegateUsername }
export function getDelegates(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setDelegate(main: string, delegate: string) {
  const delegates = getDelegates();
  if (delegate) {
    delegates[main.toLowerCase()] = delegate;
  } else {
    // Remove delegate if set to blank
    delete delegates[main.toLowerCase()];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(delegates));
}

export function getDelegateFor(main: string): string | undefined {
  const delegates = getDelegates();
  return delegates[main.toLowerCase()];
}
