import { createFileRoute, Link } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

type Collection = {
  slug: string;
  title: string;
  tag: string;
  copy: string;
  filter: (p: (typeof perfumes)[number]) => boolean;
};

const collections: Collection[] = [
  { slug: "best-sellers", title: "Best Sellers", tag: "Most-loved", copy: "The fragrances that keep coming back.", filter: (p) => !!p.bestSeller },
  { slug: "signature", title: "Signature Range", tag: "Editor's choice", copy: "Eight defining scents. One is yours.", filter: (p) => !!p.signature },
  { slug: "for-him", title: "For Him", tag: "Masculine", copy: "Woody, spiced and unmistakably masculine.", filter: (p) => p.gender === "men" },
  { slug: "for-her", title: "For Her", tag: "Feminine", copy: "Floral, radiant, effortlessly worn.", filter: (p) => p.gender === "women" },
  { slug: "unisex", title: "Unisex", tag: "Genderless", copy: "Fragrances that wear the wearer.", filter: (p) => p.gender === "unisex" },
  { slug: "oud-woody", title: "Oud & Woody", tag: "Warm woods", copy: "For lovers of depth and shadow.", filter: (p) => p.familyTags.includes("Oud") || p.familyTags.includes("Woody") },
  { slug: "fresh-aquatic", title: "Fresh & Aquatic", tag: "Cool clarity", copy: "Salt air, citrus, first light.", filter: (p) => p.familyTags.includes("Fresh") || p.familyTags.includes("Aquatic") },
  { slug: "sweet-gourmand", title: "Sweet & Gourmand", tag: "Vanilla-forward", copy: "Warmth wrapped in shadow.", filter: (p) => p.familyTags.includes("Sweet") || p.familyTags.includes("Gourmand") },
];

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Fragrance Collections — Luxorée" },
      { name: "description", content: "Curated Luxorée collections — best sellers, signature range, oud & woody, fresh, sweet gourmand." },
      { property: "og:title", content: "Fragrance Collections — Luxorée" },
      { property: "og:description", content: "Discover our curated fragrance edits." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Curated Edits</p>
        <h1 className="mt-2 font-display text-5xl text-ivory md:text-7xl">Collections</h1>
        <p className="mt-4 max-w-xl text-base text-ivory/65">
          Eight fragrances, endless combinations. Explore by mood, occasion or fragrance family.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => {
          const preview = perfumes.filter(c.filter).slice(0, 3);
          return (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/40 bg-surface/60 p-5 transition-all hover:border-gold/60 hover:shadow-[0_20px_60px_-20px_rgba(201,162,76,0.35)]"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{c.tag}</p>
              <h2 className="mt-1 font-display text-3xl text-ivory group-hover:text-gold">{c.title}</h2>
              <p className="mt-2 text-sm text-ivory/60">{c.copy}</p>
              <div className="mt-5 flex -space-x-4">
                {preview.map((p) => (
                  <img key={p.slug} src={p.image} alt="" className="h-20 w-16 rounded-sm border border-background object-cover" />
                ))}
              </div>
              <span className="mt-5 text-[10px] uppercase tracking-[0.3em] text-gold">
                Explore {perfumes.filter(c.filter).length} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export { collections };
