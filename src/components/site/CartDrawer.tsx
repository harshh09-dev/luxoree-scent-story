import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQty, remove, subtotal } = useCart();
  const total = subtotal();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col border-l border-border/60 bg-background shadow-[0_0_60px_rgba(201,162,76,0.15)] transition-transform duration-500 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border/40 px-5 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Your Cart</p>
            <p className="font-display text-2xl text-ivory">{items.length === 0 ? "Empty" : `${items.length} item${items.length > 1 ? "s" : ""}`}</p>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="rounded-full p-2 text-ivory/70 hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-ivory/30" />
              <p className="mt-4 font-display text-2xl text-ivory">Nothing here yet</p>
              <p className="mt-1 text-sm text-ivory/60">Discover fragrances made to be remembered.</p>
              <Link
                to="/shop"
                onClick={closeDrawer}
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft"
              >
                Shop fragrances <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border/40">
              {items.map((i) => (
                <li key={`${i.slug}-${i.size}`} className="flex gap-4 py-4">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: i.slug }}
                    onClick={closeDrawer}
                    className="block h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-black"
                  >
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to="/shop/$slug"
                          params={{ slug: i.slug }}
                          onClick={closeDrawer}
                          className="font-display text-lg text-ivory hover:text-gold"
                        >
                          {i.name}
                        </Link>
                        <button
                          onClick={() => remove(i.slug, i.size)}
                          aria-label={`Remove ${i.name}`}
                          className="p-1 text-ivory/40 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{i.size}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-sm border border-border">
                        <button
                          onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                          aria-label="Decrease"
                          className="p-2 text-ivory/70 hover:text-gold"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                          aria-label="Increase"
                          className="p-2 text-ivory/70 hover:text-gold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="font-display text-lg text-gold">₹{i.unitPrice * i.qty}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/40 bg-elevated/50 px-5 py-5">
            <div className="flex items-center justify-between text-sm text-ivory/80">
              <span>Subtotal</span>
              <span className="font-display text-2xl text-gold">₹{total}</span>
            </div>
            <p className="mt-1 text-[11px] text-ivory/50">Shipping and taxes calculated at checkout.</p>
            <div className="mt-4 grid gap-2">
              <Link
                to="/checkout"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background hover:bg-gold-soft"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/80 hover:border-gold hover:text-gold"
              >
                View full cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
