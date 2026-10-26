import type { AnalysisResult, Finding, FindingKind } from "../types";
import { FindingCard } from "./FindingCard";

interface ResultsProps {
  result: AnalysisResult;
}

const SECTIONS: { title: string; kinds: FindingKind[] }[] = [
  { title: "What this notice means", kinds: ["summary"] },
  { title: "Your next steps", kinds: ["action"] },
  { title: "Important dates", kinds: ["deadline"] },
  { title: "Documents mentioned", kinds: ["document"] },
];

function uniqueFindings(findings: Finding[]) {
  return findings.filter(
    (finding, index) =>
      findings.findIndex((candidate) => candidate.id === finding.id) === index,
  );
}

export function Results({ result }: ResultsProps) {
  const findings = uniqueFindings(result.findings);

  return (
    <section className="results" aria-labelledby="results-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Notice analysis</p>
          <h2 id="results-heading">Your notice, made clearer</h2>
        </div>
        <span className="result-count">{findings.length} findings</span>
      </div>
      <p className="results-intro">
        Each result below is linked to wording in the notice. Open “View
        evidence” to check the source.
      </p>
      <div className="results-grid">
        {SECTIONS.map(({ title, kinds }) => {
          const sectionFindings = findings.filter((item) =>
            kinds.includes(item.kind),
          );
          if (sectionFindings.length === 0) return null;

          return (
            <section className="result-section" key={title}>
              <h3>{title}</h3>
              <div className="finding-list">
                {sectionFindings.map((item) => (
                  <FindingCard finding={item} key={item.id} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
