import { useEffect, useMemo, useState } from "react";

const LINES = [
  "I read obituaries.",
  "Every day.",
  "Thousands of them.",
  "How can I help you?",
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
    if (done) return;

    const currentLine = LINES[lineIndex];
    if (!currentLine) {
      setDone(true);
      return;
    }

    const id =
      charIndex < currentLine.length
        ? setTimeout(() => {
            setTyped((p) => p + currentLine.charAt(charIndex));
            setCharIndex((c) => c + 1);
          }, TYPING_SPEED)
        : setTimeout(() => {
            setTyped((p) => p + "\n");
            setCharIndex(0);
            setLineIndex((l) => l + 1);
          }, LINE_PAUSE);

    return () => clearTimeout(id);
  }, [charIndex, done, lineIndex]);

  useEffect(() => {
    if (done) setTyped(fullText);
  }, [done, fullText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = e.target.question.value.trim();
    if (!val) return;
    setResponse("Searching...");
    e.target.reset();
    setTimeout(() => setResponse("Obitski is listening. Results coming soon."), 1200);
  };

  return (
    <div className="page">
      <main className="hero">
        <img src="/obitski-logo.png" alt="Obitski" className="logo" />

        <div className={`typewriter ${done ? "done" : ""}`}>
          {typed}
          {!done && <span className="caret" />}
        </div>

        <div className={`search-wrap ${done ? "visible" : ""}`}>
          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              name="question"
              type="text"
              placeholder="Search for someone..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
          {response && <p className="response">{response}</p>}
        </div>
      </main>
    </div>
  );
}
