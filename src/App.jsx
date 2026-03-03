import { useEffect, useMemo, useState, useRef } from "react";

const LINES = [
  "I read obituaries.",
  "Every day.",
  "Thousands of them.",
];

const TYPING_SPEED = 50;
const LINE_PAUSE = 600;

function useTypewriter(lines) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);

  const fullText = useMemo(() => lines.join("\n"), [lines]);

  useEffect(() => {
    if (done) return;

    const line = lines[lineIdx.current];
    if (!line) {
      setDone(true);
      return;
    }

    const id =
      charIdx.current < line.length
        ? setTimeout(() => {
            setTyped((p) => p + line.charAt(charIdx.current));
            charIdx.current += 1;
          }, TYPING_SPEED)
        : setTimeout(() => {
            setTyped((p) => p + "\n");
            charIdx.current = 0;
            lineIdx.current += 1;
          }, LINE_PAUSE);

    return () => clearTimeout(id);
  });

  useEffect(() => {
    if (done) setTyped(fullText);
  }, [done, fullText]);

  return { typed, done };
}

function BookDemoButton({ className = "", onBook, showResponse = true }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    onBook?.();
  };

  return (
    <>
      <a href="#" className={`cta-demo ${className}`} onClick={handleClick}>
        Book a demo
      </a>
      {showResponse && clicked && (
        <p className="response">Thanks! We&apos;ll be in touch to schedule your demo.</p>
      )}
    </>
  );
}

export default function App() {
  const { typed, done } = useTypewriter(LINES);
  const [demoRequested, setDemoRequested] = useState(false);

  return (
    <div className="page">
      {demoRequested && (
        <div className="demo-toast">
          Thanks! We&apos;ll be in touch to schedule your demo.
        </div>
      )}

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <img src="/obitski-word.png" alt="Obitski" className="nav-wordmark" />
          <BookDemoButton
            className="nav-cta"
            showResponse={false}
            onBook={() => setDemoRequested(true)}
          />
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <img src="/obitski-logo.png" alt="Obitski" className="hero-logo" />
          <p className="eyebrow">Obituary Intelligence</p>

          <div className={`typewriter ${done ? "done" : ""}`}>
            {typed}
            {!done && <span className="caret" />}
          </div>

          <h2 className={`headline ${done ? "visible" : ""}`}>
            How can I help you?
          </h2>

          <div className={`cta-wrap ${done ? "visible" : ""}`}>
            <BookDemoButton onBook={() => setDemoRequested(true)} showResponse={false} />
            <p className="cta-hint">See how Obitski can power your business.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
