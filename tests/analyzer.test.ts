import { describe, expect, it } from "vitest";
import { analyzeNotice } from "../src/analyzer";
import { SAMPLE_NOTICE } from "../src/sampleNotice";

describe("analyzeNotice", () => {
  it("extracts sample actions, deadline, and explicit document with exact evidence", () => {
    const result = analyzeNotice(SAMPLE_NOTICE);

    expect(result.findings.map((finding) => finding.id)).toEqual(
      expect.arrayContaining([
        "notice-meaning",
        "required-document",
        "submit-requested-document",
        "submission-deadline",
        "include-reference",
        "source-grounded-overview",
      ]),
    );
    expect(result.findings.find((finding) => finding.id === "submission-deadline"))
      .toMatchObject({
        status: "supported",
        dateValue: "October 30, 2026",
        evidence: [
          expect.objectContaining({
            quote: "Send the requested document by October 30, 2026.",
            line: 6,
          }),
        ],
      });
    expect(result.findings.find((finding) => finding.id === "required-document"))
      .toMatchObject({
        requirement: "explicit",
        evidence: [
          expect.objectContaining({
            quote: "Please submit one proof of address.",
          }),
        ],
      });

    for (const finding of result.findings) {
      for (const evidence of finding.evidence) {
        expect(result.sourceText.slice(evidence.start, evidence.end)).toBe(
          evidence.quote,
        );
      }
    }
  });

  it("produces identical findings for identical source text", () => {
    expect(analyzeNotice(SAMPLE_NOTICE)).toEqual(analyzeNotice(SAMPLE_NOTICE));
  });
});
