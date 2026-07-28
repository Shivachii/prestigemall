"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Ticket,
  Utensils,
  X,
} from "./components/icons";
import { useEffect, useState } from "react";
import { tenants } from "./data/tenants";
import { getTodayHours, operationHours } from "./data/hours";
import { mallEvents } from "./data/events";

const experiences = [
  {
    eyebrow: "Taste",
    title: "Dining, elevated",
    copy: "From unhurried coffee to after-dark dining, discover flavours made for every kind of moment.",
    image: "/images/scenery/food.jpg",
    alt: "A plated meal being served at a dining table",
    link: "Explore dining",
  },
  {
    eyebrow: "Play",
    title: "Let the games begin",
    copy: "Arcade favourites, immersive play and more, all under one roof at Playza, Prestige Plaza's gaming court.",
    image: "/images/scenery/bowling.jpg",
    alt: "A bowling ball approaching illuminated pins",
    link: "Discover Playza",
  },
];

const marquee = ["SHOP", "DINE", "PLAY", "WATCH", "DISCOVER"];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="Prestige Plaza home">
      <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
    </Link>
  );
}

export default function Home() {
  const todayHours = getTodayHours();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  const [eventIndex, setEventIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("discover");
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [directoryCategory, setDirectoryCategory] = useState("All");
  const visibleTenants = tenants.filter((tenant) => {
    const query = directoryQuery.toLowerCase();
    return (directoryCategory === "All" || tenant.category === directoryCategory)
      && (tenant.name.toLowerCase().includes(query) || tenant.detail.toLowerCase().includes(query));
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const sections = ["discover", "events", "directory", "visit"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, .15, .4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-page">
      {notice && (
        <div className="notice">
          <p><span>NEW</span> Weekend parking is free after 5 PM</p>
          <button onClick={() => setNotice(false)} aria-label="Dismiss announcement"><X size={15} /></button>
        </div>
      )}

      <section className="hero">
        <header className={`nav shell ${notice ? "with-notice" : ""}`}>
          <Logo />
          <nav aria-label="Primary navigation">
            <Link href="/stores">Directory</Link>
            <Link href="/events">What&apos;s on</Link>
            <a href="#discover" className={activeSection === "discover" ? "active" : ""} aria-current={activeSection === "discover" ? "location" : undefined}>Discover</a>
            <Link href="/visit">Visit</Link>
          </nav>
          <div className="nav-actions">
            <button onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={19} /></button>
            <Link href="/map" className="nav-directory">Interactive map <ArrowUpRight size={16} /></Link>
            <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={23} /></button>
          </div>
        </header>

        <div className="hero-layout shell">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="eyebrow">Prestige Plaza · Nairobi</p>
            <h1>More than a mall.<br /><em>It&apos;s Prestige.</em></h1>
            <div className="feather-sweep" aria-hidden="true"><i /><i /><i /></div>
            <p className="hero-intro">Prestige Plaza is Nairobi&apos;s destination for shopping, dining and entertainment, beautifully brought together on Ngong Road.</p>
            <div className="hero-links">
              <a href="#discover" className="button button-gold">Explore Prestige <ArrowRight size={17} /></a>
              <Link href="/events" className="text-link">See what&apos;s on <ArrowDown size={17} /></Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-cards"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: .25 }}
          >
            <figure className="hero-card hero-card-main">
              <Image src="/images/scenery/exterior-enhanced-v2.png" alt="Prestige Plaza entrance and Ngong Road in Nairobi" fill priority sizes="(max-width: 900px) 100vw, 42vw" quality={90} />
              <figcaption><span>Discover</span> Prestige Plaza</figcaption>
            </figure>
            <figure className="hero-card">
              <Image src="/images/scenery/naivas.jpg" alt="Naivas bakery and fresh food market at Prestige Plaza" fill sizes="(max-width: 900px) 50vw, 20vw" quality={90} />
              <figcaption><span>Shop</span> Naivas</figcaption>
            </figure>
            <figure className="hero-card">
              <Image src="/images/scenery/bowling.jpg" alt="Illuminated bowling lane and pins at Playza" fill sizes="(max-width: 900px) 50vw, 20vw" quality={90} />
              <figcaption><span>Play</span> Playza</figcaption>
            </figure>
          </motion.div>
        </div>

        <div className="hero-meta shell">
          <div><MapPin size={17} /><span>Ngong Road</span><strong>Nairobi, Kenya</strong></div>
        </div>
      </section>

      <section className="quick-access shell" aria-label="Quick visitor information">
        <a href="#visit">
          <Clock3 />
          <span>Today&apos;s hours</span>
          <strong suppressHydrationWarning>{todayHours.hours}</strong>
        </a>
        <Link href="/visit">
          <MapPin />
          <span>Getting here</span>
          <strong>Matatu & boda routes</strong>
        </Link>
        <Link href="/visit">
          <ShoppingBag />
          <span>Parking</span>
          <strong>Visitor information</strong>
        </Link>
        <Link href="/visit#assistance">
          <ArrowUpRight />
          <span>Need help?</span>
          <strong>Visitor assistance</strong>
        </Link>
        <Link href="/visit">
          <Ticket />
          <span>Your safety</span>
          <strong>Security assistance</strong>
        </Link>
      </section>

      <section className="intro shell section" id="discover">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}>
          <p className="eyebrow">The Prestige experience</p>
          <h2>Everything you love,<br /><em>all in one place.</em></h2>
        </motion.div>
        <div className="intro-side">
          <p>From Naivas and Home & Beyond to Java House, Prestige Cinema and Playza, everyday essentials and memorable experiences live side by side.</p>
          <Link className="text-link" href="/stores">Explore the directory <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="experience-grid shell">
        {experiences.map((item, index) => (
          <motion.article
            className="experience-card"
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ delay: index * .12 }}
          >
            <Image src={item.image} fill alt={item.alt} sizes="(max-width: 800px) 100vw, 50vw" quality={90} />
            <div className="card-shade" />
            <div className="card-copy">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="#directory">{item.link} <ArrowUpRight size={17} /></a>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="plan-day section shell" aria-labelledby="plan-day-title">
        <div className="plan-day-heading">
          <p className="eyebrow">Make it yours</p>
          <h2 id="plan-day-title">Plan a day that<br /><em>feels effortless.</em></h2>
        </div>
        <div className="plan-day-grid">
          <Link href="/store/cinema" className="plan-card">
            <span>01</span><Ticket />
            <h3>Catch a movie</h3>
            <p>See what&apos;s showing at Prestige Cinema and choose your seats.</p>
            <strong>View showtimes <ArrowUpRight size={15} /></strong>
          </Link>
          <Link href="/map?destination=playza&route=1" className="plan-card">
            <span>02</span><ShoppingBag />
            <h3>Play at Playza</h3>
            <p>Make time for games, friendly competition and family fun.</p>
            <strong>Plan your visit <ArrowUpRight size={15} /></strong>
          </Link>
          <Link href="/stores?category=Dining" className="plan-card">
            <span>03</span><Utensils />
            <h3>Meet over a meal</h3>
            <p>From Java coffee to Beerbirds and the Food Court.</p>
            <strong>Explore dining <ArrowUpRight size={15} /></strong>
          </Link>
          <Link href="/visit" className="plan-card">
            <span>04</span><MapPin />
            <h3>Arrive with ease</h3>
            <p>Find directions, parking information and opening hours.</p>
            <strong>Visitor information <ArrowUpRight size={15} /></strong>
          </Link>
        </div>
      </section>

      <section className="events section" id="events">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What&apos;s on</p>
              <h2>Make a day of it.</h2>
            </div>
            <Link className="text-link" href="/events">View all events <ArrowRight size={17} /></Link>
          </div>

          <div className="event-feature">
            <div className="event-visual">
              <div className="event-glow" />
              <span className="event-kicker">Father&apos;s Day weekend</span>
              <div className="event-poster">
                <span>LIVE AT PRESTIGE</span>
                <strong>WORLD CUP<br />WATCH PARTY</strong>
                <small>Football. Family. Fun.</small>
              </div>
            </div>
            <div className="event-info">
              <span className="tag">Live football</span>
              <h3>Football, family and fun.</h3>
              <p>Enjoy live matches, great food, cold drinks and memorable family moments with Beerbirds and Playza at Prestige Plaza.</p>
              <div className="event-detail"><CalendarDays size={19} /><span>Father&apos;s Day weekend</span></div>
              <div className="event-detail"><MapPin size={19} /><span>Beerbirds & Playza</span></div>
              <Link href="/events#fathers-day-world-cup-watch-party" className="button button-dark">Event details <ArrowRight size={17} /></Link>
            </div>
          </div>

          <div className="event-list" id="all-events">
            {mallEvents.map((event, i) => (
              <article key={event.title} className={i === eventIndex ? "active" : ""} onMouseEnter={() => setEventIndex(i)}>
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

      <section className="directory section shell" id="directory">
        <Link href="/map" className="map-card" aria-label="Open the interactive mall map">
          <svg className="map-preview" viewBox="0 0 720 620" role="img" aria-labelledby="map-preview-title map-preview-description">
            <title id="map-preview-title">Ground Floor map preview</title>
            <desc id="map-preview-description">An isometric preview showing the main entrance, Naivas, Java House, Bata and a walking route.</desc>
            <defs>
              <pattern id="preview-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#cfd3df" strokeWidth=".7"/></pattern>
              <filter id="preview-shadow"><feDropShadow dx="0" dy="13" stdDeviation="11" floodColor="#29335f" floodOpacity=".18"/></filter>
              <linearGradient id="preview-surface" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#f2f3f7"/></linearGradient>
            </defs>
            <rect width="720" height="620" fill="#eef0f5"/>
            <rect width="720" height="620" fill="url(#preview-grid)" opacity=".7"/>
            <g className="preview-building">
              <path d="M82 201 235 116 650 180 500 271Z" fill="#e5e7ed"/>
              <path d="M82 201 500 271 500 505 82 433Z" fill="url(#preview-surface)" stroke="#bec3cf" filter="url(#preview-shadow)"/>
              <path d="M500 271 650 180 650 413 500 505Z" fill="#d3d7e1" stroke="#b8bdc9"/>
              <path d="M112 239 470 299 470 465 112 404Z" fill="#f8f8f6" stroke="#d0d3da"/>
              <g className="preview-tenant preview-naivas">
                <path d="M132 261 283 286 283 375 132 350Z" fill="#fcfcfa" stroke="#c5c9d1"/>
                <path d="M132 261 139 262 139 351 132 350Z" fill="#6571a9"/>
                <text x="208" y="315">Naivas</text><text className="preview-type" x="208" y="331">SHOPPING</text>
              </g>
              <g className="preview-tenant preview-java">
                <path d="M294 288 390 304 390 375 294 359Z" fill="#fcfcfa" stroke="#c5c9d1"/>
                <path d="M294 288 301 289 301 360 294 359Z" fill="#bf7650"/>
                <text x="342" y="329">Java House</text><text className="preview-type" x="342" y="344">DINING</text>
              </g>
              <g className="preview-tenant preview-bata">
                <path d="M132 363 234 380 234 421 132 404Z" fill="#fcfcfa" stroke="#c5c9d1"/>
                <path d="M132 363 139 364 139 405 132 404Z" fill="#6571a9"/>
                <text x="183" y="394">Bata</text>
              </g>
              <g className="preview-tenant">
                <path d="M245 382 390 406 390 447 245 423Z" fill="#fcfcfa" stroke="#c5c9d1"/>
                <path d="M245 382 252 383 252 424 245 423Z" fill="#4e8f8b"/>
                <text x="318" y="414">Airtel</text>
              </g>
              <g className="preview-tenant">
                <path d="M401 306 457 315 457 447 401 438Z" fill="#fcfcfa" stroke="#c5c9d1"/>
                <path d="M401 306 408 307 408 439 401 438Z" fill="#66727b"/>
                <text x="430" y="375" transform="rotate(9 430 375)">Lift</text>
              </g>
              <path className="preview-route-shadow" d="M98 435 C145 469 214 471 260 439 S329 375 344 339"/>
              <path className="preview-route" d="M98 435 C145 469 214 471 260 439 S329 375 344 339"/>
              <circle className="preview-route-dot" cx="344" cy="339" r="7"/>
              <g className="preview-entrance"><circle cx="98" cy="435" r="18"/><path d="m91 435 6 6 10-13"/><text x="74" y="470">MAIN ENTRANCE</text></g>
            </g>
          </svg>
          <span className="map-floor"><small>LEVEL G</small> Ground Floor</span>
          <div className="map-preview-cta"><span>Explore all three levels</span><strong>Open interactive map <ArrowUpRight size={16}/></strong></div>
        </Link>
        <div className="directory-copy">
          <p className="eyebrow">Find your way</p>
          <h2>Your next favourite<br />is closer than you think.</h2>
          <p>Find your favourites, from Naivas and Home & Beyond to Java House, Prestige Cinema and Playza, or discover somewhere new.</p>
          <div className="directory-search">
            <Search size={19} />
            <input
              aria-label="Search mall directory"
              placeholder="Search stores, dining & more"
              value={directoryQuery}
              onChange={(event) => setDirectoryQuery(event.target.value)}
            />
            <Link href="/map" aria-label="Open interactive directory"><ArrowRight size={18} /></Link>
          </div>
          <div className="quick-links" aria-label="Directory categories">
            {["All", "Shopping", "Dining", "Entertainment", "Services"].map((category) => (
              <button
                key={category}
                className={directoryCategory === category ? "selected" : ""}
                onClick={() => setDirectoryCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="tenant-directory">
          <div className="tenant-directory-heading">
            <span>Explore Prestige</span>
            <strong>{visibleTenants.length.toString().padStart(2, "0")} places</strong>
          </div>
          <div className="tenant-grid">
            {visibleTenants.map((tenant) => (
              <motion.a
                href={tenant.internalPath ?? `/stores/${tenant.slug}`}
                className="tenant-card"
                key={tenant.name}
                layout
              >
                <div className={`tenant-monogram ${tenant.logo ? "has-logo" : ""} ${tenant.logoText ? "has-wordmark" : ""}`}>
                  {tenant.logo
                    ? <Image src={tenant.logo} alt={`${tenant.name} logo`} width={512} height={512} sizes="110px" quality={100} unoptimized />
                    : tenant.logoText
                      ? <span style={{ color: tenant.logoColor }}>{tenant.logoText}</span>
                      : tenant.name.charAt(0)}
                </div>
                <div>
                  <span>{tenant.category} · {tenant.floor}</span>
                  <h3>{tenant.name}</h3>
                  <p>{tenant.detail}</p>
                </div>
                <ArrowUpRight size={17} />
              </motion.a>
            ))}
          </div>
          {visibleTenants.length === 0 && <p className="empty-directory">No places match your search yet.</p>}
        </div>
      </section>

      <section className="inside section shell" aria-labelledby="inside-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inside Prestige</p>
            <h2 id="inside-title">A place for<br />every kind of day.</h2>
          </div>
          <p className="inside-intro">Meet for coffee, find the everyday essentials, catch a film or make an afternoon of it with the family.</p>
        </div>
        <div className="inside-grid">
          <figure className="inside-tile inside-wide">
            <Image src="/images/scenery/exterior-enhanced-v2.png" alt="Prestige Plaza entrance and Ngong Road in Nairobi" fill sizes="(max-width: 700px) 100vw, 65vw" quality={90} />
            <figcaption><span>01</span> The mall</figcaption>
          </figure>
          <figure className="inside-tile">
            <Image src="/images/scenery/naivas.jpg" alt="Bakery and fresh food market inside Naivas" fill sizes="(max-width: 700px) 100vw, 35vw" quality={90} />
            <figcaption><span>02</span> Naivas</figcaption>
          </figure>
          <figure className="inside-tile">
            <Image src="/images/scenery/bowling.jpg" alt="Illuminated bowling lane and pins at Playza" fill sizes="(max-width: 700px) 100vw, 35vw" quality={90} />
            <figcaption><span>03</span> Playza</figcaption>
          </figure>
        </div>
      </section>

      <section className="visit" id="visit">
        <div className="marquee" aria-hidden="true">
          {[...marquee, ...marquee].map((word, i) => <span key={`${word}-${i}`}>{word} <i>✦</i></span>)}
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
            <div className="hours-panel-heading">
              <span>Hours of operation</span>
              <strong>Open seven days a week</strong>
            </div>
            <div className="hours-list">
              {operationHours.map((entry) => (
                <div className={entry.day === todayHours.day ? "today" : ""} key={entry.day} suppressHydrationWarning>
                  <span>{entry.day}</span>
                  <strong>{entry.hours}</strong>
                  {entry.day === todayHours.day && <small>Today</small>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main shell">
          <div>
            <Logo light />
            <p>Where Nairobi comes together.</p>
          </div>
          <div className="footer-column"><span>Explore</span><Link href="/stores?category=Shopping">Shopping</Link><Link href="/stores?category=Dining">Dining</Link><Link href="/stores?category=Entertainment">Entertainment</Link><Link href="/events">Events</Link><Link href="/map">Interactive map</Link></div>
          <div className="footer-column"><span>Visit</span><Link href="/visit#directions">Getting here</Link><Link href="/visit#hours">Opening hours</Link><Link href="/map">Parking map</Link><Link href="/visit">Visitor information</Link></div>
          <div className="newsletter">
            <span>Stay in the know</span>
            <p>New openings, events and offers, straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()}><input type="email" aria-label="Email address" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight /></button></form>
          </div>
        </div>
        <div className="footer-bottom shell">
          <span>© 2026 Prestige Plaza</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="overlay-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 25 }}>
            <div className="overlay-top shell"><Logo light /><button onClick={() => setMenuOpen(false)}><X /></button></div>
            <nav>
              {[
                { label: "Discover", href: "#discover" },
                { label: "Shopping", href: "/stores?category=Shopping" },
                { label: "Dining", href: "/stores?category=Dining" },
                { label: "Entertainment", href: "/stores?category=Entertainment" },
                { label: "What's on", href: "/events" },
                { label: "Interactive map", href: "/map" },
                { label: "Visit", href: "/visit" },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .18 + i * .06 }}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)} aria-current={item.href === `#${activeSection}` ? "location" : undefined}>
                    <span>0{i + 1}</span>{item.label}<ArrowUpRight />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
        {searchOpen && (
          <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="search-close" onClick={() => setSearchOpen(false)}><X /></button>
            <form action="/search" method="get">
              <p className="eyebrow light">What are you looking for?</p>
              <label><Search /><input autoFocus name="q" type="search" placeholder="Search Prestige" /></label>
              <span>Try “cinema”, “lunch” or “kids activities”</span>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#discover" className={activeSection === "discover" ? "active" : ""} aria-current={activeSection === "discover" ? "location" : undefined}><ShoppingBag /><span>Discover</span></a>
        <Link href="/events"><CalendarDays /><span>What&apos;s on</span></Link>
        <button className={searchOpen ? "active" : ""} aria-expanded={searchOpen} onClick={() => setSearchOpen(true)}><Search /><span>Search</span></button>
        <Link href="/map"><MapPin /><span>Map</span></Link>
      </nav>
    </main>
  );
}
