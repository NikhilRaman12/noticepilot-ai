import type {
  AnalysisResult,
  EvidenceSpan,
  Finding,
  FindingKind,
} from "./types";

interface SourceLine {
  text: string;
  start: number;
  end: number;
  line: number;
}

function getSourceLines(text: string): SourceLine[] {
  const lines: SourceLine[] = [];
  let start = 0;
  let line = 1;

  while (start < text.length) {
    const newline = text.indexOf("\n", start);
    const end = newline === -1 ? text.length : newline;
    const lineEnd = end > start && text[end - 1] === "\r" ? end - 1 : end;
    const lineText = text.slice(start, lineEnd);

    if (lineText.trim()) {
      lines.push({ text: lineText, start, end: lineEnd, line });
    }

    if (newline === -1) break;
    start = newline + 1;
    line += 1;
  }

  return lines;
}

function evidenceFor(source: SourceLine): EvidenceSpan {
  return {
    start: source.start,
    end: source.end,
    quote: source.text,
    line: source.line,
  };
}

function finding(
  id: string,
  kind: FindingKind,
  text: string,
  source: SourceLine,
  requirement?: Finding["requirement"],
  dateValue?: string,
): Finding {
  return {
    id,
    kind,
    text,
    status: "supported",
    evidence: [evidenceFor(source)],
    ...(requirement ? { requirement } : {}),
    ...(dateValue ? { dateValue } : {}),
  };
}

function extractDate(line: string): string | undefined {
  return line.match(
    /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/i,
  )?.[0];
}

export function analyzeNotice(sourceText: string): AnalysisResult {
  const lines = getSourceLines(sourceText);
  const findings: Finding[] = [];

  const meaningLine = lines.find((line) =>
    /\b(application|request|notice)\b.*\b(paused|on hold|additional information)\b/i.test(
      line.text,
    ),
  );
  if (meaningLine) {
    findings.push(
      finding(
        "notice-meaning",
        "summary",
        "The notice says the application is paused pending additional information.",
        meaningLine,
      ),
    );
  }

  const documentLine = lines.find(
    (line) =>
      /\b(?:submit|provide|send|include)\b/i.test(line.text) &&
      /\b(?:document|proof|identification|certificate|statement|record)\b/i.test(
        line.text,
      ),
  );
  if (documentLine) {
    findings.push(
      finding(
        "required-document",
        "document",
        "Provide the document explicitly requested in this notice.",
        documentLine,
        "explicit",
      ),
    );
    findings.push(
      finding(
        "submit-requested-document",
        "action",
        "Submit the requested document.",
        documentLine,
        "explicit",
      ),
    );
  }

  const deadlineLine = lines.find(
    (line) =>
      /\b(?:by|before|no later than|due on|deadline)\b/i.test(line.text) &&
      extractDate(line.text) !== undefined,
  );
  if (deadlineLine) {
    findings.push(
      finding(
        "submission-deadline",
        "deadline",
        `Submit the requested materials by ${extractDate(deadlineLine.text)}.`,
        deadlineLine,
        "explicit",
        extractDate(deadlineLine.text),
      ),
    );
  }

  const referenceLine = lines.find((line) =>
    /\binclude\b.*\b(?:reference|reference number|case number)\b/i.test(
      line.text,
    ),
  );
  if (referenceLine) {
    findings.push(
      finding(
        "include-reference",
        "action",
        "Include the application reference number with the submission.",
        referenceLine,
        "explicit",
      ),
    );
  }

  if (findings.length > 0) {
    findings.unshift({
      id: "source-grounded-overview",
      kind: "summary",
      text: `The notice contains ${findings.filter((item) => item.kind !== "summary").length} source-supported action or detail(s).`,
      status: "supported",
      evidence: findings
        .filter((item) => item.kind !== "summary")
        .flatMap((item) => item.evidence)
        .filter(
          (span, index, spans) =>
            spans.findIndex(
              (candidate) =>
                candidate.start === span.start && candidate.end === span.end,
            ) === index,
        ),
    });
  }

  return { sourceText, findings, issues: [] };
}
