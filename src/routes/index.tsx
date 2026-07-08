import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles, Clock, Droplets, Truck, ShieldCheck, Leaf,
  Flame, ArrowRight, MessageCircle, Star, Instagram, ChevronRight,
} from "lucide-react";

import heroBottle from "@/assets/perfumes/hero-bottle.jpg";
import collectionMen from "@/assets/perfumes/collection-men.jpg";
import collectionWomen from "@/assets/perfumes/collection-women.jpg";
import collectionUnisex from "@/assets/perfumes/collection-unisex.jpg";
import midnightOud from "@/assets/perfumes/midnight-oud.jpg";
import velvetRose from "@/assets/perfumes/velvet-rose.jpg";
import oceanBreeze from "@/assets/perfumes/ocean-breeze.jpg";
import goldenDune from "@/assets/perfumes/golden-dune.jpg";
import smokeVanilla from "@/assets/perfumes/smoke-vanilla.jpg";
import bloomEssence from "@/assets/perfumes/bloom-essence.jpg";

import { bestSellers, newArrivals } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxoree — Luxury Fragrances. Everyday Prices." },
      { name: "description", content: "15 handcrafted premium perfumes at ₹349 for 50ml. Long lasting 6–10 hours. Free delivery within 3km. Cash on delivery." },
      { property: "og:title", content: "Luxoree — Luxury Fragrances. Everyday Prices." },
      { property: "og:description", content: "Handcrafted premium perfumes at ₹349 for 50ml. Live luxuriously." },
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
      <ShopByCollection />
      <TodaysOffer />
      <BestSellersScroller />
      <CinematicShowcase />
      <WhyLuxoree />
      <QuizTeaser />
      <NewArrivals />
      <ReviewsSection />
      <InstagramGallery />
      <Newsletter />
      <FinalCTA />
    </>
  );
}

/* -------- HERO -------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 800], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  useEffect(() => {
    if (reduce || !heroRef.current) return;
    const ctx = gsap.context(() => {
      const chars = heroRef.current!.querySelectorAll<HTMLSpanElement>(".split-char");
      gsap.set(chars, { y: 60, opacity: 0 });
      gsap.to(chars, {
        y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        stagger: 0.025, delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduce]);

  const title = ["Luxury", "Fragrances."];
  const title2 = ["Everyday", "Prices."];

  return (
    <section ref={heroRef} className="relative flex min-h-[92dvh] items-center overflow-hidden pb-16 pt-4 md:pb-24">
      {/* radial gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-70" aria-hidden />
      {/* particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              // @ts-expect-error CSS vars
              "--dx": `${(Math.random() - 0.5) * 200}px`,
              "--dy": `${-100 - Math.random() * 200}px`,
              "--dur": `${8 + Math.random() * 10}s`,
              "--delay": `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="container-luxe relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-6">
        <div className="relative z-10 max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-gold"
          >
            <span className="h-px w-8 bg-gold" /> Luxoree Perfumes
          </motion.p>

          <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight text-ivory md:text-[6.5vw] lg:text-[5.5rem]">
            {title.map((word, wi) => (
              <span key={wi} className="mr-4 inline-block">
                {word.split("").map((c, i) => (
                  <span key={i} className="split-char inline-block will-change-transform">{c}</span>
                ))}
              </span>
            ))}
            <br />
            <span className="gold-gradient-text italic">
              {title2.map((word, wi) => (
                <span key={wi} className="mr-4 inline-block">
                  {word.split("").map((c, i) => (
                    <span key={i} className="split-char inline-block will-change-transform">{c}</span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9 }}
            className="mt-8 max-w-md text-base leading-relaxed text-ivory/70"
          >
            Handcrafted perfumes inspired by luxury houses — made for everyday confidence.
            Starting at just <span className="text-gold">₹349</span> for 50ml.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-gold-soft"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:border-gold hover:bg-gold/5"
            >
              Take Fragrance Quiz
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-border/40 pt-8"
          >
            {[
              { k: "15+", v: "Fragrances" },
              { k: "6–10 Hrs", v: "Long Lasting" },
              { k: "1,250+", v: "5-Star Reviews" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl text-gold">{s.k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/50">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ y: reduce ? 0 : parallax, opacity: reduce ? 1 : heroOpacity }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="relative float-bottle">
            <div className="absolute -inset-12 bg-radial-gold blur-3xl" aria-hidden />
            <img
              src={heroBottle}
              alt="Luxoree signature perfume bottle in matte black with polished gold cap"
              className="relative z-10 mx-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
              width={1200}
              height={1600}
            />
          </div>
          <motion.div
            initial={reduce ? false : { scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute -right-2 top-6 z-20 grid h-24 w-24 place-items-center rounded-full border border-gold/60 bg-background/70 text-center backdrop-blur md:h-28 md:w-28"
          >
            <div>
              <div className="font-display text-2xl text-gold">15+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-ivory/70">Premium<br />Fragrances</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------- TRUST STRIP -------- */

