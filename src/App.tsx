import { useState } from "react";
import { analyzeNotice } from "./analyzer";
import { Results } from "./components/Results";
import { SAMPLE_NOTICE } from "./sampleNotice";
import type { AnalysisResult } from "./types";

export default function App() {
  const [noticeText, setNoticeText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const canAnalyze = noticeText.trim().length > 0 && !isAnalyzing;

  function handleAnalyze() {
    if (!canAnalyze) return;

    setIsAnalyzing(true);
    try {
      setResult(analyzeNotice(noticeText));
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NoticePilot AI home">
          <span className="brand-mark" aria-hidden="true">
            N
          </span>
          <span>NoticePilot <strong>AI</strong></span>
        </a>
        <span className="header-note">Evidence-first notice assistant</span>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Understand the notice. Know your next step.</p>
        <h1>Clear actions, grounded in the source.</h1>
        <p className="hero-copy">
          Turn confusing notices into clear actions—with evidence you can
          verify.
        </p>
      </section>

      <section className="workspace" aria-labelledby="input-heading">
        <div className="workspace-heading">
          <div>
            <h2 id="input-heading">Start with your notice</h2>
            <p>Paste the text below or explore a clearly fictional sample.</p>
          </div>
          <span className="private-note">
            <span aria-hidden="true">●</span> Stays in this browser
          </span>
        </div>

        <label className="input-label" htmlFor="notice-input">
          Paste your notice here
        </label>
        <textarea
          id="notice-input"
          name="notice"
          rows={8}
          value={noticeText}
          onChange={(event) => setNoticeText(event.target.value)}
          placeholder="Paste the text of a notice here. For example: Please submit the requested documents by October 30, 2026."
          aria-describedby="input-help empty-input-message trust-note"
        />
        <div className="input-meta">
          <p id="input-help">Your notice is analyzed locally for this demo.</p>
          <button
            className="sample-button"
            type="button"
            onClick={() => setNoticeText(SAMPLE_NOTICE)}
          >
            Try a sample notice
          </button>
        </div>
        <p
          className="inline-message"
          id="empty-input-message"
          aria-live="polite"
        >
          {noticeText.trim()
            ? ""
            : "Paste a notice or try our sample to get started."}
        </p>
        <button
          className="analyze-button"
          type="button"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? "Analyzing notice…" : "Analyze notice"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="trust-note" id="trust-note">
          Important dates and actions link to their source wording. Missing or
          unclear details are flagged—not guessed.
        </p>
      </section>

      {result && <Results result={result} />}

      <footer className="site-footer">
        <span>NoticePilot AI</span>
        <span>For clarity, not authoritative legal or government advice.</span>
      </footer>
    </main>
  );
}
