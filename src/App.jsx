import { useEffect, useMemo, useState } from "react";

const LINES = [
  "I read obituaries.",
  "Every day.",
  "Thousands of them.",
  "How can I help you?"
];

const TYPING_SPEED = 52;
const LINE_PAUSE = 650;

export default function App() {
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [response, setResponse] = useState("");

  const fullText = useMemo(() => LINES.join("\n"), []);

  useEffect(() => {
    if (done) {
      return undefined;
    }

    const currentLine = LINES[lineIndex];
    if (!currentLine) {
      setDone(true);
      return undefined;
    }

    let timeoutId;
    if (charIndex < currentLine.length) {
      timeoutId = setTimeout(() => {
        setTyped((prev) => prev + currentLine.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, TYPING_SPEED);
    } else {
      timeoutId = setTimeout(() => {
        setTyped((prev) => prev + "\n");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, done, lineIndex]);

  useEffect(() => {
    if (done) {
      setTyped(fullText);
    }
  }, [done, fullText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.question.value.trim();
    if (!value) {
      setResponse("Enter a name or question to begin.");
      return;
    }
    setResponse("Got it. Obitski is listening.");
    event.target.reset();
  };

  return (
    <div className="page">
      <main className="card">
        <img
          src="/obitski-logo.png"
          alt="Obitski logo"
          className="logo"
          loading="eager"
        />

        <div className={`type ${done ? "done" : ""}`}>
          {typed}
          {!done && <span className="caret" aria-hidden="true">▍</span>}
        </div>

        <form
          className={`input-row ${done ? "visible" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            name="question"
            type="text"
            placeholder="Ask about someone..."
            autoComplete="off"
            aria-label="Ask about someone"
          />
          <button type="submit">Ask</button>
        </form>

        <p className="response">{response}</p>
      </main>
    </div>
  );
}
