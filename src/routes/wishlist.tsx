import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { perfumes } from "@/data/perfumes";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Luxorée" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const slugs = useWishlist((s) => s.slugs);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);

  const items = slugs
    .map((slug) => perfumes.find((p) => p.slug === slug))
    .filter(Boolean) as typeof perfumes;

  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Saved for later</p>
        <h1 className="mt-2 font-display text-5xl text-ivory md:text-6xl">Your Wishlist</h1>
        <p className="mt-3 text-ivory/60">{items.length} fragrance{items.length === 1 ? "" : "s"} saved.</p>
      </Reveal>

      {items.length === 0 ? (
        <div className="mt-16 grid place-items-center py-16 text-center">
          <Heart className="h-16 w-16 text-ivory/25" />
          <p className="mt-6 font-display text-3xl text-ivory">No favourites yet</p>
          <p className="mt-2 text-sm text-ivory/60">Tap the heart on any fragrance to save it here.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft"
          >
            Explore fragrances
          </Link>
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-border/40 border-y border-border/40">
          {items.map((p) => (
            <li key={p.slug} className="grid grid-cols-[100px_1fr] gap-5 py-6 md:grid-cols-[140px_1fr]">
              <Link to="/shop/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] overflow-hidden rounded-sm bg-black">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-col justify-between">
                <div>
                  <Link to="/shop/$slug" params={{ slug: p.slug }} className="font-display text-2xl text-ivory hover:text-gold">
                    {p.name}
                  </Link>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold">{p.family}</p>
                  <p className="mt-2 text-sm text-ivory/60">₹{p.price} <span className="text-ivory/40 line-through">₹{p.mrp}</span></p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      add(p, "50ml", 1);
                      toast.success(`${p.name} added to cart`);
                    }}
                    className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
                  </button>
                  <button
                    onClick={() => { void remove(p.slug); toast.success("Removed"); }}
                    className="text-[10px] uppercase tracking-[0.25em] text-ivory/60 hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