function TrustStrip() {
  const items = [
    { icon: Leaf, title: "Handcrafted", sub: "in India" },
    { icon: Clock, title: "6–10 Hours", sub: "Long Lasting" },
    { icon: Droplets, title: "Premium Oils", sub: "IFRA Compliant" },
    { icon: Truck, title: "Free Delivery", sub: "Within 3KM" },
    { icon: ShieldCheck, title: "Cash on", sub: "Delivery" },
  ];
  return (
    <section className="border-y border-border/40 bg-black/30">
      <div className="container-luxe grid grid-cols-2 gap-y-6 py-8 md:grid-cols-5 md:gap-6 md:py-10">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-gold/40">
              <it.icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <div className="text-sm font-medium text-ivory">{it.title}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------- SHOP BY COLLECTION -------- */

function ShopByCollection() {
  const collections = [
    { title: "Men's", count: 5, img: collectionMen, gender: "men" },
    { title: "Women's", count: 5, img: collectionWomen, gender: "women" },
    { title: "Unisex", count: 5, img: collectionUnisex, gender: "unisex" },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <Reveal>
        <SectionHeading eyebrow="Our Collection" title="Shop by Collection" subtitle="Crafted for every mood and every moment." />
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <Link
              to="/shop"
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-border/40 bg-black"
            >
              <img
                src={c.img}
                alt={`${c.title} collection cover`}
                className="h-full w-full object-cover opacity-70 transition-all duration-[1400ms] ease-out group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{c.count} Fragrances</p>
                <h3 className="mt-2 font-display text-4xl text-ivory md:text-5xl">{c.title}</h3>
                <p className="mt-2 text-sm text-ivory/70">Collection</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- TODAY'S OFFER -------- */

function TodaysOffer() {
  const waHref =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent("Hi Luxoree! I want to order the 50ml perfume at ₹349 today.");
  return (
    <section className="container-luxe pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-br from-elevated via-surface to-black p-6 md:p-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-radial-gold blur-3xl" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                <Flame className="h-4 w-4" /> Today's Special Offer
              </div>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
                Limited stock. <span className="gold-gradient-text italic">Today only.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-ivory/70">
                Try our signature 20ml trial bottle at just ₹99, or take home the full 50ml at ₹349.
                Free delivery within 3KM. Cash on delivery available.
              </p>
              <a
                href={waHref}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <OfferCard label="Trial" size="20ml" price="99" old={null} tag="Entry Offer" />
              <OfferCard label="Full" size="50ml" price="349" old="499" tag="Today Only" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function OfferCard({ label, size, price, old, tag }: { label: string; size: string; price: string; old: string | null; tag: string }) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-border bg-background/60 p-5 backdrop-blur">
      <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">{label} Bottle</p>
      <p className="mt-1 font-display text-2xl text-ivory">{size}</p>
      <div className="mt-4 flex items-baseline gap-2">
        {old && <span className="text-sm text-ivory/40 line-through">₹{old}</span>}
        <span className="font-display text-4xl text-gold">₹{price}</span>
      </div>
      <span className="mt-4 inline-block rounded-sm border border-gold/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
        {tag}
      </span>
    </div>
  );
}

/* -------- BEST SELLERS -------- */

function BestSellersScroller() {
  const items = bestSellers();
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".bs-card", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="container-luxe pb-24 md:pb-32">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Best Sellers" title="Loved by thousands" />
        <Link to="/shop" className="hidden shrink-0 items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft md:inline-flex">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {items.map((p, i) => (
          <div key={p.slug} className="bs-card">
            <ProductCard p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------- CINEMATIC SHOWCASE (GSAP pin) -------- */

function CinematicShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=1400",
          scrub: 1,
          pin: true,
        },
      });
      tl.from(".show-bottle", { scale: 0.85, opacity: 0.5, duration: 1 }, 0);
      tl.from(".show-word", { opacity: 0, y: 40, stagger: 0.15, duration: 0.6 }, 0.2);
      tl.to(".show-bottle", { scale: 1.05, duration: 1 }, 0.6);
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  const words = ["Oud", "Saffron", "Amber", "Musk", "Patchouli", "Sandalwood"];

  return (
    <section ref={wrap} className="relative min-h-[80dvh] overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-40" aria-hidden />
      <div className="container-luxe relative grid min-h-[80dvh] grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold">Signature Fragrance</p>
          <h2 className="font-display text-5xl leading-[1.02] text-ivory md:text-7xl">
            Midnight <span className="gold-gradient-text italic">Oud</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            A commanding blend of rich oud and warm spices, wrapped in dark amber.
            Built to linger. Made to be remembered.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {words.map((w) => (
              <span key={w} className="show-word font-display text-2xl text-ivory/80 md:text-3xl">
                {w}
              </span>
            ))}
          </div>
          <Link
            to="/shop/$slug"
            params={{ slug: "midnight-oud" }}
            className="mt-10 inline-flex items-center gap-2 rounded-sm border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            Discover Midnight Oud <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={midnightOud}
            alt="Midnight Oud perfume bottle in matte black glass with gold accents"
            className="show-bottle mx-auto max-h-[70dvh] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* -------- WHY LUXOREE -------- */

function WhyLuxoree() {
  const items = [
    { icon: Droplets, title: "Premium Oils", sub: "Luxury inspired blends" },
    { icon: Clock, title: "Long Lasting", sub: "6–10 hour projection" },
    { icon: Leaf, title: "Handcrafted", sub: "Small-batch made" },
    { icon: Sparkles, title: "Affordable Luxury", sub: "Premium at ₹349" },
    { icon: ShieldCheck, title: "IFRA Compliant", sub: "Skin-safe formulas" },
    { icon: Truck, title: "Free Delivery", sub: "Within 3KM • COD" },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <Reveal>
        <SectionHeading eyebrow="Why Luxoree" title="Luxury without the markup" subtitle="Everything the big houses charge for — none of the compromises." align="center" />
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.05}>
            <div className="group flex h-full flex-col items-start gap-4 bg-background p-8 transition-colors hover:bg-surface">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-all group-hover:border-gold group-hover:bg-gold/10">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl text-ivory">{it.title}</h3>
                <p className="mt-1 text-sm text-ivory/60">{it.sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- QUIZ TEASER -------- */

function QuizTeaser() {
  return (
    <section className="container-luxe pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-sm border border-border/40 bg-gradient-to-br from-surface via-black to-surface p-8 md:p-16">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-radial-gold opacity-70 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-radial-gold opacity-50 blur-3xl" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Fragrance Finder</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-6xl">
                Find your <span className="gold-gradient-text italic">signature scent.</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-ivory/70">
                Answer 5 quick questions and get a personalised match from our collection —
                in less than a minute.
              </p>
              <Link
                to="/quiz"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
              >
                Take the Quiz <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[bloomEssence, midnightOud, oceanBreeze].map((src, i) => (
                <div key={i} className="aspect-[3/4] overflow-hidden rounded-sm border border-border/40">
                  <img src={src} alt="" className="h-full w-full object-cover opacity-80" loading="lazy" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- NEW ARRIVALS -------- */

function NewArrivals() {
  const items = newArrivals();
  return (
    <section className="container-luxe pb-24 md:pb-32">
      <Reveal>
        <SectionHeading eyebrow="Just In" title="New Arrivals" />
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {items.map((p, i) => (
          <ProductCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* -------- REVIEWS -------- */

function ReviewsSection() {
  const reviews = [
    { name: "Aarav M.", text: "Smells way more premium than the price. Lasts all day and I get compliments constantly.", rating: 5 },
    { name: "Priya S.", text: "Amazing fragrances and fast delivery. Bloom Essence is now my everyday signature.", rating: 5 },
    { name: "Rohit B.", text: "Got so many compliments when I wore Midnight Oud. Absolutely worth every rupee.", rating: 5 },
  ];
  return (
    <section className="border-y border-border/40 bg-black/30 py-24 md:py-32">
      <div className="container-luxe">
        <div className="grid gap-14 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Customer Love</p>
              <h2 className="mt-4 font-display text-5xl text-ivory md:text-6xl">
                <span className="gold-gradient-text">4.8</span>
                <span className="text-ivory/60"> / 5</span>
              </h2>
              <div className="mt-2 flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm text-ivory/60">Based on 1,250+ verified reviews</p>
              <p className="mt-6 max-w-xs text-base text-ivory/75">
                From first-time buyers to daily-wearers — Luxoree wearers agree.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-sm border border-border/50 bg-surface/50 p-6">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/80">"{r.text}"</p>
                  <div className="mt-6 border-t border-border/40 pt-4">
                    <div className="text-sm font-medium text-ivory">{r.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80">Verified Purchase</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- INSTAGRAM -------- */

function InstagramGallery() {
  const grid = [velvetRose, midnightOud, oceanBreeze, goldenDune, smokeVanilla, bloomEssence];
  return (
    <section className="container-luxe py-24 md:py-32">
      <Reveal>
        <div className="flex items-center justify-between">
          <SectionHeading eyebrow="Follow" title="@luxoree.perfumes" />
          <a href="#" className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft md:inline-flex">
            <Instagram className="h-4 w-4" /> Follow us
          </a>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {grid.map((src, i) => (
          <a
            key={i}
            href="#"
            className="group relative block aspect-square overflow-hidden rounded-sm border border-border/40 bg-black"
            aria-label="Instagram post"
          >
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Instagram className="h-6 w-6 text-gold" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* -------- NEWSLETTER -------- */

function Newsletter() {
  return (
    <section className="container-luxe pb-24 md:pb-32">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-sm border border-border/50 bg-surface/40 p-8 text-center backdrop-blur md:p-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Stay in the Loop</p>
          <h2 className="mt-4 font-display text-3xl text-ivory md:text-5xl">Get exclusive offers, new launches &amp; more.</h2>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 rounded-sm border border-border bg-background/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[11px] text-ivory/40">No spam. Only fragrance news.</p>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- FINAL CTA -------- */

function FinalCTA() {
  return (
    <section className="container-luxe pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-r from-black via-elevated to-black p-10 text-center md:p-20">
          <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl text-ivory md:text-6xl">
              Ready to find your <span className="gold-gradient-text italic">signature scent?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-ivory/75">
              15 handcrafted fragrances. Starting at ₹349. Free delivery within 3km.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
            >
              Shop the Collection <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- shared -------- */

function SectionHeading({
  eyebrow, title, subtitle, align = "left",
}: { eyebrow: string; title: string; subtitle?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-[11px] uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-ivory md:text-6xl">{title}</h2>
      {subtitle && (
        <p className={`mt-4 max-w-xl text-base text-ivory/65 ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
