"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search, X } from "../icons";
import { tenants } from "../../data/tenants";

const categories = ["All", "Shopping", "Dining", "Entertainment", "Services"];

export function DirectorySection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visibleTenants = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return tenants.filter((tenant) =>
      (category === "All" || tenant.category === category)
      && (tenant.name.toLowerCase().includes(normalizedQuery) || tenant.detail.toLowerCase().includes(normalizedQuery)),
    );
  }, [category, query]);

  return (
    <section className="directory section shell" id="directory">
      <div className="directory-copy">
        <p className="eyebrow">Find your way</p>
        <h2>Your next favourite<br />is closer than you think.</h2>
        <p>Find your favourites, from Naivas and Home & Beyond to Java House, Prestige Cinema and Playza, or discover somewhere new.</p>
        <div className="directory-search">
          <Search size={19} />
          <input aria-label="Search mall directory" placeholder="Search stores, dining & more" value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear directory search"><X size={17} /></button>}
        </div>
        <div className="quick-links" aria-label="Directory categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <Link href="/map" className="text-link directory-map-link">View interactive map <MapPin size={16} /></Link>
      </div>
      <div className="tenant-directory">
        <div className="tenant-directory-heading"><span>Explore Prestige</span><strong>{visibleTenants.length.toString().padStart(2, "0")} places</strong></div>
        <div className="tenant-grid">
          {visibleTenants.map((tenant) => (
            <motion.a href={tenant.internalPath ?? `/stores/${tenant.slug}`} className="tenant-card" key={tenant.name} layout>
              <div className={`tenant-monogram ${tenant.logo ? "has-logo" : ""} ${tenant.logoText ? "has-wordmark" : ""}`}>
                {tenant.logo
                  ? <Image src={tenant.logo} alt={`${tenant.name} logo`} width={512} height={512} sizes="110px" quality={100} unoptimized />
                  : tenant.logoText
                    ? <span style={{ color: tenant.logoColor }}>{tenant.logoText}</span>
                    : tenant.name.charAt(0)}
              </div>
              <div><span>{tenant.category} · {tenant.floor}</span><h3>{tenant.name}</h3><p>{tenant.detail}</p></div>
              <ArrowUpRight size={17} />
            </motion.a>
          ))}
        </div>
        {visibleTenants.length === 0 && <p className="empty-directory">No places match your search yet.</p>}
      </div>
    </section>
  );
}
