import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { SAMPLE_NOTICE } from "../src/sampleNotice";

describe("NoticePilot workspace", () => {
  it("starts with an empty-input prompt and disabled analysis action", () => {
    render(<App />);

    expect(screen.getByText("Paste a notice or try our sample to get started."))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: /analyze notice/i })).toBeDisabled();
  });

  it("loads and analyzes the sample, then reveals its source evidence", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /try a sample notice/i }));
    expect(screen.getByRole("textbox", { name: "Paste your notice here" }))
      .toHaveValue(SAMPLE_NOTICE);
    fireEvent.click(screen.getByRole("button", { name: /analyze notice/i }));

    expect(screen.getByRole("heading", { name: "Your notice, made clearer" }))
      .toBeInTheDocument();
    expect(screen.getAllByText("Supported by notice").length).toBeGreaterThan(0);
    fireEvent.click(screen.getAllByText("View evidence")[0]);
    expect(
      screen.getByText(
        "The notice contains 4 source-supported action or detail(s).",
      ),
    ).toBeInTheDocument();
  });

  it("preserves pasted text in the editable input after analysis", () => {
    render(<App />);
    const text = "Please submit one proof of address.";

    fireEvent.change(screen.getByRole("textbox", { name: "Paste your notice here" }), {
      target: { value: text },
    });
    fireEvent.click(screen.getByRole("button", { name: /analyze notice/i }));

    expect(screen.getByRole("textbox", { name: "Paste your notice here" }))
      .toHaveValue(text);
  });
});
