import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Luxorée" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [couponErr, setCouponErr] = useState<string | null>(null);

  const sub = subtotal();
  const discount = couponApplied === "LUXORÉE10" ? Math.round(sub * 0.1) : 0;
  const shipping = sub === 0 ? 0 : sub - discount >= SITE.shipping.freeShippingOver ? 0 : SITE.shipping.flatRate;
  const total = sub - discount + shipping;

  const applyCoupon = () => {
    setCouponErr(null);
    const code = coupon.trim().toUpperCase();
    if (code === "LUXORÉE10" || code === "LUXOREE10") {
      setCouponApplied("LUXORÉE10");
    } else {
      setCouponErr("Invalid coupon.");
      setCouponApplied(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 md:py-32">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-ivory/25" />
          <h1 className="mt-6 font-display text-4xl text-ivory">Your cart is empty</h1>
          <p className="mt-3 text-sm text-ivory/60">
            Explore the collection — eight signatures, one is yours.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft"
          >
            Shop fragrances <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luxe py-16 md:py-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Your Cart</p>
          <h1 className="mt-2 font-display text-5xl text-ivory md:text-6xl">{items.length} item{items.length > 1 ? "s" : ""}</h1>
        </div>
        <button
          onClick={() => { if (confirm("Clear all items from your cart?")) clear(); }}
          className="mt-3 text-[10px] uppercase tracking-[0.25em] text-ivory/60 hover:text-destructive"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="grid grid-cols-[100px_1fr] gap-5 py-6 md:grid-cols-[140px_1fr]">
              <Link
                to="/shop/$slug"
                params={{ slug: i.slug }}
                className="block aspect-[4/5] overflow-hidden rounded-sm bg-black"
              >
                <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to="/shop/$slug"
                      params={{ slug: i.slug }}
                      className="font-display text-2xl text-ivory hover:text-gold"
                    >
                      {i.name}
                    </Link>
                    <button
                      onClick={() => remove(i.slug, i.size)}
                      aria-label={`Remove ${i.name}`}
                      className="p-1 text-ivory/40 hover:text-destructive"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold">{i.size} • Eau de Parfum</p>
                  <p className="mt-1 text-sm text-ivory/60">₹{i.unitPrice} each</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-sm border border-border">
                    <button
                      onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                      aria-label="Decrease"
                      className="p-2.5 text-ivory/70 hover:text-gold"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                      aria-label="Increase"
                      className="p-2.5 text-ivory/70 hover:text-gold"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="font-display text-2xl text-gold">₹{i.unitPrice * i.qty}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-sm border border-border/50 bg-surface/40 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-ivory">Order Summary</h2>

          <div className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal" value={`₹${sub}`} />
            {discount > 0 && <Row label={`Discount (${couponApplied})`} value={`-₹${discount}`} accent />}
            <Row label={shipping === 0 ? "Shipping (free)" : "Shipping"} value={shipping === 0 ? "Free" : `₹${shipping}`} />
            <div className="mt-4 border-t border-border/40 pt-4">
              <Row label={<span className="text-base">Total</span>} value={<span className="font-display text-3xl text-gold">₹{total}</span>} />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">Coupon</p>
            <div className="mt-2 flex gap-2">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Try LUXOREE10"
                  className="w-full rounded-sm border border-border bg-background/60 py-2.5 pl-9 pr-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                />
              </div>
              <button
                onClick={applyCoupon}
                className="rounded-sm border border-gold px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-background"
              >
                Apply
              </button>
            </div>
            {couponErr && <p className="mt-1 text-xs text-destructive">{couponErr}</p>}
            {couponApplied && <p className="mt-1 text-xs text-gold">Coupon applied — 10% off.</p>}
          </div>

          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft"
          >
            Proceed to checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-ivory/50">
            Cash on Delivery available • Secure packaging
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: React.ReactNode; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ivory/70">{label}</span>
      <span className={accent ? "text-gold" : "text-ivory"}>{value}</span>
    </div>
  );
}
