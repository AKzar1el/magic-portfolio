// app/pricing/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import styles from "./Pricing.module.scss";
import PricingClient, { Plan, Addon } from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — Beauty TikTok Ad Kit & Shopify PDP Loops",
  description:
    "Simple, transparent pricing. Two packs (Ad Kit & PDP Loops) with optional add-ons for Paid Usage and Allowlisting. 24h SLA.",
  openGraph: {
    title: "Pricing — Beauty TikTok Ad Kit & Shopify PDP Loops",
    description:
      "Two packs with clear deliverables, optional Paid Usage & Allowlisting add-ons, and a 24h SLA.",
    type: "website",
    url: "/pricing",
  },
};

const plans: Plan[] = [
  {
    id: "ad-kit",
    name: "Beauty TikTok Ad Kit",
    price: 420,
    unit: "per product",
    blurb:
      "6 ad-ready vertical variants in 24h. Caption files + thumbnails included.",
    ctaHref: "/#intake",
    ctaLabel: "Start — Upload Assets",
    features: [
      "6× 6–12s vertical (MP4 1080×1920)",
      ".SRT captions for each variant",
      "6 thumbnails (cover frames)",
      "1 revision (captions/cuts/timing) within 7 days",
      "24h SLA or 25% credit next order",
    ],
  },
  {
    id: "pdp-pack",
    name: "Shopify PDP Loop Pack",
    price: 260,
    unit: "per product",
    blurb: "Silent product loops for PDP. 3 aspect ratios + embed snippet.",
    ctaHref: "/#intake",
    ctaLabel: "Start — Upload Assets",
    features: [
      "3 loops: 9:16 / 1:1 / 4:5 (5–8s)",
      "Autoplay+loop+muted+playsinline snippet",
      "1 revision (timing/trim) within 7 days",
      "24h SLA or 25% credit next order",
    ],
  },
];

const addons: Addon[] = [
  { id: "paid-usage", name: "Paid Usage (ads)", pct: 0.35 },
  { id: "allowlisting", name: "Allowlisting (Spark)", pct: 0.15 },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Pricing",
    itemListElement: plans.map((p) => ({
      "@type": "Offer",
      priceCurrency: "USD",
      price: p.price,
      url: p.ctaHref,
      category: "Service",
      itemOffered: { "@type": "Service", name: p.name, description: p.blurb },
      addOn: addons.map((a) => ({
        "@type": "Offer",
        description: `${a.name} (+${Math.round(a.pct * 100)}%)`,
        priceCurrency: "USD",
      })),
    })),
  };
}

export default function PricingPage() {
  return (
    <main>
      {/* JSON-LD (Script is fine from a Server Component) */}
      <Script
        id="pricing-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className={styles.wrapper}>
        <header>
          <div className={styles.kicker}>Pricing</div>
          <h1 className={styles.title}>Simple, transparent pricing</h1>
          <p className={styles.lead}>
            Two focused packs. Optional add-ons for paid usage and allowlisting. 24h SLA.
          </p>
        </header>

        {/* Interactive cards rendered by a Client component */}
        <PricingClient plans={plans} addons={addons} />

        {/* Static sections keep as-is */}
        <div className={styles.addonSection}>
          <h3 className={styles.addonTitle}>Add-ons</h3>
          <ul className={styles.addonList}>
            <li className={styles.addonItem}>
              <div className={styles.addonHead}>
                <span className={styles.addonName}>Paid Usage License</span>
                <span className={styles.addonPrice}>+35%</span>
              </div>
              <p className={styles.addonDesc}>
                Run as paid ads on TikTok/Instagram/YouTube. Organic (12 months) is included by default.
              </p>
            </li>
            <li className={styles.addonItem}>
              <div className={styles.addonHead}>
                <span className={styles.addonName}>Spark / Allowlisting</span>
                <span className={styles.addonPrice}>+15%</span>
              </div>
              <p className={styles.addonDesc}>
                Run ads from a creator handle (Spark Ads / allowlisted handle).
              </p>
            </li>
          </ul>
        </div>

        <aside className={styles.notes}>
          <ul>
            <li>24h clock starts after successful Stripe payment and asset verification (before 5pm ET).</li>
            <li>If we miss the SLA, a 25% credit is applied to your next order automatically.</li>
            <li>One revision per deliverable (captions/cuts/timing) within 7 days.</li>
            <li>We retain ownership; you receive a license. Add-ons expand usage rights.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
