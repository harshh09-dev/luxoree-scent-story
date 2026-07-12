import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Perfume } from "@/data/perfumes";
import { useCart, type CartSize } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export function ProductCard({ p, index = 0 }: { p: Perfume; index?: number }) {
  const addToCart = useCart((s) => s.add);
  const has = useWishlist((s) => s.has(p.slug));
  const toggle = useWishlist((s) => s.toggle);
  const [size, setSize] = useState<CartSize>("50ml");

  const price = size === "50ml" ? p.price : p.trialPrice;
  const mrp = size === "50ml" ? p.mrp : undefined;
  const off = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void toggle(p.slug);
    toast.success(has ? "Removed from wishlist" : "Added to wishlist");
  };

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, size, 1);
    toast.success(`${p.name} (${size}) added to cart`);
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border/40 bg-surface/60 transition-all duration-700 hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(201,162,76,0.35)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {p.bestSeller && (
          <span className="rounded-sm bg-gold/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-background">
            Best Seller
          </span>
        )}
        {p.trending && !p.bestSeller && (
          <span className="rounded-sm bg-ivory/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-background">
            Trending
          </span>
        )}
        {off > 0 && (
          <span className="rounded-sm bg-destructive/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory">
            {off}% Off
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onWish}
        aria-label={has ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/70 p-2 text-ivory backdrop-blur transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      >
        <Heart className={`h-4 w-4 ${has ? "fill-gold text-gold" : ""}`} />
      </button>

      <Link
        to="/shop/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-black"
      >
        <img
          src={p.image}
          alt={`${p.name} — ${p.tagline}`}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/shop/$slug"
          params={{ slug: p.slug }}
          className="font-display text-xl leading-tight text-ivory transition-colors group-hover:text-gold"
        >
          {p.name}
        </Link>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50">{p.family}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-ivory/60">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-ivory/80">{p.rating.toFixed(1)}</span>
            <span>({p.reviewCount})</span>
          </span>
          <span>{p.longevity}</span>
        </div>

        {/* Size selector */}
        <div className="mt-3 inline-flex self-start rounded-sm border border-border/60 text-[10px] uppercase tracking-[0.2em]">
          {(["20ml", "50ml"] as CartSize[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={(e) => { e.preventDefault(); setSize(s); }}
              className={`px-3 py-1.5 transition-colors ${
                size === s ? "bg-gold text-background" : "text-ivory/70 hover:text-gold"
              }`}
              aria-pressed={size === s}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-2xl text-gold">₹{price}</span>
          {mrp && <span className="text-xs text-ivory/40 line-through">₹{mrp}</span>}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm border border-gold bg-transparent px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-background"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
        </button>
      </div>
    </div>
  );
}
