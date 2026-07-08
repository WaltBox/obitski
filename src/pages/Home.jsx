import { useEffect, useState } from "react";
import { Link } from "../router.jsx";

// Each thought is typed on its own line, with a pause after it.
// A longer pause precedes the closing invitation.
const SEQUENCE = [
  { text: "I read obituaries.", pauseAfter: 750 },
  { text: "Every day.", pauseAfter: 750 },
  { text: "Thousands of them.", pauseAfter: 1600 },
  { text: "I'd like to get to know you.", pauseAfter: 0 },
];

const START_DELAY = 1000; // stillness before the first character
const TYPING_SPEED = 55;

function useIntroTypewriter(sequence) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (reduce) {
      setText(sequence.map((s) => s.text).join("\n"));
      setDone(true);
      return;
    }

    let cancelled = false;
    const timers = [];
    let out = "";
    let li = 0;
    let ci = 0;

    function step() {
      if (cancelled) return;
      const line = sequence[li];
      if (ci < line.text.length) {
        out += line.text[ci];
        ci += 1;
        setText(out);
        timers.push(setTimeout(step, TYPING_SPEED));
      } else if (li < sequence.length - 1) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            out += "\n";
            setText(out);
            li += 1;
            ci = 0;
            step();
          }, line.pauseAfter)
        );
      } else {
        setDone(true);
      }
    }

    timers.push(setTimeout(step, START_DELAY));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return { text, done };
}

export default function Home() {
  const { text, done } = useIntroTypewriter(SEQUENCE);

  return (
    <main className="intro">
      <div className="intro-mark">
        <img src="/obitski-logo.png" alt="Obitski" className="intro-emblem" />
      </div>

      <div className="intro-typed">
        {text}
        <span className="caret" />
      </div>

      <nav className={`intro-actions ${done ? "visible" : ""}`}>
        <Link to="/who-i-am" className="intro-btn" tabIndex={done ? 0 : -1}>
          Who I Am
        </Link>
        <Link
          to="/tell-me-about-you"
          className="intro-btn"
          tabIndex={done ? 0 : -1}
        >
          Tell Me About You
        </Link>
      </nav>
    </main>
  );
}
