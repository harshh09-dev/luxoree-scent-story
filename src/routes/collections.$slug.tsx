import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { perfumes } from "@/data/perfumes";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { collections } from "./collections";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = collections.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { collectionSlug: c.slug, title: c.title, tag: c.tag, copy: c.copy };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Collection"} — Luxorée` },
      { name: "description", content: loaderData?.copy ?? "A Luxorée collection." },
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

function CollectionDetail() {
  const { collectionSlug, title, tag, copy } = Route.useLoaderData();
  const c = collections.find((x) => x.slug === collectionSlug)!;
  const list = perfumes.filter(c.filter);

  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal>
        <Link to="/collections" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60 hover:text-gold">
          <ArrowLeft className="h-3 w-3" /> All Collections
        </Link>
        <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-gold">{tag}</p>
        <h1 className="mt-2 font-display text-5xl text-ivory md:text-7xl">{title}</h1>
        <p className="mt-4 max-w-xl text-base text-ivory/65">{copy}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {list.map((p, i) => (
          <ProductCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}
