import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Fragrance Finder Quiz — Luxoree" },
      { name: "description", content: "Answer 5 quick questions and discover your signature Luxoree fragrance." },
      { property: "og:title", content: "Fragrance Finder — Luxoree" },
      { property: "og:description", content: "Find your perfect Luxoree scent in under a minute." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  return (
    <section className="container-luxe grid min-h-[70dvh] place-items-center py-24">
      <div className="max-w-xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-gold">Fragrance Finder</p>
        <h1 className="mt-3 font-display text-5xl text-ivory md:text-6xl">
          Coming <span className="gold-gradient-text italic">soon.</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ivory/70">
          A five-question quiz that matches you to your signature Luxoree scent is on its
          way. In the meantime, explore the full collection — every fragrance is
          designed to be worn boldly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-sm bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft">
            Browse the Collection
          </Link>
          <Link to="/" className="rounded-sm border border-gold/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold hover:bg-gold/5">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
