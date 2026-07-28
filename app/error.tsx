"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "./components/icons";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="status-page status-error">
      <section className="status-page-content shell">
        <span className="status-code">Oops</span>
        <p className="eyebrow">Something went wrong</p>
        <h1>We hit an<br />unexpected turn.</h1>
        <p>Please try loading this page again. If the problem continues, return home and begin from there.</p>
        <div>
          <button type="button" className="button button-dark" onClick={reset}>Try again <RefreshCw size={16} /></button>
          <Link href="/" className="text-link"><ArrowLeft size={16} /> Return home</Link>
        </div>
      </section>
    </main>
  );
}
