import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Perfume } from "@/data/perfumes";

export type CartSize = "20ml" | "50ml" | "Set";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  size: CartSize;
  unitPrice: number;
  qty: number;
  /** Optional inventory of components for bundles (Discovery / Gift sets). */
  bundleOf?: { slug: string; name: string; size: "20ml" | "50ml" }[];
};

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  add: (p: Perfume, size: Exclude<CartSize, "Set">, qty?: number) => void;
  addBundle: (bundle: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (slug: string, size: CartSize) => void;
  setQty: (slug: string, size: CartSize, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      add: (p, size, qty = 1) =>
        set((s) => {
          const unitPrice = size === "50ml" ? p.price : p.trialPrice;
          const existing = s.items.find((i) => i.slug === p.slug && i.size === size);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === p.slug && i.size === size ? { ...i, qty: i.qty + qty } : i,
              ),
              drawerOpen: true,
            };
          }
          return {
            items: [...s.items, { slug: p.slug, name: p.name, image: p.image, size, unitPrice, qty }],
            drawerOpen: true,
          };
        }),
      addBundle: (b) =>
        set((s) => ({
          items: [...s.items, { ...b, size: "Set", qty: b.qty ?? 1 }],
          drawerOpen: true,
        })),
      remove: (slug, size) =>
        set((s) => ({ items: s.items.filter((i) => !(i.slug === slug && i.size === size)) })),
      setQty: (slug, size, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
      subtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "luxoree-cart" },
  ),
);
