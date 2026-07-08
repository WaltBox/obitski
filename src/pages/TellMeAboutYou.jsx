import { useState } from "react";
import { Link } from "../router.jsx";

const ORG_TYPES = [
  "Newspaper",
  "Radio Station",
  "Television Station",
  "Digital Publisher",
  "Other",
];

const EMPTY = {
  type: "",
  org: "",
  cities: "",
  name: "",
  email: "",
  message: "",
};

export default function TellMeAboutYou() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <main className="form-page">
        <div className="form-done">
          <img src="/obitski-logo.png" alt="" className="form-emblem" />
          <h1>Thank you{firstName ? `, ${firstName}` : ""}.</h1>
          <p>
            I&apos;ve got your note{form.org ? ` about ${form.org.trim()}` : ""}.
            I&apos;ll read it closely and be in touch soon.
          </p>
          <Link to="/" className="placeholder-back">
            ← Back to the start
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="form-page">
      <form className="tmay" onSubmit={handleSubmit}>
        <Link to="/" className="form-banner-link" aria-label="Obitski home">
          <img src="/who-am.png" alt="" className="form-banner" />
        </Link>

        <header className="form-head">
          <h1>Tell Me About You</h1>
          <p className="form-subhead">
            I&apos;d love to learn about your news organization.
          </p>
        </header>

        <fieldset className="field opt-field">
          <legend className="field-label">
            What type of organization are you?
          </legend>
          <div className="opt-group">
            {ORG_TYPES.map((t) => (
              <label key={t} className={`opt ${form.type === t ? "opt-on" : ""}`}>
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={form.type === t}
                  onChange={set("type")}
                  required
                />
                <span className="opt-dot" />
                <span className="opt-text">{t}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span className="field-label">Organization Name</span>
          <input
            className="field-input"
            type="text"
            value={form.org}
            onChange={set("org")}
            autoComplete="organization"
          />
        </label>

        <label className="field">
          <span className="field-label">What city or cities do you serve?</span>
          <input
            className="field-input"
            type="text"
            value={form.cities}
            onChange={set("cities")}
            placeholder="e.g. Amarillo, TX"
          />
        </label>

        <label className="field">
          <span className="field-label">Your Name</span>
          <input
            className="field-input"
            type="text"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
          />
        </label>

        <label className="field">
          <span className="field-label">Email Address</span>
          <input
            className="field-input"
            type="email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">
            Tell me about your community or what you&apos;re looking for.
          </span>
          <textarea
            className="field-input field-textarea"
            rows={4}
            value={form.message}
            onChange={set("message")}
          />
        </label>

        <button type="submit" className="form-submit">
          Send to Obitski
        </button>
      </form>
    </main>
  );
}
