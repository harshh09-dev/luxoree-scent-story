import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { perfumes, type Gender } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Fragrances — Luxoree" },
      { name: "description", content: "Browse all 15 Luxoree perfumes for men, women and unisex. Long lasting premium fragrances from ₹349." },
      { property: "og:title", content: "Shop All Fragrances — Luxoree" },
      { property: "og:description", content: "Discover 15 handcrafted premium perfumes. Free delivery within 3km." },
    ],
  }),
  component: ShopPage,
});

type Sort = "popularity" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const [tab, setTab] = useState<"all" | Gender>("all");
  const [sort, setSort] = useState<Sort>("popularity");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = perfumes.filter((p) => (tab === "all" ? true : p.gender === tab));
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(needle) ||
        p.family.toLowerCase().includes(needle) ||
        [...p.notes.top, ...p.notes.heart, ...p.notes.base].some((n) => n.toLowerCase().includes(needle)),
      );
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [tab, sort, q]);

  const tabs: { k: "all" | Gender; label: string; count: number }[] = [
    { k: "all", label: "All", count: perfumes.length },
    { k: "men", label: "Men", count: perfumes.filter((p) => p.gender === "men").length },
    { k: "women", label: "Women", count: perfumes.filter((p) => p.gender === "women").length },
    { k: "unisex", label: "Unisex", count: perfumes.filter((p) => p.gender === "unisex").length },
  ];

  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal>
        <div className="border-b border-border/40 pb-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">The Collection</p>
          <h1 className="mt-3 font-display text-5xl text-ivory md:text-7xl">Our Fragrances</h1>
          <p className="mt-4 max-w-xl text-base text-ivory/65">
            Fifteen handcrafted perfumes. Every note chosen with intent. Made for every mood and every moment.
          </p>
        </div>
      </Reveal>

      {/* Controls */}
      <div className="sticky top-16 z-30 mt-8 -mx-4 border-b border-border/40 bg-background/85 px-4 py-4 backdrop-blur md:top-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all ${
                  tab === t.k
                    ? "border-gold bg-gold text-background"
                    : "border-border text-ivory/70 hover:border-gold/60 hover:text-gold"
                }`}
              >
                {t.label} <span className="ml-1 opacity-70">({t.count})</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <label className="relative flex-1 md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/50" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search fragrances or notes…"
                aria-label="Search"
                className="w-full rounded-sm border border-border bg-background/60 py-2.5 pl-10 pr-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
            </label>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/50" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort"
                className="appearance-none rounded-sm border border-border bg-background/60 py-2.5 pl-10 pr-8 text-sm text-ivory focus:border-gold focus:outline-none"
              >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="grid place-items-center py-24 text-center">
            <div>
              <p className="font-display text-3xl text-ivory">No fragrances found</p>
              <p className="mt-2 text-sm text-ivory/60">Try a different search or clear the filter.</p>
              <button
                onClick={() => { setQ(""); setTab("all"); }}
                className="mt-6 rounded-sm border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-background"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
