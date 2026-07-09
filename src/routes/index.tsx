import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Star, ShieldCheck, Truck, Sparkles, Flame,
} from "lucide-react";

import { bestSellers, featured, perfumes } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { Lookbook } from "@/components/site/Lookbook";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxorée — Hand-Blended Luxury Fragrances | Made in India" },
      { name: "description", content: "Eight signature Eau de Parfums, hand-blended in India. 8–10 hour longevity, IFRA-compliant. Free delivery over ₹999, cash on delivery available." },
      { property: "og:title", content: "Luxorée — Live Luxuriously" },
      { property: "og:description", content: "Eight signature fragrances. Long-lasting, hand-blended, unmistakably premium." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.domain}/` },
      { property: "og:image", content: perfumes[0].image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: perfumes[0].image },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Luxorée",
          url: SITE.domain,
          logo: `${SITE.domain}/favicon.ico`,
          sameAs: [SITE.owner.instagramUrl],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: SITE.owner.phone,
            contactType: "customer support",
            email: SITE.owner.email,
            areaServed: "IN",
          },
        }),
      },
    ],
  }),
  component: Home,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedRail />
      <CinematicShowcase />
      <WhyLuxoree />
      <BestSellers />
      <Lookbook />
      <FinalCTA />
    </>
  );
}

/* -----------------------------  HERO  ----------------------------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yBottle = useTransform(scrollY, [0, 800], [0, 220]);
  const scaleBottle = useTransform(scrollY, [0, 600], [1, 1.12]);
  const yText = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (reduce || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)",
          duration: 1.3, ease: "power4.out", stagger: 0.12, delay: 0.15,
        },
      );
      gsap.fromTo(
        ".hero-meta",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.9 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, [reduce]);

  const heroPerfume = perfumes.find((p) => p.slug === "midnight-oud") ?? perfumes[0];

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-background"
      aria-label="Luxorée — Live Luxuriously"
    >
      {/* Ambient background: gold glow + fine grain */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/3 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,76,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 bottom-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,76,0.12),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.8))]" />
      </div>

      {/* Vertical rules */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gold/20 md:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-gold/20 md:block" />

      {/* Rotating vertical caption */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 origin-left text-[10px] uppercase tracking-[0.5em] text-gold/70 md:block">
        Eau de Parfum · Est. 2024 · Made in India
      </div>

      <div className="relative mx-auto grid min-h-[92dvh] max-w-[1400px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-14 md:grid-cols-12 md:pb-24 md:pt-20 lg:px-16">
        {/* Left / Text column */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10 md:col-span-6 lg:col-span-6">
          <div className="mb-8 flex items-center gap-3 hero-meta">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-gold">
              The 2026 Collection
            </span>
          </div>

          <h1 className="font-display text-[13vw] leading-[0.92] tracking-[-0.01em] text-ivory sm:text-7xl md:text-[6.5rem] lg:text-[8rem]">
            <span className="block overflow-hidden">
              <span className="hero-line block">Wear the</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic text-gold">unforgettable.</span>
            </span>
          </h1>

          <p className="hero-meta mt-8 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
            Eight hand-blended fragrances, built on 25–30% parfum concentrate.
            The kind of scent that stays in a room for hours after you leave.
          </p>

          <div className="hero-meta mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-background transition-all hover:shadow-[0_20px_60px_-15px_rgba(201,162,76,0.5)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Shop the Collection</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop/$slug"
              params={{ slug: heroPerfume.slug }}
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.35em] text-ivory/80 transition-colors hover:text-gold"
            >
              Discover {heroPerfume.name}
              <span aria-hidden className="h-px w-8 bg-current transition-all group-hover:w-12" />
            </Link>
          </div>

          <dl className="hero-meta mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border/40 pt-8">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-gold">Longevity</dt>
              <dd className="mt-1 font-display text-xl text-ivory">10+ hrs</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-gold">Parfum</dt>
              <dd className="mt-1 font-display text-xl text-ivory">25–30%</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-gold">IFRA</dt>
              <dd className="mt-1 font-display text-xl text-ivory">Compliant</dd>
            </div>
          </dl>
        </motion.div>

        {/* Right / Bottle column */}
        <div className="relative z-10 md:col-span-6 lg:col-span-6">
          <motion.div
            style={{ y: yBottle, scale: scaleBottle }}
            className="relative mx-auto aspect-[3/4] w-full max-w-[520px]"
          >
            {/* Floating watermark word */}
            <div className="absolute -left-8 top-8 -rotate-90 origin-top-left font-display text-[9rem] leading-none tracking-tighter text-ivory/[0.04] md:text-[11rem]">
              LUXORÉE
            </div>

            {/* Glow disc behind bottle */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,76,0.35),transparent_70%)] blur-2xl" />
            </div>

            <motion.img
              src={heroPerfume.image}
              alt={`${heroPerfume.name} — signature bottle`}
              className="relative h-full w-full object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.7)]"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            />

            {/* Product label callout */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9 }}
              className="absolute bottom-6 right-0 hidden max-w-[220px] rounded-sm border border-gold/30 bg-background/70 p-4 backdrop-blur-md md:block"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Signature</p>
              <p className="mt-1 font-display text-2xl text-ivory">{heroPerfume.name}</p>
              <p className="mt-1 text-[11px] italic text-ivory/60">{heroPerfume.tagline}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/70">50ml</span>
                <span className="font-display text-lg text-gold">₹{heroPerfume.price}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ivory/40"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}

/* --------------------------- TRUST STRIP -------------------------- */

function TrustStrip() {
  const items = [
    { icon: Sparkles, t: "25–30% Parfum", s: "True Eau de Parfum concentration" },
    { icon: Flame, t: "8–10 Hour Wear", s: "Long-lasting on skin, all day" },
    { icon: Truck, t: "Free Over ₹999", s: "Ships across India in 3–5 days" },
    { icon: ShieldCheck, t: "Cash on Delivery", s: "Pay when it arrives" },
  ];
  return (
    <section className="border-y border-border/40 bg-elevated/30 py-6">
      <div className="container-luxe grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="flex items-start gap-3">
            <it.icon className="mt-0.5 h-5 w-5 text-gold" />
            <div>
              <div className="text-sm font-medium text-ivory">{it.t}</div>
              <div className="text-[11px] text-ivory/60">{it.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- FEATURED RAIL ------------------------- */

function FeaturedRail() {
  const list = featured();
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <Reveal>
          <div className="flex items-end justify-between border-b border-border/40 pb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Featured</p>
              <h2 className="mt-3 font-display text-4xl text-ivory md:text-6xl">
                Chosen by the house.
              </h2>
            </div>
            <Link to="/shop" className="hidden text-[11px] uppercase tracking-[0.3em] text-gold hover:text-gold-soft md:inline">
              View all fragrances →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {list.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- CINEMATIC SHOWCASE --------------------- */

function CinematicShowcase() {
  const showcase = perfumes.find((p) => p.slug === "black-vanilla") ?? perfumes[2];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-elevated/40 py-24 md:py-40">
      <div className="container-luxe grid items-center gap-14 md:grid-cols-2">
        <motion.div style={{ y }} className="relative order-2 md:order-1">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,76,0.28),transparent_70%)] blur-3xl" />
          </div>
          <img
            src={showcase.image}
            alt={showcase.name}
            className="mx-auto max-h-[70dvh] w-auto object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">In the Spotlight</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] text-ivory md:text-7xl">
              {showcase.name}<span className="text-gold">.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg italic text-ivory/70">{showcase.tagline}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
              {showcase.description}
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border/40 pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Family</p>
                <p className="mt-1 text-sm text-ivory">{showcase.family}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Longevity</p>
                <p className="mt-1 text-sm text-ivory">{showcase.longevity}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Projection</p>
                <p className="mt-1 text-sm text-ivory">{showcase.projection}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop/$slug"
                params={{ slug: showcase.slug }}
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft"
              >
                Discover {showcase.name} <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-1 text-sm text-ivory/70">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {showcase.rating} · {showcase.reviewCount} reviews
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- WHY LUXORÉE -------------------------- */

function WhyLuxoree() {
  const pillars = [
    { n: "01", t: "Hand-blended in small batches", d: "Every 500ml batch is composed and matured in our Jaipur atelier." },
    { n: "02", t: "Premium parfum concentration", d: "25–30% parfum oil — double the concentration of typical Eau de Toilette." },
    { n: "03", t: "IFRA-51 compliant", d: "Every note meets international skin-safe fragrance standards." },
    { n: "04", t: "Direct, honest pricing", d: "You pay for the juice — not celebrity ads or department-store rent." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Luxorée Standard</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory md:text-6xl">
              A different kind of luxury.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="border-t border-gold/40 pt-6">
                <div className="font-display text-4xl text-gold/60">{p.n}</div>
                <h3 className="mt-4 font-display text-2xl text-ivory">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- BEST SELLERS ------------------------- */

function BestSellers() {
  const list = bestSellers();
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="container-luxe">
        <Reveal>
          <div className="flex items-end justify-between border-b border-border/40 pb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Best Sellers</p>
              <h2 className="mt-3 font-display text-4xl text-ivory md:text-6xl">Loved most.</h2>
            </div>
            <Link to="/shop" className="hidden text-[11px] uppercase tracking-[0.3em] text-gold hover:text-gold-soft md:inline">
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {list.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL CTA ------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/40 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,76,0.16),transparent_60%)]" />
      <div className="container-luxe relative text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Live Luxuriously</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
            Find the one that <em className="text-gold italic">stays</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-ivory/70">
            Eight signatures. One will feel like it was made for you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-background hover:bg-gold-soft"
            >
              Shop all fragrances <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE.owner.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-ivory hover:border-gold hover:text-gold"
            >
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
