// Configurable delivery policy — free within 3 km of Mahesh Nagar, Jaipur.
// Values here are the runtime defaults; the Admin/Supabase layer can override later.

export const DELIVERY = {
  origin: {
    label: "Mahesh Nagar, Jaipur",
    pincode: "302015",
  },
  freeRadiusKm: 3,
  // Pincodes considered "within" the free-delivery radius of Mahesh Nagar.
  // Neighbourhoods immediately around Mahesh Nagar / Tonk Road / Sanganer.
  freePincodes: [
    "302015", // Mahesh Nagar
    "302018", // Sanganer / Tonk Rd
    "302019", // Durgapura
    "302017", // Malviya Nagar
    "302033", // Pratap Nagar
    "302020", // Mansarovar
    "302029", // Gopalpura
  ],
  outsideCopy: "Shipping charges will be calculated after address verification.",
  freeCopy: "Free Delivery within 3 km of Mahesh Nagar, Jaipur.",
} as const;

export function isFreeDeliveryPincode(pincode: string | undefined | null): boolean {
  if (!pincode) return false;
  return (DELIVERY.freePincodes as readonly string[]).includes(pincode.trim());
}

export type DeliveryQuote =
  | { kind: "free"; amount: 0; label: "Free Delivery"; note: string }
  | { kind: "outside"; amount: 0; label: "To be confirmed"; note: string };

/** Quote used before dispatch. Outside radius = 0 now, confirmed later. */
export function quoteDelivery(pincode: string | undefined | null): DeliveryQuote {
  if (isFreeDeliveryPincode(pincode)) {
    return { kind: "free", amount: 0, label: "Free Delivery", note: DELIVERY.freeCopy };
  }
  return { kind: "outside", amount: 0, label: "To be confirmed", note: DELIVERY.outsideCopy };
}
