import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";

type WishlistState = {
  slugs: string[];
  hydratedFor: string | null; // user id whose wishlist we've loaded, if any
  has: (slug: string) => boolean;
  toggle: (slug: string) => Promise<void>;
  add: (slug: string) => Promise<void>;
  remove: (slug: string) => Promise<void>;
  hydrateFromCloud: () => Promise<void>;
  reset: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hydratedFor: null,
      has: (slug) => get().slugs.includes(slug),
      toggle: async (slug) => {
        if (get().has(slug)) await get().remove(slug);
        else await get().add(slug);
      },
      add: async (slug) => {
        if (get().slugs.includes(slug)) return;
        set({ slugs: [slug, ...get().slugs] });
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          await supabase.from("wishlist").insert({ user_id: data.user.id, product_slug: slug });
        }
      },
      remove: async (slug) => {
        set({ slugs: get().slugs.filter((s) => s !== slug) });
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          await supabase
            .from("wishlist")
            .delete()
            .eq("user_id", data.user.id)
            .eq("product_slug", slug);
        }
      },
      hydrateFromCloud: async () => {
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user) {
          set({ hydratedFor: null });
          return;
        }
        if (get().hydratedFor === user.id) return;
        const { data: rows } = await supabase
          .from("wishlist")
          .select("product_slug")
          .eq("user_id", user.id);
        const cloud = (rows ?? []).map((r) => r.product_slug);
        // Merge local (guest) with cloud, then push net-new locals up.
        const local = get().slugs;
        const merged = Array.from(new Set([...cloud, ...local]));
        const toUpload = local.filter((s) => !cloud.includes(s));
        if (toUpload.length > 0) {
          await supabase
            .from("wishlist")
            .insert(toUpload.map((product_slug) => ({ user_id: user.id, product_slug })));
        }
        set({ slugs: merged, hydratedFor: user.id });
      },
      reset: () => set({ slugs: [], hydratedFor: null }),
    }),
    { name: "luxoree-wishlist", partialize: (s) => ({ slugs: s.slugs }) },
  ),
);

// Keep wishlist in sync with auth state.
supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") void useWishlist.getState().hydrateFromCloud();
  if (event === "SIGNED_OUT") useWishlist.getState().reset();
});
