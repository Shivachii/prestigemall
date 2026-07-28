import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Users } from "../components/icons";
import { featuredEvent, mallEvents } from "../data/events";

export const metadata: Metadata = {
  title: "Events | Prestige Plaza",
  description: "Discover events, watch parties and community experiences at Prestige Plaza on Ngong Road, Nairobi.",
};

export default function EventsPage() {
  return (
    <main className="events-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
      </header>

      <section className="events-page-hero shell">
        <p className="eyebrow">What&apos;s on</p>
        <div>
          <h1>Come together.<br /><em>Stay for the moment.</em></h1>
          <p>From live football and family weekends to cultural celebrations and friendly competition, there is always another reason to meet at Prestige.</p>
        </div>
      </section>

      <section className="events-page-feature shell" id={featuredEvent.slug}>
        <div className="events-page-poster">
          <span>LIVE AT PRESTIGE</span>
          <strong>WORLD CUP<br />WATCH PARTY</strong>
          <small>Football. Family. Fun.</small>
        </div>
        <div className="events-page-feature-copy">
          <span className="tag">{featuredEvent.type}</span>
          <h2>{featuredEvent.title}</h2>
          <p>{featuredEvent.summary}</p>
          <div><CalendarDays size={18} /> {featuredEvent.time}</div>
          <div><MapPin size={18} /> {featuredEvent.venue}</div>
          <Link href="/stores/beerbirds" className="text-link">Discover Beerbirds <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="all-events-page shell">
        <div className="all-events-heading">
          <div>
            <p className="eyebrow">Latest to earliest</p>
            <h2>All events</h2>
          </div>
          <span>{mallEvents.length} events</span>
        </div>

        <div className="events-page-grid">
          {mallEvents.map((event, index) => (
            <article id={event.slug} key={event.slug} className="events-page-card">
              <div className="events-page-date">
                <strong>{event.day}</strong>
                <span>{event.month}</span>
              </div>
              <div className="events-page-card-copy">
                <span className="tag">{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <div className="events-card-meta">
                  <span><MapPin size={15} /> {event.venue}</span>
                  <span><Clock3 size={15} /> {event.time}</span>
                </div>
                {event.details && (
                  <ul>
                    {event.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
              </div>
              <span className="events-page-number">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="events-visit-banner">
        <div className="shell">
          <Users />
          <div>
            <p className="eyebrow light">Make a day of it</p>
            <h2>Plan your visit to Prestige.</h2>
          </div>
          <Link href="/visit" className="button button-outline">Visitor information <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
