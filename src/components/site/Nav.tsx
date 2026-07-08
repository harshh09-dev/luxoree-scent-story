import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/shop" as const, label: "Shop" },
  { to: "/quiz" as const, label: "Fragrance Quiz" },
  { to: "/about" as const, label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
          LUXOREE
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
          <IconBtn label="Wishlist"><Heart className="h-[18px] w-[18px]" /></IconBtn>
          <IconBtn label="Account"><User className="h-[18px] w-[18px]" /></IconBtn>
          <IconBtn label="Cart">
            <span className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="absolute -right-1.5 -top-1.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-background">
                0
              </span>
            </span>
          </IconBtn>
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

      {/* Mobile menu */}
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
