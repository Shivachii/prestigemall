"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "../icons";
import { featuredEvent, mallEvents } from "../../data/events";

export function EventsSection() {
  const [eventIndex, setEventIndex] = useState(0);
  return (
    <section className="events section" id="events">
      <div className="shell">
        <div className="section-heading">
          <div><p className="eyebrow">What&apos;s on</p><h2>Make a day of it.</h2></div>
          <Link className="text-link" href="/events">View all events <ArrowRight size={17} /></Link>
        </div>
        <div className="event-feature">
          <div className="event-visual">
            <div className="event-glow" />
            <span className="event-kicker">{featuredEvent.time}</span>
            <div className="event-poster"><span>LIVE AT PRESTIGE</span><strong>{featuredEvent.title}</strong><small>{featuredEvent.type}</small></div>
          </div>
          <div className="event-info">
            <span className="tag">{featuredEvent.type}</span>
            <h3>{featuredEvent.title}</h3>
            <p>{featuredEvent.summary}</p>
            <div className="event-detail"><CalendarDays size={19} /><span>{featuredEvent.time}</span></div>
            <div className="event-detail"><MapPin size={19} /><span>{featuredEvent.venue}</span></div>
            <Link href={`/events#${featuredEvent.slug}`} className="button button-dark">Event details <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="event-list" id="all-events">
          {mallEvents.map((event, index) => (
            <article key={event.title} className={index === eventIndex ? "active" : ""} onMouseEnter={() => setEventIndex(index)}>
              <div className="date"><strong>{event.day}</strong><span>{event.month}</span></div>
              <span className="event-type">{event.type}</span>
              <div className="event-name"><h4>{event.title}</h4><p>{event.summary}</p></div>
              <time>{event.venue}<br />{event.time}</time>
              <Link href={`/events#${event.slug}`} aria-label={`View ${event.title}`}><ArrowUpRight size={18} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
