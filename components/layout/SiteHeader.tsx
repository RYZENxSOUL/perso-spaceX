import { Orbit, Search } from "lucide-react";
import Link from "next/link";

export function SiteHeader({ active = "Explore" }: { active?: string }) {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Cosmyth home">
        <span className="brand-mark"><Orbit size={17} strokeWidth={1.7} /></span>
        <span><strong>COS</strong><em>MYTH</em></span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link className={active === "Explore" ? "active" : ""} href="/">Explore</Link>
        <Link className={active === "Theories" ? "active" : ""} href="/theories">Theories</Link>
        <Link className={active === "Missions" ? "active" : ""} href="/missions">Missions</Link>
        <Link className={active === "Observatory" ? "active" : ""} href="/observatory">Observatory</Link>
      </nav>
      <div className="top-actions">
        <button className="icon-button" aria-label="Search"><Search size={17} /></button>
        <button className="status-button"><span className="status-dot" />Live telemetry</button>
        <button className="avatar" aria-label="Open profile">CM</button>
      </div>
    </header>
  );
}
