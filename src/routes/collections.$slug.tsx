import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Gift, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { perfumes, type Perfume } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/lib/cart";
import { collections, findCollection } from "./collections";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = findCollection(params.slug);
    if (!c) throw notFound();
    return { collectionSlug: c.slug, title: c.title, tag: c.tag, copy: c.copy };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Collection"} — Luxorée` },
      { name: "description", content: loaderData?.copy ?? "A Luxorée collection." },
      { property: "og:title", content: `${loaderData?.title ?? "Collection"} — Luxorée` },
      { property: "og:description", content: loaderData?.copy ?? "" },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: () => <NotFound />,
  component: CollectionDetail,
});

function NotFound() {
  return (
    <div className="container-luxe py-24 text-center">
      <h1 className="font-display text-4xl text-ivory">Collection not found</h1>
      <Link to="/collections" className="mt-6 inline-block text-gold underline">Back to collections</Link>
    </div>
  );
}

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

function CollectionDetail() {
  const { collectionSlug } = Route.useLoaderData();
  const c = collections.find((x) => x.slug === collectionSlug)!;

  const base = c.kind === "discovery" || c.kind === "gift" ? perfumes : perfumes.filter(c.filter);

  const [gender, setGender] = useState<"all" | "men" | "women" | "unisex">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const list = useMemo(() => {
    let l = base.filter((p) => gender === "all" || p.gender === gender);
    switch (sort) {
      case "price-asc": l = [...l].sort((a, b) => a.price - b.price); break;
      case "price-desc": l = [...l].sort((a, b) => b.price - a.price); break;
      case "rating": l = [...l].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return l;
  }, [base, gender, sort]);

  const others = collections.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <div className="pb-24">
      {/* Editorial hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-black/60 via-background to-background">
        <div className="container-luxe py-16 md:py-24">
          <Reveal>
            <Link to="/collections" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60 hover:text-gold">
              <ArrowLeft className="h-3 w-3" /> All Collections
            </Link>
            <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-gold">{c.tag}</p>
            <h1 className="mt-2 font-display text-5xl text-ivory md:text-7xl">{c.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-ivory/70 md:text-lg">{c.copy}</p>
          </Reveal>

          {/* Campaign banner */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {base.slice(0, 3).map((p, i) => (
              <div key={p.slug} className={`relative overflow-hidden rounded-sm border border-border/40 bg-black ${i === 1 ? "md:translate-y-6" : ""}`}>
                <img src={p.image} alt="" className="h-56 w-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{p.family}</p>
                  <p className="font-display text-xl text-ivory">{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection story */}
      <section className="container-luxe grid gap-8 py-16 md:grid-cols-[1fr_1fr] md:py-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The story</p>
          <h2 className="mt-2 font-display text-3xl text-ivory md:text-4xl">{c.heroCaption}</h2>
        </div>
        <p className="text-base leading-relaxed text-ivory/70">{c.story}</p>
      </section>

      {/* Builder for discovery / gift */}
      {c.kind === "discovery" && <DiscoveryBuilder />}
      {c.kind === "gift" && <GiftBuilder />}

      {/* Curated grid + filters (skip for pure builder feel? keep — customer may want to browse) */}
      <section className="container-luxe">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border/40 py-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "men", "women", "unisex"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                  gender === g ? "border-gold bg-gold/15 text-gold" : "border-border text-ivory/60 hover:border-gold/60 hover:text-ivory"
                }`}
              >
                {g === "all" ? "All" : g === "men" ? "For Him" : g === "women" ? "For Her" : "Unisex"}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ivory/60">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-sm border border-border bg-background/60 px-3 py-1.5 text-ivory focus:border-gold focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </label>
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-ivory/60">No fragrances match these filters.</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {list.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Cross-collection recommendations */}
      <section className="container-luxe mt-24">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">You may also love</p>
        <h2 className="mt-2 font-display text-3xl text-ivory md:text-4xl">Other collections</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/collections/$slug"
              params={{ slug: o.slug }}
              className="group rounded-sm border border-border/40 bg-surface/60 p-5 transition-all hover:border-gold/60"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{o.tag}</p>
              <p className="mt-1 font-display text-2xl text-ivory group-hover:text-gold">{o.title}</p>
              <p className="mt-2 text-sm text-ivory/60">{o.copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------- Discovery Set Builder -------------------- */

const DISCOVERY_UNIT_PRICE = 99;
const DISCOVERY_SET_PRICE = 249; // 3 × 20ml, curated saving
const DISCOVERY_SIZE = 3;

function DiscoveryBuilder() {
  const [scope, setScope] = useState<"men" | "women" | "unisex" | "any">("any");
  const [selected, setSelected] = useState<string[]>([]);
  const addBundle = useCart((s) => s.addBundle);

  const pool = perfumes.filter((p) => scope === "any" || p.gender === scope);
  const chosen = selected.map((slug) => perfumes.find((p) => p.slug === slug)!).filter(Boolean);
  const isComplete = chosen.length === DISCOVERY_SIZE;
  const total = isComplete ? DISCOVERY_SET_PRICE : chosen.length * DISCOVERY_UNIT_PRICE;

  const toggle = (slug: string) => {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= DISCOVERY_SIZE) return s;
      return [...s, slug];
    });
  };

  const addToCart = (perfume?: Perfume) => {
    if (perfume) {
      // pre-curated set of top 3 by rating within scope
      const preset = [...pool].sort((a, b) => b.rating - a.rating).slice(0, DISCOVERY_SIZE);
      addBundle({
        slug: `discovery-preset-${scope}-${Date.now()}`,
        name: `Discovery Trio — ${labelForScope(scope)}`,
        image: preset[0].image,
        unitPrice: DISCOVERY_SET_PRICE,
        bundleOf: preset.map((p) => ({ slug: p.slug, name: p.name, size: "20ml" as const })),
      });
      toast.success("Curated Discovery Trio added");
      return;
    }
    if (!isComplete) {
      toast.error(`Choose ${DISCOVERY_SIZE - chosen.length} more`);
      return;
    }
    addBundle({
      slug: `discovery-custom-${Date.now()}`,
      name: `Build-Your-Own Discovery Trio`,
      image: chosen[0].image,
      unitPrice: DISCOVERY_SET_PRICE,
      bundleOf: chosen.map((p) => ({ slug: p.slug, name: p.name, size: "20ml" as const })),
    });
    toast.success("Custom Discovery Trio added");
    setSelected([]);
  };

  return (
    <section className="container-luxe">
      <div className="rounded-sm border border-gold/40 bg-gradient-to-br from-black to-surface/60 p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Build your own discovery
            </p>
            <h3 className="mt-2 font-display text-3xl text-ivory md:text-4xl">Three 20ml. One set. ₹{DISCOVERY_SET_PRICE}.</h3>
            <p className="mt-2 max-w-xl text-sm text-ivory/60">
              Save ₹{DISCOVERY_UNIT_PRICE * DISCOVERY_SIZE - DISCOVERY_SET_PRICE} versus individual trials. Pick any three, or add our curated trio.
            </p>
          </div>
          <button
            onClick={() => addToCart(pool[0])}
            className="rounded-sm border border-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            Add curated trio
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["any", "men", "women", "unisex"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setScope(s); setSelected([]); }}
              className={`rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                scope === s ? "border-gold bg-gold/15 text-gold" : "border-border text-ivory/60 hover:border-gold/60 hover:text-ivory"
              }`}
            >
              {labelForScope(s)}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {pool.map((p) => {
            const on = selected.includes(p.slug);
            const disabled = !on && selected.length >= DISCOVERY_SIZE;
            return (
              <button
                key={p.slug}
                onClick={() => toggle(p.slug)}
                disabled={disabled}
                className={`group relative flex items-center gap-3 rounded-sm border p-3 text-left transition-all ${
                  on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                } ${disabled ? "opacity-40" : ""}`}
              >
                <img src={p.image} alt="" className="h-14 w-12 rounded-sm object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-ivory">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">{p.family}</p>
                </div>
                {on && <Check className="h-4 w-4 text-gold" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Your set</p>
            <p className="mt-1 font-display text-2xl text-ivory">
              {chosen.length}/{DISCOVERY_SIZE} chosen • ₹{total}
            </p>
          </div>
          <button
            onClick={() => addToCart()}
            disabled={!isComplete}
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft disabled:opacity-40"
          >
            <ShoppingBag className="h-4 w-4" /> Add set to cart
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Gift Builder -------------------- */

const GIFT_UNIT_PRICE = 349;
const GIFT_SET_PRICE = 649; // 2 × 50ml in a gift box, packaging included
const GIFT_SIZE = 2;

function GiftBuilder() {
  const [scope, setScope] = useState<"men" | "women" | "unisex" | "any">("any");
  const [selected, setSelected] = useState<string[]>([]);
  const addBundle = useCart((s) => s.addBundle);

  const pool = perfumes.filter((p) => scope === "any" || p.gender === scope);
  const chosen = selected.map((slug) => perfumes.find((p) => p.slug === slug)!).filter(Boolean);
  const isComplete = chosen.length === GIFT_SIZE;
  const total = isComplete ? GIFT_SET_PRICE : chosen.length * GIFT_UNIT_PRICE;

  const toggle = (slug: string) => {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= GIFT_SIZE) return s;
      return [...s, slug];
    });
  };

  const addPreset = () => {
    const preset = [...pool].sort((a, b) => b.rating - a.rating).slice(0, GIFT_SIZE);
    addBundle({
      slug: `gift-preset-${scope}-${Date.now()}`,
      name: `Luxury Gift Box — ${labelForScope(scope)}`,
      image: preset[0].image,
      unitPrice: GIFT_SET_PRICE,
      bundleOf: preset.map((p) => ({ slug: p.slug, name: p.name, size: "50ml" as const })),
    });
    toast.success("Luxury Gift Box added");
  };

  const addCustom = () => {
    if (!isComplete) {
      toast.error(`Choose ${GIFT_SIZE - chosen.length} more`);
      return;
    }
    addBundle({
      slug: `gift-custom-${Date.now()}`,
      name: `Custom Luxury Gift Box`,
      image: chosen[0].image,
      unitPrice: GIFT_SET_PRICE,
      bundleOf: chosen.map((p) => ({ slug: p.slug, name: p.name, size: "50ml" as const })),
    });
    toast.success("Custom Gift Box added");
    setSelected([]);
  };

  return (
    <section className="container-luxe">
      <div className="rounded-sm border border-gold/40 bg-gradient-to-br from-black to-surface/60 p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold">
              <Gift className="h-3 w-3" /> Build your gift box
            </p>
            <h3 className="mt-2 font-display text-3xl text-ivory md:text-4xl">Two 50ml. One gift box. ₹{GIFT_SET_PRICE}.</h3>
            <p className="mt-2 max-w-xl text-sm text-ivory/60">
              Hand-finished box, ribbon and a card. Choose a curated pairing, or design your own.
            </p>
          </div>
          <button
            onClick={addPreset}
            className="rounded-sm border border-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            Add curated pair
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["any", "men", "women", "unisex"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setScope(s); setSelected([]); }}
              className={`rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                scope === s ? "border-gold bg-gold/15 text-gold" : "border-border text-ivory/60 hover:border-gold/60 hover:text-ivory"
              }`}
            >
              {labelForScope(s)}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {pool.map((p) => {
            const on = selected.includes(p.slug);
            const disabled = !on && selected.length >= GIFT_SIZE;
            return (
              <button
                key={p.slug}
                onClick={() => toggle(p.slug)}
                disabled={disabled}
                className={`group relative flex items-center gap-3 rounded-sm border p-3 text-left transition-all ${
                  on ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                } ${disabled ? "opacity-40" : ""}`}
              >
                <img src={p.image} alt="" className="h-14 w-12 rounded-sm object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-ivory">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">{p.family}</p>
                </div>
                {on ? <Minus className="h-4 w-4 text-gold" /> : <Plus className="h-4 w-4 text-ivory/40" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Your gift box</p>
            <p className="mt-1 font-display text-2xl text-ivory">
              {chosen.length}/{GIFT_SIZE} chosen • ₹{total}
            </p>
          </div>
          <button
            onClick={addCustom}
            disabled={!isComplete}
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft disabled:opacity-40"
          >
            <Gift className="h-4 w-4" /> Add gift box
          </button>
        </div>
      </div>
    </section>
  );
}

function labelForScope(s: "men" | "women" | "unisex" | "any") {
  if (s === "any") return "Any";
  if (s === "men") return "For Him";
  if (s === "women") return "For Her";
  return "Unisex";
}
