import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star, Clock, Wind, ShieldCheck, Truck, Package,
  Minus, Plus, ChevronRight, ShoppingBag, MessageCircle, Loader2, Check,
} from "lucide-react";
import { bySlug, perfumes, type Review } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { useCart, type CartSize } from "@/lib/cart";
import { submitReview } from "@/lib/api/reviews";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = bySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Fragrance — Luxorée" }, { name: "robots", content: "noindex" }] };
    const url = `${SITE.domain}/shop/${params.slug}`;
    return {
      meta: [
        { title: loaderData.seo.title },
        { name: "description", content: loaderData.seo.description },
        { property: "og:title", content: loaderData.seo.title },
        { property: "og:description", content: loaderData.seo.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: loaderData.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name,
            description: loaderData.shortDescription,
            brand: { "@type": "Brand", name: "Luxorée" },
            image: [loaderData.image],
            sku: loaderData.slug,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: loaderData.rating,
              reviewCount: loaderData.reviewCount,
            },
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: "INR",
              price: loaderData.price,
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
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
  const [size, setSize] = useState<CartSize>("50ml");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "notes" | "details" | "reviews">("description");
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const price = size === "50ml" ? p.price : p.trialPrice;
  const total = price * qty;

  const related = perfumes.filter((r) => r.slug !== p.slug).slice(0, 4);
  const dist = [
    { s: 5, pct: 76 }, { s: 4, pct: 16 }, { s: 3, pct: 5 }, { s: 2, pct: 2 }, { s: 1, pct: 1 },
  ];

  const onAdd = () => {
    add(p, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="container-luxe py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-gold">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gold">{p.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <div className="relative overflow-hidden rounded-sm border border-border/40 bg-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,76,0.22),transparent_65%)]" aria-hidden />
            <img
              src={p.image}
              alt={`${p.name} — ${p.tagline}`}
              className="relative h-full max-h-[75dvh] w-full object-contain"
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
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            For {p.gender === "unisex" ? "Everyone" : p.gender === "men" ? "Him" : "Her"}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-[1.05] text-ivory md:text-6xl">{p.name}</h1>
          <p className="mt-3 max-w-md text-base italic text-ivory/70">{p.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-sm text-ivory/80">{p.rating.toFixed(1)}</span>
            <button onClick={() => setTab("reviews")} className="text-xs text-ivory/50 underline-offset-4 hover:text-gold hover:underline">
              ({p.reviewCount} reviews)
            </button>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-gold">₹{price}</span>
            {size === "50ml" && <span className="text-lg text-ivory/40 line-through">₹{p.mrp}</span>}
            <span className="rounded-sm bg-gold/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {size === "50ml" ? `${Math.round((1 - p.price / p.mrp) * 100)}% off` : "Trial"}
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-ivory/75">{p.shortDescription}</p>

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
                    ₹{s === "50ml" ? p.price : p.trialPrice}{s === "20ml" && " • Trial"}
                  </div>
                </button>
              ))}
            </div>
          </div>

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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold-soft"
            >
              {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
            </button>
            <a
              href={`${SITE.owner.whatsappUrl}?text=${encodeURIComponent(`Hi Luxorée! I'd like to order ${p.name} (${size}) × ${qty}. Total: ₹${total}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ivory hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border/40 py-5 sm:grid-cols-4">
            {[
              { icon: Truck, t: "Free Shipping", s: "Over ₹999" },
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

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Spec icon={Clock} label="Longevity" value={p.longevity} />
            <Spec icon={Wind} label="Projection" value={p.projection} />
            <Spec icon={Star} label="Rating" value={`${p.rating} / 5`} />
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-border/40 pt-10">
        <div className="flex flex-wrap gap-2 border-b border-border/40">
          {([
            ["description", "Description"],
            ["notes", "Fragrance Notes"],
            ["details", "Performance & Details"],
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
            <div className="max-w-3xl text-base leading-relaxed text-ivory/80">
              <p>{p.description}</p>
              <ul className="mt-6 grid gap-2 text-sm text-ivory/70 md:grid-cols-2">
                <li>• Hand-blended in Jaipur, small batch</li>
                <li>• {p.family} — {p.mood.join(", ")}</li>
                <li>• Best for: {p.occasion.join(", ")}</li>
                <li>• Season: {p.season.join(", ")}</li>
              </ul>
            </div>
          )}
          {tab === "notes" && (
            <div className="grid gap-8 md:grid-cols-3">
              {(["top", "heart", "base"] as const).map((k) => (
                <div key={k}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                    {k === "top" ? "Top Notes" : k === "heart" ? "Heart Notes" : "Base Notes"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.notes[k].map((n: string) => (
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
                ["Mood", p.mood.join(", ")],
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
            <ReviewsBlock productSlug={p.slug} rating={p.rating} reviewCount={p.reviewCount} reviews={p.reviews} dist={dist} />
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold">You May Also Like</p>
                <h2 className="mt-2 font-display text-3xl text-ivory md:text-4xl">More from the collection</h2>
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

/* -------------------------- Reviews block -------------------------- */

function ReviewsBlock({
  productSlug, rating, reviewCount, reviews, dist,
}: {
  productSlug: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  dist: { s: number; pct: number }[];
}) {
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <div>
        <div className="font-display text-6xl text-gold">{rating.toFixed(1)}</div>
        <div className="mt-1 flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
        </div>
        <p className="mt-1 text-sm text-ivory/60">{reviewCount} verified reviews</p>
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
      <div className="space-y-6">
        <ReviewForm productSlug={productSlug} onSubmitted={(r) => setLocalReviews((rs) => [r, ...rs])} />
        <div className="space-y-4">
          {localReviews.map((rv) => (
            <div key={rv.id} className="rounded-sm border border-border/50 bg-surface/50 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-ivory">{rv.name}</div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: rv.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {rv.verified ? "Verified Purchase • " : ""}{rv.date}
              </div>
              <p className="mt-3 text-sm text-ivory/80">{rv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewForm({
  productSlug,
  onSubmitted,
}: {
  productSlug: string;
  onSubmitted: (r: Review) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (name.trim().length < 2) return setErr("Please enter your name.");
    if (text.trim().length < 10) return setErr("Please write at least 10 characters.");
    setBusy(true);
    try {
      const created = await submitReview({
        productSlug,
        name: name.trim().slice(0, 60),
        email: email.trim().slice(0, 120) || undefined,
        rating,
        text: text.trim().slice(0, 1000),
      });
      onSubmitted({
        id: created.id,
        name: created.name,
        rating: created.rating,
        text: created.text,
        date: "just now",
        verified: false,
      });
      setName(""); setEmail(""); setText(""); setRating(5); setOk(true);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-sm border border-border/50 bg-surface/40 p-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Write a review</p>
      <p className="mt-1 text-xs text-ivory/60">Share your experience with this fragrance.</p>

      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="p-1"
          >
            <Star className={`h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-ivory/30"}`} />
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name" maxLength={60} required
          className="rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        />
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional, not public)" maxLength={120}
          className="rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        />
      </div>
      <textarea
        value={text} onChange={(e) => setText(e.target.value)}
        placeholder="How does it wear? How long did it last? Where do you wear it?"
        maxLength={1000} rows={4} required
        className="mt-3 w-full rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
      />
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
      {ok && <p className="mt-2 text-xs text-gold">Thank you — your review is pending moderation.</p>}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/40">Reviews are moderated before publishing.</p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit review
        </button>
      </div>
    </form>
  );
}
