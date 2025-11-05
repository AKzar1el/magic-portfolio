// app/faq/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import styles from "./FAQ.module.scss";

export const metadata: Metadata = {
  title: "FAQ — Beauty TikTok Ad Kit & Shopify PDP Loops",
  description:
    "Answers about deliverables, licensing, 24h SLA, Spark/allowlisting, and PDP autoplay. Upload today → 6 ad-ready variants tomorrow.",
  openGraph: {
    title: "FAQ — Beauty TikTok Ad Kit & Shopify PDP Loops",
    description:
      "Answers about deliverables, licensing, 24h SLA, Spark/allowlisting, and PDP autoplay.",
    type: "website",
    url: "/faq",
  },
};

const faqs = [
  { q: "Do I need to ship product?", a: "No. Upload 3–10 photos per product plus logo and brand colors. We build variants from your assets." },
  { q: "What exactly do I get in 24 hours?", a: "Beauty TikTok Ad Kit: 6× 6–12s 9:16 ad variants (MP4 1080×1920), .SRT captions, 6 thumbnails. Shopify PDP Loop Pack: 3 silent loops (5–8s) in 9:16 / 1:1 / 4:5, plus an embed snippet." },
  { q: "What starts the 24h clock?", a: "Successful Stripe payment and asset verification on orders placed before 5pm ET. If we miss, you automatically get a 25% credit on your next order." },
  { q: "Can I run these as ads (paid)?", a: "Organic-only (12 months) is included. Add the Paid Usage license (+35%) to use on TikTok/Instagram/YouTube ads." },
  { q: "What about Spark/allowlisting (run ads from a creator handle)?", a: "That’s a separate permission add-on (+15%). We’ll provide the authorization steps if you choose this option." },
  { q: "Will PDP videos autoplay on mobile?", a: "Yes—use our snippet with autoplay, muted, loop, playsinline. Muted is required for mobile autoplay." },
  { q: "How many revisions are included?", a: "One round (captions/cuts/timing) per deliverable within 7 days. New hooks or concept changes are new work." },
  { q: "Do you label AI content?", a: "We add a small “AI-assisted” label when visuals are realistic, aligned with major platform policies." },
  { q: "Who owns the videos?", a: "We retain ownership; you receive a license. Organic-only is included; Paid Usage/Allowlisting expand rights for ads." },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function FAQPage() {
  return (
    <main>
      {/* JSON-LD for rich results */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className={styles.wrapper}>
        <header>
          <div className={styles.kicker}>FAQ</div>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.lead}>
            Answers about deliverables, licensing, the 24h SLA, and platform details.
          </p>
        </header>

        <div className={styles.card}>
          {faqs.map(({ q, a }, i) => (
            <details className={styles.details} key={i}>
              <summary className={styles.summary}>
                <span className={styles.summaryText}>{q}</span>
                <span className={styles.summaryIcon}>
                  <svg
                    className={styles.chevron}
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>

              <div className={styles.answerWrap}>
                <div className={styles.answer}>{a}</div>
              </div>
            </details>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="/#intake" className={styles.btnPrimary}>Start → Upload &amp; Brief</a>
          <a href="/#pricing" className={styles.btnGhost}>See Pricing</a>
        </div>
      </section>
    </main>
  );
}
