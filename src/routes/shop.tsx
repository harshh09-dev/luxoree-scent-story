import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, X } from "lucide-react";
import { perfumes, FAMILY_TAGS, type Gender, type FamilyTag } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

const shopSearch = z.object({
  g: z.enum(["all", "men", "women", "unisex"]).optional().catch("all"),
}).catch({ g: "all" });

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearch,
  head: () => ({
    meta: [
      { title: "Shop All Fragrances — Luxorée" },
      { name: "description", content: "Browse all 8 hand-blended Luxorée Eau de Parfums. 8–10 hour longevity, free delivery over ₹999, cash on delivery." },
      { property: "og:title", content: "Shop All Fragrances — Luxorée" },
      { property: "og:description", content: "Eight signature fragrances, hand-blended in India." },
      { property: "og:url", content: `${SITE.domain}/shop` },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/shop` }],
  }),
  component: ShopPage,
});

type Sort = "popularity" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const { g } = Route.useSearch();
  const navigate = Route.useNavigate();
  const tab: "all" | Gender = g ?? "all";
  const setTab = (k: "all" | Gender) => navigate({ search: { g: k } });
  const [sort, setSort] = useState<Sort>("popularity");
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<FamilyTag[]>([]);

  const toggleTag = (t: FamilyTag) =>
    setActiveTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const filtered = useMemo(() => {
    let list = perfumes.filter((p) => (tab === "all" ? true : p.gender === tab));
    if (activeTags.length > 0) {
      list = list.filter((p) => activeTags.every((t) => p.familyTags.includes(t)));
    }
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
  }, [tab, sort, q, activeTags]);

  const tabs: { k: "all" | Gender; label: string; count: number }[] = [
    { k: "all", label: "All", count: perfumes.length },
    { k: "men", label: "For Him", count: perfumes.filter((p) => p.gender === "men").length },
    { k: "women", label: "For Her", count: perfumes.filter((p) => p.gender === "women").length },
    { k: "unisex", label: "Unisex", count: perfumes.filter((p) => p.gender === "unisex").length },
  ];

  const resetAll = () => { setQ(""); setTab("all"); setActiveTags([]); };

  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal>
        <div className="border-b border-border/40 pb-10">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Collection</p>
          <h1 className="mt-3 font-display text-5xl text-ivory md:text-7xl">Eight Signatures.</h1>
          <p className="mt-4 max-w-xl text-base text-ivory/65">
            Hand-blended Eau de Parfums, 25–30% concentration, 8–10 hour wear.
            Made in Jaipur — shipped across India.
          </p>
        </div>
      </Reveal>

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
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort"
              className="rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Family filter chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="mr-1 self-center text-[10px] uppercase tracking-[0.25em] text-ivory/50">Family:</span>
          {FAMILY_TAGS.map((t) => {
            const active = activeTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all ${
                  active
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-border/60 text-ivory/60 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {t}
              </button>
            );
          })}
          {(activeTags.length > 0 || q || tab !== "all") && (
            <button
              onClick={resetAll}
              className="ml-1 inline-flex items-center gap-1 rounded-full border border-destructive/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="grid place-items-center py-24 text-center">
            <div>
              <p className="font-display text-3xl text-ivory">No fragrances found</p>
              <p className="mt-2 text-sm text-ivory/60">Try a different search or clear the filters.</p>
              <button
                onClick={resetAll}
                className="mt-6 rounded-sm border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-background"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-ivory/50">
              {filtered.length} fragrance{filtered.length === 1 ? "" : "s"}
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} p={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
