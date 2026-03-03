import { useEffect, useState } from "react";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const LINES = [
  "I read obituaries.",
  "Every day.",
  "Thousands of them.",
];

const STATS = [
  { num: "51.2M+", label: "Obituaries indexed" },
  { num: "Daily", label: "New additions" },
  { num: "50", label: "States covered" },
];

const TYPING_SPEED = 50;
const LINE_PAUSE = 600;

function useTypewriter(lines) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const fullText = lines.join("\n");

  useEffect(() => {
    let idx = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;

      if (idx >= fullText.length) {
        setTyped(fullText);
        setDone(true);
        return;
      }

      const char = fullText.charAt(idx);
      const isNewline = char === "\n";
      setTyped((prev) => prev + char);
      idx += 1;
      setTimeout(tick, isNewline ? LINE_PAUSE : TYPING_SPEED);
    }

    tick();
    return () => { cancelled = true; };
  }, []);

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
  useReveal();

  const handleBookDemo = (e) => {
    e?.preventDefault();
    setDemoRequested(true);
  };

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

          <p className="hero-subhead">
            The largest obituary database in the United States —{" "}
            <em>delivered through a single API.</em>
          </p>

          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="cta-wrap">
            <BookDemoButton onBook={() => setDemoRequested(true)} showResponse={false} />
            <a href="#publishers" className="cta-secondary">
              See how it works ↓
            </a>
          </div>
        </div>
      </section>

      {/* Section Rule */}
      <div className="section-rule" />

      {/* Publishers Section */}
      <section className="publishers" id="publishers">
        <div className="publishers-eyebrow reveal">For Publishers</div>

        <div className="publishers-grid">
          <div className="publishers-left">
            <h2 className="reveal reveal-delay-1">
              The largest obituary database in the US.
              <br />
              <em>Delivered exactly how your audience needs it.</em>
            </h2>
            <p className="reveal reveal-delay-2">
              <strong>Obituaries are the most-read, longest-lingered content in local media.</strong> Your readers aren&apos;t skimming — they&apos;re searching for names they recognize, sharing with family, coming back tomorrow to check again.
            </p>
            <p className="reveal reveal-delay-2">
              The demand has always been there. The supply hasn&apos;t. Until now.
            </p>
            <p className="reveal reveal-delay-2">
              Obitski&apos;s API connects your publication to a continuously updated feed of verified obituaries — filterable by geography, community, demographic, and more. Set your parameters once. Your content stays current automatically.
            </p>
            <div className="publishers-cta reveal reveal-delay-3">
              <a href="#" className="btn-primary" onClick={handleBookDemo}>
                Book a Demo
              </a>
              <a href="#" className="btn-link">
                View API Docs →
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="api-card">
              <div className="api-card-titlebar">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
                <span className="api-card-label">obitski-api.js</span>
              </div>
              <div className="api-card-body">
                <div className="api-comment">// Fetch obituaries for your audience</div>
                <div className="api-code">
                  <span className="c-brace">{"{"}</span>
                  <span className="c-indent">
                    <span className="c-key">"filter"</span>
                    <span className="c-brace">: {"{"}</span>
                  </span>
                  <span className="c-indent2">
                    <span className="c-key">"state"</span>
                    <span className="c-brace">: </span>
                    <span className="c-string">"TX"</span>
                    <span className="c-brace">,</span>
                  </span>
                  <span className="c-indent2">
                    <span className="c-key">"city"</span>
                    <span className="c-brace">: </span>
                    <span className="c-string">"Amarillo"</span>
                    <span className="c-brace">,</span>
                  </span>
                  <span className="c-indent2">
                    <span className="c-key">"community"</span>
                    <span className="c-brace">: </span>
                    <span className="c-string">"veterans"</span>
                  </span>
                  <span className="c-indent">
                    <span className="c-brace">{"}"}</span>
                    <span className="c-brace">,</span>
                  </span>
                  <span className="c-indent">
                    <span className="c-key">"results"</span>
                    <span className="c-brace">: </span>
                    <span className="c-number">14</span>
                    <span className="c-brace">,</span>
                  </span>
                  <span className="c-indent">
                    <span className="c-key">"updated"</span>
                    <span className="c-brace">: </span>
                    <span className="c-string">"today"</span>
                  </span>
                  <span className="c-brace">{"}"}</span>
                </div>
                <div className="api-live-badge">
                  <div className="live-dot" />
                  <span className="live-text">Live feed — updates daily</span>
                </div>
                <div className="api-stats">
                  <div className="api-stat">
                    <span className="api-stat-num">51.2M+</span>
                    <span className="api-stat-label">Obituaries indexed</span>
                  </div>
                  <div className="api-stat">
                    <span className="api-stat-num">Daily</span>
                    <span className="api-stat-label">New additions</span>
                  </div>
                  <div className="api-stat">
                    <span className="api-stat-num">50</span>
                    <span className="api-stat-label">States covered</span>
                  </div>
                  <div className="api-stat">
                    <span className="api-stat-num">∞</span>
                    <span className="api-stat-label">Filter combinations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-rule" />

      {/* Scale Section */}
      <section className="scale-section">
        <div className="scale-inner">
          <div className="scale-header reveal">
            <div className="eyebrow">One API. Any Audience. Any Scale.</div>
            <h2>
              As broad or as niche
              <br />
              <em>as your readers need.</em>
            </h2>
            <p>
              Set your filters once. Your obituary feed updates automatically — whether you&apos;re serving a neighborhood newsletter or a national media brand.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card reveal reveal-delay-1">
              <div className="card-number">01</div>
              <div className="card-rule" />
              <span className="card-tag">Hyperlocal</span>
              <h3>The Local Newsletter</h3>
              <p>
                Surface only the obituaries your specific community cares about. Filter by neighborhood, faith tradition, military branch, profession, or any combination.
              </p>
              <div className="card-example">
                <div className="card-example-label">Example filter</div>
                <div className="card-example-text">
                  city: &quot;Amarillo&quot;
                  <br />
                  community: &quot;veterans&quot;
                </div>
              </div>
            </div>

            <div className="card reveal reveal-delay-2">
              <div className="card-number">02</div>
              <div className="card-rule" />
              <span className="card-tag">Regional</span>
              <h3>The Regional Newspaper</h3>
              <p>
                Own your metro&apos;s memorial record. Every obituary published in your coverage area — live in your CMS, automatically updated, zero editorial overhead.
              </p>
              <div className="card-example">
                <div className="card-example-label">Example filter</div>
                <div className="card-example-text">
                  state: &quot;TX&quot;
                  <br />
                  radius_miles: 150
                </div>
              </div>
            </div>

            <div className="card reveal reveal-delay-3">
              <div className="card-number">03</div>
              <div className="card-rule" />
              <span className="card-tag">National</span>
              <h3>The National Outlet</h3>
              <p>
                Deploy at any scale. Filter by state, city, or keyword — or serve the full database unfiltered. The API scales with your audience, not against it.
              </p>
              <div className="card-example">
                <div className="card-example-label">Example filter</div>
                <div className="card-example-text">
                  scope: &quot;national&quot;
                  <br />
                  keyword: &quot;military&quot;
                </div>
              </div>
            </div>
          </div>

          <div className="scale-cta reveal reveal-delay-2">
            <div className="scale-cta-text">
              <h3>Ready to see it in action?</h3>
              <p>We&apos;ll walk you through a live feed built for your exact publication in under 20 minutes.</p>
            </div>
            <div className="scale-cta-actions">
              <a href="#" className="btn-primary-cream" onClick={handleBookDemo}>
                Book a Demo
              </a>
              <a href="#" className="btn-link-cream">
                View API Docs →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}