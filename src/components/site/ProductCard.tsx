import { Link } from "@tanstack/react-router";
import { Heart, Star, Clock } from "lucide-react";
import type { Perfume } from "@/data/perfumes";

export function ProductCard({ p, index = 0 }: { p: Perfume; index?: number }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border/40 bg-surface/60 transition-all duration-700 hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(201,162,76,0.35)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {p.bestSeller && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-gold/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-background">
          Best Seller
        </span>
      )}
      {p.isNew && !p.bestSeller && (
        <span className="absolute left-3 top-3 z-10 rounded-sm border border-gold/60 bg-background/70 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
          New
        </span>
      )}
      <button
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/60 text-ivory/80 backdrop-blur transition-colors hover:text-gold"
        aria-label={`Add ${p.name} to wishlist`}
      >
        <Heart className="h-4 w-4" />
      </button>

      <Link
        to="/shop/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[3/4] overflow-hidden bg-black"
      >
        <img
          src={p.image}
          alt={`${p.name} — ${p.tagline}`}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          loading="lazy"
          width={900}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            to="/shop/$slug"
            params={{ slug: p.slug }}
            className="font-display text-lg leading-tight text-ivory transition-colors group-hover:text-gold"
          >
            {p.name}
          </Link>
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50">{p.family}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-ivory/60">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-ivory/80">{p.rating.toFixed(1)}</span>
            <span>({p.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gold" />
            {p.longevity}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl text-gold">₹{p.price}</span>
          <span className="text-xs text-ivory/40 line-through">₹{p.mrp}</span>
          <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-gold-soft">50ml</span>
        </div>
      </div>
    </div>
  );
}
