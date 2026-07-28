"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "../components/icons";
import { useState } from "react";
import { tenants } from "../data/tenants";

const categories = ["All", "Shopping", "Dining", "Entertainment", "Services"] as const;
type Category = (typeof categories)[number];

export default function StoresDirectory({ initialCategory = "All" }: { initialCategory?: Category }) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const visibleTenants = activeCategory === "All"
    ? tenants
    : tenants.filter((tenant) => tenant.category === activeCategory);

  return (
    <section className="stores-list shell">
      <div className="directory-tabs" role="tablist" aria-label="Store categories">
        {categories.map((category) => {
          const count = category === "All"
            ? tenants.length
            : tenants.filter((tenant) => tenant.category === category).length;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <small>{count.toString().padStart(2, "0")}</small>
            </button>
          );
        })}
      </div>

      <div className="filtered-directory-heading">
        <h2>{activeCategory === "All" ? "All places" : activeCategory}</h2>
        <span>{visibleTenants.length.toString().padStart(2, "0")} results</span>
      </div>

      <div className="store-page-grid">
        {visibleTenants.map((tenant) => (
          <Link
            href={tenant.internalPath ?? `/stores/${tenant.slug}`}
            className="store-page-card"
            key={tenant.slug}
          >
            <div className={`store-page-mark ${tenant.logo ? "has-logo" : ""} ${tenant.logoText ? "has-wordmark" : ""}`}>
              {tenant.logo
                ? <Image src={tenant.logo} alt={`${tenant.name} logo`} width={1024} height={1024} sizes="110px" quality={100} unoptimized />
                : tenant.logoText
                  ? <span style={{ color: tenant.logoColor }}>{tenant.logoText}</span>
                  : tenant.name.charAt(0)}
            </div>
            <div>
              <span>{tenant.detail}</span>
              <h3>{tenant.name}</h3>
              <p><MapPin size={13} /> {tenant.floor}</p>
            </div>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}
