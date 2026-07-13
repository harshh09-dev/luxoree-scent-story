import { createFileRoute, Link } from "@tanstack/react-router";
import { perfumes, type Perfume } from "@/data/perfumes";
import { Reveal } from "@/components/site/Reveal";

export type Collection = {
  slug: string;
  title: string;
  tag: string;
  copy: string;
  story: string;
  heroCaption: string;
  /** Alternative slugs that redirect / respond to this collection. */
  aliases?: string[];
  /** Special layouts. Absent = regular curated grid. */
  kind?: "regular" | "discovery" | "gift";
  filter: (p: Perfume) => boolean;
};

export const collections: Collection[] = [
  {
    slug: "best-sellers",
    title: "Best Sellers",
    tag: "Most-loved",
    copy: "The fragrances that keep coming back.",
    story: "The bottles that leave our studio most often — each one has earned its place.",
    heroCaption: "Loved across India.",
    filter: (p) => !!p.bestSeller,
  },
  {
    slug: "signature",
    title: "Signature Range",
    tag: "Editor's choice",
    copy: "Eight defining scents. One is yours.",
    story: "Our editor's selection — the fragrances we would each choose as our own signature.",
    heroCaption: "Curated by hand.",
    filter: (p) => !!p.signature,
  },
  {
    slug: "men",
    title: "For Him",
    tag: "Masculine",
    copy: "Woody, spiced and unmistakably masculine.",
    story: "For the man who arrives and is remembered — depth, warmth, and a quiet confidence.",
    heroCaption: "Made for him.",
    aliases: ["for-him"],
    filter: (p) => p.gender === "men",
  },
  {
    slug: "women",
    title: "For Her",
    tag: "Feminine",
    copy: "Floral, radiant, effortlessly worn.",
    story: "Radiant florals and warm musks — fragrances written for the women who wear them.",
    heroCaption: "Made for her.",
    aliases: ["for-her"],
    filter: (p) => p.gender === "women",
  },
  {
    slug: "unisex",
    title: "Unisex",
    tag: "Genderless",
    copy: "Fragrances that wear the wearer.",
    story: "Scent has no gender. Neither do these.",
    heroCaption: "Yours to wear.",
    filter: (p) => p.gender === "unisex",
  },
  {
    slug: "oud-woody",
    title: "Oud & Woody",
    tag: "Warm woods",
    copy: "For lovers of depth and shadow.",
    story: "Aged oud, sandalwood, cedar and smoked resins. Scents that live in low light.",
    heroCaption: "Warmth, in wood.",
    filter: (p) => p.familyTags.includes("Oud") || p.familyTags.includes("Woody"),
  },
  {
    slug: "fresh-aquatic",
    title: "Fresh & Aquatic",
    tag: "Cool clarity",
    copy: "Salt air, citrus, first light.",
    story: "Marine minerals, citrus peel and clean musk — fragrances the sun agrees with.",
    heroCaption: "First light in a bottle.",
    filter: (p) => p.familyTags.includes("Fresh") || p.familyTags.includes("Aquatic"),
  },
  {
    slug: "sweet-gourmand",
    title: "Sweet & Gourmand",
    tag: "Vanilla-forward",
    copy: "Warmth wrapped in shadow.",
    story: "Vanilla bourbon, tonka and benzoin — the fragrances people lean in for.",
    heroCaption: "Sweet, not saccharine.",
    filter: (p) => p.familyTags.includes("Sweet") || p.familyTags.includes("Gourmand"),
  },
  {
    slug: "discovery-sets",
    title: "Discovery Sets",
    tag: "Try before you commit",
    copy: "Curated 20ml trios — or build your own.",
    story: "Three 20ml fragrances, chosen to travel and try. Save on the set or design your own.",
    heroCaption: "Three, chosen well.",
    kind: "discovery",
    // Discovery-set page renders a builder; the filter is still used to preview products.
    filter: () => true,
  },
  {
    slug: "gift-boxes",
    title: "Gift Collections",
    tag: "For someone",
    copy: "Presentation boxes for the ones who matter.",
    story: "Two full 50ml fragrances in a hand-finished gift box. Ready to give — or build to gift.",
    heroCaption: "Wrapped, ribboned, remembered.",
    aliases: ["gift-collections"],
    kind: "gift",
    filter: () => true,
  },
];

export const findCollection = (slugOrAlias: string) =>
  collections.find((c) => c.slug === slugOrAlias || c.aliases?.includes(slugOrAlias));

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Fragrance Collections — Luxorée" },
      { name: "description", content: "Curated Luxorée collections — best sellers, signature range, oud & woody, fresh, sweet gourmand, discovery sets and gift boxes." },
      { property: "og:title", content: "Fragrance Collections — Luxorée" },
      { property: "og:description", content: "Discover our curated fragrance edits, discovery sets and gift boxes." },
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
          Eight fragrances, endless combinations. Explore by mood, family — or design a set that's entirely yours.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => {
          const preview =
            c.kind === "discovery" || c.kind === "gift"
              ? perfumes.slice(0, 3)
              : perfumes.filter(c.filter).slice(0, 3);
          const count =
            c.kind === "discovery" || c.kind === "gift" ? null : perfumes.filter(c.filter).length;
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
                {count === null ? "Explore & build →" : `Explore ${count} →`}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
