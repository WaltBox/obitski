import { Link } from "../router.jsx";

const LINES = [
  "I organize obituaries by a city.",
  "I turn them into publishable content.",
  "I help publishers keep their communities informed.",
];

export default function Home() {
  return (
    <main className="home">
      <div className="home-inner">
        <img src="/obitski-logo.png" alt="Obitski" className="home-logo" />

        <div className="about-eyebrow">About Me</div>

        <div className="about-lines">
          {LINES.map((line, i) => (
            <div className="about-item" key={i}>
              <p
                className="about-line"
                style={{ animationDelay: `${0.25 + i * 0.35}s` }}
              >
                {line}
              </p>
              {i < LINES.length - 1 && (
                <hr
                  className="about-rule"
                  style={{ animationDelay: `${0.45 + i * 0.35}s` }}
                />
              )}
            </div>
          ))}
        </div>

        <nav
          className="home-actions"
          style={{ animationDelay: `${0.45 + LINES.length * 0.35}s` }}
        >
          <Link to="/who-i-am" className="home-btn home-btn-ghost">
            Who I Am
          </Link>
          <Link
            to="/tell-me-about-you"
            className="home-btn home-btn-primary"
          >
            Tell Me About You
          </Link>
        </nav>
      </div>
    </main>
  );
}
