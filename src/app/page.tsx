import Link from "next/link";

export default function EntryPage() {
  return (
    <section className="entry">
      <div className="entry-bg" />
      <div className="entry-overlay" />
      <div className="entry-badge">16th Anniversary</div>
      <h1 className="entry-title">素晴らしき日々</h1>
      <p className="entry-subtitle">Subarashiki Hibi</p>
      <p className="entry-year">2010 — 2026</p>
      <Link href="/memories" className="entry-enter">
        <span>enter</span>
        <span className="entry-enter-line" />
      </Link>
    </section>
  );
}
