"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "../icons";
import { operationHours } from "../../data/hours";
import { Logo } from "./Logo";

const marquee = ["SHOP", "DINE", "PLAY", "WATCH", "DISCOVER"];

export function VisitSection({ today }: { today: { day: string; hours: string } }) {
  return (
    <section className="visit" id="visit">
      <div className="marquee" aria-hidden="true">
        {[...marquee, ...marquee].map((word, index) => <span key={`${word}-${index}`}>{word} <i>✦</i></span>)}
      </div>
      <div className="visit-inner shell">
        <h2>See you at Prestige.</h2>
        <p>Ngong Road, Nairobi · Open daily</p>
        <div>
          <a href="https://www.google.com/maps/search/?api=1&query=Prestige+Plaza+Ngong+Road+Nairobi" target="_blank" rel="noopener noreferrer" className="button button-gold">Get directions <MapPin size={17} /></a>
          <Link href="/visit" className="button button-outline">Visitor information <ArrowRight size={17} /></Link>
        </div>
        <span className="loyalty-link">Prestige Rewards · Coming soon</span>
        <div className="hours-panel">
          <div className="hours-panel-heading"><span>Hours of operation</span><strong>Open seven days a week</strong></div>
          <div className="hours-list">
            {operationHours.map((entry) => (
              <div className={entry.day === today.day ? "today" : ""} key={entry.day} suppressHydrationWarning>
                <span>{entry.day}</span><strong>{entry.hours}</strong>
                {entry.day === today.day && <small>Today</small>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFooter() {
  return (
    <footer>
      <div className="footer-main shell">
        <div><Logo light /><p>Where Nairobi comes together.</p></div>
        <div className="footer-column"><span>Explore</span><Link href="/stores?category=Shopping">Shopping</Link><Link href="/stores?category=Dining">Dining</Link><Link href="/stores?category=Entertainment">Entertainment</Link><Link href="/events">Events</Link><Link href="/map">Interactive map</Link></div>
        <div className="footer-column"><span>Visit</span><Link href="/visit#directions">Getting here</Link><Link href="/visit#hours">Opening hours</Link><Link href="/map">Parking map</Link><Link href="/visit">Visitor information</Link></div>
        <div className="newsletter">
          <span>Stay in the know</span>
          <p>New openings, events and offers, straight to your inbox.</p>
          <strong className="newsletter-status">Newsletter sign-up · Coming soon</strong>
        </div>
      </div>
      <div className="footer-bottom shell"><span>© 2026 Prestige Plaza</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </footer>
  );
}
