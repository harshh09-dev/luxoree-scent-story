import { createFileRoute, Link } from "@tanstack/react-router";
import heroBottle from "@/assets/perfumes/hero-bottle.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Leaf, Droplets, Heart, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luxoree — Handcrafted Perfumes, Made in India" },
      { name: "description", content: "Luxoree makes luxury-inspired handcrafted perfumes at everyday prices. Premium oils, small-batch production, made in India." },
      { property: "og:title", content: "About Luxoree" },
      { property: "og:description", content: "Handcrafted luxury perfumes at everyday prices, made in India." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-40" aria-hidden />
        <div className="container-luxe relative grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Our Story</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
              Luxury,<br /><span className="gold-gradient-text italic">rewritten.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
              Luxoree was born from a simple frustration: why should extraordinary fragrance
              cost extraordinary money? We source the same premium oils used by legacy
              houses, hand-blend them in small batches, and cut out everything you don't need
              — the marble counters, the marketing airtime, the middlemen.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/75">
              What's left is the fragrance itself. Fifteen of them. All at ₹349 for 50ml.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-10 bg-radial-gold blur-3xl" aria-hidden />
              <img src={heroBottle} alt="Luxoree signature bottle" className="relative mx-auto max-h-[70dvh] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe pb-24 md:pb-32">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 md:grid-cols-4">
          {[
            { icon: Leaf, t: "Small Batch", s: "Every bottle hand-poured" },
            { icon: Droplets, t: "Premium Oils", s: "IFRA-compliant blends" },
            { icon: Heart, t: "Made in India", s: "Proudly local" },
            { icon: ShieldCheck, t: "Skin Safe", s: "Dermatologically tested" },
          ].map((it) => (
            <div key={it.t} className="flex flex-col items-start gap-3 bg-background p-8">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-xl text-ivory">{it.t}</div>
              <div className="text-sm text-ivory/60">{it.s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe pb-32">
        <Reveal>
          <div className="rounded-sm border border-gold/30 bg-gradient-to-br from-elevated to-surface p-10 text-center md:p-16">
            <h2 className="font-display text-3xl text-ivory md:text-5xl">Live <span className="gold-gradient-text italic">luxuriously.</span></h2>
            <p className="mx-auto mt-4 max-w-md text-base text-ivory/70">Every day is worth wearing a fragrance you love.</p>
            <Link to="/shop" className="mt-8 inline-block rounded-sm bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft">
              Explore the Collection
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
