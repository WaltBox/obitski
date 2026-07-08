import { Link } from "../router.jsx";

export default function WhoIAm() {
  return (
    <main className="placeholder">
      <img src="/obitski-logo.png" alt="" className="placeholder-emblem" />
      <h1>Who I Am</h1>
      <p>This chapter is coming next.</p>
      <Link to="/" className="placeholder-back">
        ← Back
      </Link>
    </main>
  );
}
