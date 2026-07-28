import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "./components/icons";

export default function NotFound() {
  return (
    <main className="status-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
      </header>
      <section className="status-page-content shell">
        <span className="status-code">404</span>
        <p className="eyebrow">This way back</p>
        <h1>That place<br />isn&apos;t on the map.</h1>
        <p>The page may have moved, or the address might not be quite right. Let&apos;s get your day back on track.</p>
        <div>
          <Link href="/" className="button button-dark">Return home <ArrowRight size={16} /></Link>
          <Link href="/stores" className="text-link">Browse the directory <MapPin size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
