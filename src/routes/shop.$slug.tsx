import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star, Heart, MessageCircle, Clock, Wind, ShieldCheck, Truck, Package,
  Minus, Plus, ChevronRight,
} from "lucide-react";
import { bySlug, byGender, perfumes } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = bySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Luxoree Perfume` },
          { name: "description", content: `${loaderData.name}: ${loaderData.tagline} ${loaderData.description.slice(0, 100)}…` },
          { property: "og:title", content: `${loaderData.name} — Luxoree Perfume` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:image", content: loaderData.image },
          { name: "twitter:image", content: loaderData.image },
        ]
      : [{ title: "Fragrance — Luxoree" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: ProductNotFound,
  errorComponent: ({ error, reset }) => (
    <div className="container-luxe py-24 text-center">
      <p className="font-display text-3xl text-ivory">We couldn't load this fragrance.</p>
      <button onClick={reset} className="mt-6 rounded-sm bg-gold px-6 py-3 text-xs uppercase tracking-[0.25em] text-background">Try again</button>
      <p className="mt-4 text-xs text-ivory/40">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="container-luxe py-24 text-center">
      <p className="font-display text-3xl text-ivory">Fragrance not found</p>
      <Link to="/shop" className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 text-xs uppercase tracking-[0.25em] text-background">Back to shop</Link>
    </div>
  );
}

function ProductPage() {
  const p = Route.useLoaderData();
  const [size, setSize] = useState<"20ml" | "50ml">("50ml");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "notes" | "details" | "reviews">("description");

  const price = size === "50ml" ? p.price : p.trialPrice;
  const total = price * qty;

  const waText = `Hi Luxoree! I'd like to order:%0A• ${p.name} (${size}) × ${qty}%0ATotal: ₹${total}`;
  const waHref = `https://wa.me/919876543210?text=${waText}`;

  const related = byGender(p.gender).filter((r) => r.slug !== p.slug).slice(0, 4);
  const totalReviews = p.reviewCount;
  const dist = [
    { s: 5, pct: 76 }, { s: 4, pct: 16 }, { s: 3, pct: 5 }, { s: 2, pct: 2 }, { s: 1, pct: 1 },
  ];

  return (
    <div className="container-luxe py-10 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-gold">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gold">{p.name}</span>
      </nav>

      {/* Main */}
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <div className="relative overflow-hidden rounded-sm border border-border/40 bg-black">
            <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-30" aria-hidden />
            <img
              src={p.image}
              alt={`${p.name} — ${p.tagline}`}
              className="relative h-full max-h-[75dvh] w-full object-contain"
              width={900} height={1200}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className="aspect-square overflow-hidden rounded-sm border border-border/40 bg-black transition-colors hover:border-gold"
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover"
                  style={{ objectPosition: ["center", "top", "bottom", "left"][i] }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">For {p.gender === "unisex" ? "Everyone" : p.gender === "men" ? "Men" : "Women"}</p>
          <h1 className="mt-2 font-display text-5xl leading-[1.05] text-ivory md:text-6xl">{p.name}</h1>
          <p className="mt-3 max-w-md text-base italic text-ivory/70">{p.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-sm text-ivory/80">{p.rating.toFixed(1)}</span>
            <span className="text-xs text-ivory/50">({p.reviewCount} reviews)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-gold">₹{price}</span>
            {size === "50ml" && <span className="text-lg text-ivory/40 line-through">₹{p.mrp}</span>}
            <span className="rounded-sm bg-gold/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {size === "50ml" ? `${Math.round((1 - p.price / p.mrp) * 100)}% off` : "Trial"}
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-ivory/75">{p.description}</p>

          {/* Size */}
          <div className="mt-8">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/60">Size</p>
            <div className="flex gap-3">
              {(["20ml", "50ml"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 rounded-sm border px-4 py-3 text-left transition-all ${
                    size === s ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                  }`}
                >
                  <div className="font-display text-xl text-ivory">{s}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">
                    ₹{s === "50ml" ? p.price : p.trialPrice}
                    {s === "20ml" && " • Trial"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-end gap-6">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/60">Quantity</p>
              <div className="inline-flex items-center rounded-sm border border-border">
                <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-ivory/70 hover:text-gold">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="p-3 text-ivory/70 hover:text-gold">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">Total</p>
              <p className="font-display text-3xl text-gold">₹{total}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank" rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
            <button className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ivory hover:border-gold hover:text-gold">
              <Heart className="h-4 w-4" /> Wishlist
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border/40 py-5 sm:grid-cols-4">
            {[
              { icon: Truck, t: "Free Delivery", s: "Within 3KM" },
              { icon: ShieldCheck, t: "Cash on Delivery", s: "Available" },
              { icon: Package, t: "Secure Packaging", s: "Premium boxed" },
              { icon: MessageCircle, t: "WhatsApp", s: "Support" },
            ].map((it) => (
              <div key={it.t} className="flex items-start gap-2">
                <it.icon className="mt-0.5 h-4 w-4 text-gold" />
                <div>
                  <div className="text-xs text-ivory">{it.t}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">{it.s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick specs */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Spec icon={Clock} label="Longevity" value={p.longevity} />
            <Spec icon={Wind} label="Projection" value={p.projection} />
            <Spec icon={Star} label="Rating" value={`${p.rating} / 5`} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20 border-t border-border/40 pt-10">
        <div className="flex flex-wrap gap-2 border-b border-border/40">
          {([
            ["description", "Description"],
            ["notes", "Fragrance Notes"],
            ["details", "Details"],
            ["reviews", `Reviews (${p.reviewCount})`],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`relative px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                tab === k ? "text-gold" : "text-ivory/60 hover:text-ivory"
              }`}
            >
              {l}
              {tab === k && <span className="absolute inset-x-0 bottom-0 h-px bg-gold" />}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[240px]">
          {tab === "description" && (
            <div className="max-w-2xl text-base leading-relaxed text-ivory/80">
              <p>{p.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-ivory/70">
                <li>• Handcrafted in India, small batch</li>
                <li>• Premium fragrance oils, IFRA compliant</li>
                <li>• Perfect for {p.occasion.join(", ").toLowerCase()}</li>
              </ul>
            </div>
          )}
          {tab === "notes" && (
            <div className="grid gap-8 md:grid-cols-3">
              {(["top", "heart", "base"] as const).map((k) => (
                <div key={k}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{k === "top" ? "Top Notes" : k === "heart" ? "Heart Notes" : "Base Notes"}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.notes[k].map((n) => (
                      <span key={n} className="rounded-sm border border-border/50 bg-surface/50 px-3 py-1.5 text-sm text-ivory/80">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "details" && (
            <dl className="grid gap-4 text-sm md:grid-cols-2">
              {[
                ["Fragrance Family", p.family],
                ["Longevity", p.longevity],
                ["Projection", p.projection],
                ["Best Season", p.season.join(", ")],
                ["Occasion", p.occasion.join(", ")],
                ["Ingredients", p.ingredients],
                ["Directions", p.directions],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-border/40 py-3">
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-gold">{k}</dt>
                  <dd className="mt-1 text-ivory/80">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "reviews" && (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="font-display text-6xl text-gold">{p.rating.toFixed(1)}</div>
                <div className="mt-1 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-1 text-sm text-ivory/60">{totalReviews} verified reviews</p>
                <div className="mt-6 space-y-2">
                  {dist.map((d) => (
                    <div key={d.s} className="flex items-center gap-2 text-xs text-ivory/60">
                      <span className="w-4">{d.s}★</span>
                      <div className="h-1.5 flex-1 rounded-full bg-elevated">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${d.pct}%` }} />
                      </div>
                      <span className="w-8 text-right">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { n: "Aarav M.", d: "3 days ago", t: "Amazing fragrance! Lasts so long and smells premium.", r: 5 },
                  { n: "Rohit B.", d: "5 days ago", t: "Perfect for evening wear. Got so many compliments!", r: 5 },
                  { n: "Karan S.", d: "1 week ago", t: "Great scent at this price. Totally worth it.", r: 4 },
                ].map((rv) => (
                  <div key={rv.n} className="rounded-sm border border-border/50 bg-surface/50 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-ivory">{rv.n}</div>
                      <div className="flex gap-0.5 text-gold">
                        {Array.from({ length: rv.r }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80">Verified Purchase • {rv.d}</div>
                    <p className="mt-3 text-sm text-ivory/80">{rv.t}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold">You May Also Like</p>
                <h2 className="mt-2 font-display text-3xl text-ivory md:text-4xl">More from this collection</h2>
              </div>
              <Link to="/shop" className="hidden text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft md:inline">
                View all
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {related.map((r, i) => <ProductCard key={r.slug} p={r} index={i} />)}
          </div>
        </section>
      )}

      {/* Explicitly reference perfumes for tree-shake safety in dev */}
      <span className="sr-only">{perfumes.length} fragrances available</span>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border/40 bg-surface/40 p-3">
      <Icon className="h-4 w-4 text-gold" />
      <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ivory/50">{label}</div>
      <div className="text-sm text-ivory">{value}</div>
    </div>
  );
}
