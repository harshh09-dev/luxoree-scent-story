import { supabase } from "@/integrations/supabase/client";
import type { ReviewCreated, ReviewInput } from "./types";

/** POST /reviews — inserts a pending review into Lovable Cloud. */
export async function submitReview(input: ReviewInput): Promise<ReviewCreated> {
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      user_id: userData.user?.id ?? null,
      product_slug: input.productSlug,
      name: input.name,
      email: input.email ?? null,
      rating: input.rating,
      text: input.text,
    })
    .select("id,product_slug,name,rating,text,created_at,status")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Could not submit review.");

  return {
    id: data.id,
    productSlug: data.product_slug,
    name: data.name,
    rating: data.rating,
    text: data.text,
    createdAt: data.created_at,
    status: data.status as ReviewCreated["status"],
  };
}

/** GET /reviews?productSlug=… — approved reviews for a given product. */
export async function listApprovedReviews(productSlug: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id,name,rating,text,created_at")
    .eq("product_slug", productSlug)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}
