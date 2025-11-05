// app/pricing/PricingClient.tsx
"use client";

import { useMemo, useState } from "react";
import styles from "./Pricing.module.scss";

export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: "per product" | "one-time";
  blurb: string;
  ctaHref: string;
  ctaLabel: string;
  features: string[];
};

export type Addon = { id: "paid-usage" | "allowlisting"; name: string; pct: number };

function fmt(amount: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function PlanCard({
  plan,
  paidPct,
  allowPct,
}: {
  plan: Plan;
  paidPct: number;
  allowPct: number;
}) {
  const [paid, setPaid] = useState(false);
  const [allow, setAllow] = useState(false);

  const total = useMemo(
    () => plan.price * (1 + (paid ? paidPct : 0) + (allow ? allowPct : 0)),
    [plan.price, paid, allow, paidPct, allowPct]
  );

  return (
    <article className={styles.planCard}>
      <header className={styles.planHeader}>
        <h2 className={styles.planName}>{plan.name}</h2>
        <p className={styles.planBlurb}>{plan.blurb}</p>
      </header>

      <div className={styles.priceRow}>
        <span className={styles.priceValue}>${plan.price}</span>
        <span className={styles.priceUnit}> {plan.unit}</span>
      </div>

      <ul className={styles.featureList}>
        {plan.features.map((f, i) => (
          <li key={i} className={styles.featureItem}>
            {f}
          </li>
        ))}
      </ul>

      {/* Quick toggles */}
      <form className={styles.addonsForm} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
            aria-label="Paid Usage (ads)"
          />
          <span className={styles.toggleVisual} aria-hidden="true" />
          <span className={styles.toggleLabel}>
            Paid Usage (ads) <em>+35%</em>
          </span>
        </label>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={allow}
            onChange={(e) => setAllow(e.target.checked)}
            aria-label="Allowlisting (Spark)"
          />
          <span className={styles.toggleVisual} aria-hidden="true" />
          <span className={styles.toggleLabel}>
            Allowlisting (Spark) <em>+15%</em>
          </span>
        </label>
      </form>

      {/* Collapsible details (same motion as FAQ) */}
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span className={styles.summaryText}>What’s inside</span>
          <span className={styles.summaryIcon}>
            <svg
              className={styles.chevron}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </summary>
        <div className={styles.answerWrap}>
          <div className={styles.answer}>
            {plan.id === "ad-kit" ? (
              <p>
                Six ad variants (MP4 1080×1920) + matching SRT captions and thumbnails. One
                included revision within 7 days.
              </p>
            ) : (
              <p>
                Three silent loops (5–8s) in 9:16, 1:1, and 4:5, plus an
                autoplay/muted/loop/playsinline snippet for PDP.
              </p>
            )}
          </div>
        </div>
      </details>

      {/* Total (live) */}
      <div className={styles.totalRow}>
        <span>Total</span>
        <strong className={styles.totalValue} data-total>
          {fmt(total)}
        </strong>
      </div>

      <div className={styles.ctaRow}>
        <a href={plan.ctaHref} className={styles.btnPrimary}>
          {plan.ctaLabel}
        </a>
        <a href="/#pricing" className={styles.btnGhost}>
          See Process
        </a>
      </div>
    </article>
  );
}

export default function PricingClient({ plans, addons }: { plans: Plan[]; addons: Addon[] }) {
  const paidPct = addons.find((a) => a.id === "paid-usage")?.pct ?? 0.35;
  const allowPct = addons.find((a) => a.id === "allowlisting")?.pct ?? 0.15;

  return (
    <div className={styles.cardGrid}>
      {plans.map((p) => (
        <PlanCard key={p.id} plan={p} paidPct={paidPct} allowPct={allowPct} />
      ))}
    </div>
  );
}
