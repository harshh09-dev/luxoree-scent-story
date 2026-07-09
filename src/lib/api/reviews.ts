import { apiFetch, HAS_BACKEND } from "./client";
import type { ReviewCreated, ReviewInput } from "./types";

/** POST /api/reviews — submit a product review (pending moderation). */
export async function submitReview(input: ReviewInput): Promise<ReviewCreated> {
  if (HAS_BACKEND) {
    return apiFetch<ReviewCreated>("/api/reviews", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }
  await new Promise((r) => setTimeout(r, 500));
  return {
    id: crypto.randomUUID(),
    productSlug: input.productSlug,
    name: input.name,
    rating: input.rating,
    text: input.text,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
}
