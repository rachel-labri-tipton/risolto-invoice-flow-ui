
import { ApprovalRule, approvalRules as defaultRules } from "./approvalRules";

const STORAGE_KEY = "risolto_approval_rules";

// Get rules from localStorage or fallback
export function getApprovalRules(): ApprovalRule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    return defaultRules;
  } catch {
    return defaultRules;
  }
}

// Save rules to localStorage
export function setApprovalRules(rules: ApprovalRule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
}
