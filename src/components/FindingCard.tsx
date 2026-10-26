import type { Finding } from "../types";

interface FindingCardProps {
  finding: Finding;
}

const STATUS_LABELS = {
  supported: "Supported by notice",
  needs_verification: "Needs verification",
  not_found: "Not found in notice",
} as const;

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <article className="finding-card">
      <div className="finding-heading">
        <span className="finding-kind">{finding.kind}</span>
        <span className={`status status-${finding.status}`}>
          {STATUS_LABELS[finding.status]}
        </span>
      </div>
      <p>{finding.text}</p>
      <details className="evidence-details">
        <summary>View evidence</summary>
        {finding.evidence.map((evidence) => (
          <blockquote key={`${evidence.start}-${evidence.end}`}>
            <p>{evidence.quote}</p>
            <cite>Line {evidence.line}</cite>
          </blockquote>
        ))}
      </details>
    </article>
  );
}
