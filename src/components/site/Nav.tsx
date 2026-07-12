import { Link, useRouterState } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/shop" as const, label: "Shop" },
  { to: "/collections" as const, label: "Collections" },
  { to: "/about" as const, label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const openDrawer = useCart((s) => s.openDrawer);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.slugs.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-display text-xl tracking-[0.35em] text-gold md:text-2xl" aria-label="Luxoree home">
          LUXORÉE
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="gold-underline text-[13px] font-medium uppercase tracking-[0.18em] text-ivory/85 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-3">
          <IconBtn label="Search"><Search className="h-[18px] w-[18px]" /></IconBtn>
          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishCount} items)`}
            className="relative rounded-full p-2 text-ivory transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <Heart className={`h-[18px] w-[18px] ${wishCount > 0 ? "fill-gold text-gold" : ""}`} />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-background">
                {wishCount}
              </span>
            )}
          </Link>
          <IconBtn label="Account"><User className="h-[18px] w-[18px]" /></IconBtn>
          <button
            aria-label={`Cart (${count} items)`}
            onClick={openDrawer}
            className="relative rounded-full p-2 text-ivory transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-background">
                {count}
              </span>
            )}
          </button>
          <button
            className="ml-1 rounded-full p-2 text-ivory hover:text-gold md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur transition-[max-height,opacity] duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-luxe flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-3 text-sm uppercase tracking-[0.22em] text-ivory/85 hover:bg-elevated hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            className="rounded-md px-3 py-3 text-sm uppercase tracking-[0.22em] text-ivory/85 hover:bg-elevated hover:text-gold"
          >
            Wishlist {wishCount > 0 && <span className="text-gold">({wishCount})</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="rounded-full p-2 text-ivory transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
    >
      {children}
    </button>
  );
}
