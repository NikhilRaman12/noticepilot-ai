export type VerificationStatus =
  | "supported"
  | "needs_verification"
  | "not_found";

export type FindingKind =
  | "summary"
  | "action"
  | "deadline"
  | "document"
  | "issue";

export interface EvidenceSpan {
  start: number;
  end: number;
  quote: string;
  line: number;
}

export interface Finding {
  id: string;
  kind: FindingKind;
  text: string;
  status: VerificationStatus;
  evidence: EvidenceSpan[];
  requirement?: "explicit" | "suggestion" | "unknown";
  dateValue?: string;
}

export interface AnalysisResult {
  sourceText: string;
  findings: Finding[];
  issues: Finding[];
}
