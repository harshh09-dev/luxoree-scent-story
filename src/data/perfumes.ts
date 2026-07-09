import addictionAsset from "@/assets/perfumes/addiction.webp.asset.json";
import afterhoursAsset from "@/assets/perfumes/afterhours.webp.asset.json";
import blackVanillaAsset from "@/assets/perfumes/black-vanilla.webp.asset.json";
import legacy7Asset from "@/assets/perfumes/legacy-7.webp.asset.json";
import marineAsset from "@/assets/perfumes/marine.webp.asset.json";
import midnightOudAsset from "@/assets/perfumes/midnight-oud.webp.asset.json";
import perfectAsset from "@/assets/perfumes/perfect.webp.asset.json";
import sapphireAsset from "@/assets/perfumes/sapphire.webp.asset.json";

export type Gender = "men" | "women" | "unisex";

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified?: boolean;
};

export type Perfume = {
  slug: string;
  name: string;
  gender: Gender;
  tagline: string;
  shortDescription: string;
  description: string;
  family: string;
  mood: string[];
  notes: { top: string[]; heart: string[]; base: string[] };
  longevity: "6–8 Hours" | "8–10 Hours" | "10+ Hours";
  projection: "Soft" | "Moderate" | "Strong";
  season: string[];
  occasion: string[];
  ingredients: string;
  directions: string;
  price: number;      // 50ml
  mrp: number;
  trialPrice: number; // 20ml
  rating: number;
  reviewCount: number;
  reviews: Review[];
  bestSeller?: boolean;
  featured?: boolean;
  image: string;
  seo: {
    title: string;
    description: string;
  };
};

const baseReviews = (slug: string): Review[] => [
  { id: `${slug}-r1`, name: "Aarav M.", rating: 5, date: "3 days ago", verified: true,
    text: "Incredible projection and longevity. Got compliments all night — this is my new signature." },
  { id: `${slug}-r2`, name: "Riya S.", rating: 5, date: "1 week ago", verified: true,
    text: "The packaging alone feels ₹3000. The scent? Genuinely premium. Worth every rupee." },
  { id: `${slug}-r3`, name: "Kabir V.", rating: 4, date: "2 weeks ago", verified: true,
    text: "Smells expensive without being loud. Perfect balance of warmth and freshness." },
];

export const perfumes: Perfume[] = [
  {
    slug: "midnight-oud",
    name: "Midnight Oud",
    gender: "men",
    tagline: "The scent of a room you weren't invited to.",
    shortDescription: "Smoked oud, saffron and dark amber — commanding, mysterious, unforgettable.",
    description:
      "Midnight Oud opens with a bright rush of saffron and pink pepper before settling into a heart of aged oud, patchouli and rose absolute. The dry-down is pure warmth: amber, sandalwood and a whisper of leather that stays on skin for the entire night. This is a fragrance for arrivals and exits — a scent that announces you long after you've left the room.",
    family: "Woody • Oud",
    mood: ["Confident", "Mysterious", "Nocturnal"],
    notes: {
      top: ["Saffron", "Pink Pepper", "Bergamot"],
      heart: ["Aged Oud", "Rose Absolute", "Patchouli"],
      base: ["Amber", "Sandalwood", "Soft Leather"],
    },
    longevity: "10+ Hours", projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Date Night", "Formal"],
    ingredients: "Alcohol Denat., Parfum (30%), Aqua, Aged Oud Oil, natural resins. IFRA 51 compliant. Cruelty-free.",
    directions: "Two sprays on pulse points — inner wrists, base of neck, behind ears. Do not rub. For maximum longevity, spray onto moisturized skin.",
    price: 1299, mrp: 1899, trialPrice: 349,
    rating: 4.9, reviewCount: 187, bestSeller: true, featured: true,
    reviews: baseReviews("midnight-oud"),
    image: midnightOudAsset.url,
    seo: {
      title: "Midnight Oud — Aged Oud Eau de Parfum | Luxoree",
      description: "Aged oud, saffron and amber. 10+ hour longevity. Strong projection. India's most-loved oud fragrance. Free delivery, cash on delivery available.",
    },
  },
  {
    slug: "afterhours",
    name: "Afterhours",
    gender: "men",
    tagline: "For the hours the city forgets.",
    shortDescription: "Smoked woods, black pepper and cardamom — nocturnal, magnetic, undeniably masculine.",
    description:
      "Afterhours is the fragrance of the quiet after the loud — cognac warmth, smoked cedar and a heart of iris and violet leaf, dried down with vetiver and tonka. It sits close to the skin at first, then slowly unfurls into something that people lean in to notice. Wear it when you don't need to try.",
    family: "Woody • Spicy",
    mood: ["Suave", "Nocturnal", "Refined"],
    notes: {
      top: ["Cognac Accord", "Black Pepper", "Cardamom"],
      heart: ["Iris", "Violet Leaf", "Smoked Cedar"],
      base: ["Vetiver", "Tonka Bean", "Ambergris"],
    },
    longevity: "8–10 Hours", projection: "Moderate",
    season: ["Autumn", "Winter", "Cool Spring"],
    occasion: ["Evening", "Dinner", "Bar"],
    ingredients: "Alcohol Denat., Parfum (25%), Aqua, natural essential oils. IFRA 51 compliant. Cruelty-free.",
    directions: "Two sprays — chest and neck. Layer with an unscented body oil for a longer stay.",
    price: 1199, mrp: 1699, trialPrice: 299,
    rating: 4.8, reviewCount: 142, bestSeller: true,
    reviews: baseReviews("afterhours"),
    image: afterhoursAsset.url,
    seo: {
      title: "Afterhours — Smoked Woods Eau de Parfum | Luxoree",
      description: "Cognac, smoked cedar and vetiver. An 8–10 hour nocturnal fragrance made for evening wear. Long-lasting, hand-blended in India.",
    },
  },
  {
    slug: "black-vanilla",
    name: "Black Vanilla",
    gender: "unisex",
    tagline: "Sweet warmth wrapped in shadow.",
    shortDescription: "Madagascar vanilla, roasted tonka and dark benzoin — a gourmand with depth.",
    description:
      "Black Vanilla is not the vanilla you know. This is vanilla the way it exists in a whisky bar at 2AM — deep, resinous, laced with tobacco leaf and warm benzoin. Coffee bean and pink pepper cut through the sweetness at the top; the base is pure addiction: tonka, sandalwood and a soft plume of birch smoke.",
    family: "Gourmand • Amber",
    mood: ["Cozy", "Addictive", "Warm"],
    notes: {
      top: ["Coffee Bean", "Pink Pepper", "Bergamot"],
      heart: ["Madagascar Vanilla", "Tobacco Leaf", "Tonka"],
      base: ["Benzoin", "Sandalwood", "Birch Smoke"],
    },
    longevity: "8–10 Hours", projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Date Night", "Cozy Evenings", "Weekend"],
    ingredients: "Alcohol Denat., Parfum (27%), Aqua, Madagascar vanilla absolute, natural resins. IFRA 51 compliant. Cruelty-free.",
    directions: "One or two sprays are enough — Black Vanilla carries. Best on skin after a warm shower.",
    price: 1249, mrp: 1799, trialPrice: 349,
    rating: 4.9, reviewCount: 208, bestSeller: true, featured: true,
    reviews: baseReviews("black-vanilla"),
    image: blackVanillaAsset.url,
    seo: {
      title: "Black Vanilla — Gourmand Eau de Parfum | Luxoree",
      description: "Madagascar vanilla, tobacco leaf and benzoin. A rich, addictive gourmand for cool weather. 8–10 hours. Free delivery in India.",
    },
  },
  {
    slug: "legacy-7",
    name: "Legacy-7",
    gender: "men",
    tagline: "Seven notes. One long-standing signature.",
    shortDescription: "Bergamot, oud wood and amber — a modern classic built to be worn every day.",
    description:
      "Legacy-7 is the fragrance you reach for on the mornings that matter. Bright bergamot and lemon at the opening give way to a heart of geranium, oud wood and cardamom, drying down to amber, cedar and clean musk. It's confident without shouting — the scent of someone who's been doing this for a while.",
    family: "Aromatic • Woody",
    mood: ["Classic", "Professional", "Timeless"],
    notes: {
      top: ["Bergamot", "Sicilian Lemon", "Ginger"],
      heart: ["Geranium", "Oud Wood", "Cardamom"],
      base: ["Amber", "Cedar", "White Musk"],
    },
    longevity: "8–10 Hours", projection: "Moderate",
    season: ["All Seasons"],
    occasion: ["Office", "Meetings", "Daily Wear"],
    ingredients: "Alcohol Denat., Parfum (24%), Aqua, natural bergamot and cedar oils. IFRA 51 compliant.",
    directions: "Two sprays on pulse points before dressing. Reapply once at midday if needed.",
    price: 1149, mrp: 1599, trialPrice: 299,
    rating: 4.7, reviewCount: 124, featured: true,
    reviews: baseReviews("legacy-7"),
    image: legacy7Asset.url,
    seo: {
      title: "Legacy-7 — Everyday Aromatic Eau de Parfum | Luxoree",
      description: "Bergamot, oud wood and amber. A refined all-day fragrance for professional wear. 8–10 hours longevity. Cash on delivery available.",
    },
  },
  {
    slug: "marine",
    name: "Marine",
    gender: "unisex",
    tagline: "Salt air. Blue horizon. First light.",
    shortDescription: "Sea salt, neroli and driftwood — clean, fresh, unmistakably premium.",
    description:
      "Marine bottles the first fifteen minutes of a morning by the water. Sea salt, mint and grapefruit open the composition with a cool clarity, followed by a heart of neroli, lavender and jasmine. The base of driftwood, ambergris and white musk gives it the depth that separates a premium marine from a cheap aquatic — this is the good kind.",
    family: "Aquatic • Fresh",
    mood: ["Fresh", "Uplifting", "Clean"],
    notes: {
      top: ["Sea Salt", "Mint", "Pink Grapefruit"],
      heart: ["Neroli", "Lavender", "Jasmine"],
      base: ["Driftwood", "Ambergris", "White Musk"],
    },
    longevity: "6–8 Hours", projection: "Moderate",
    season: ["Spring", "Summer"],
    occasion: ["Daily Wear", "Travel", "Beach", "Office"],
    ingredients: "Alcohol Denat., Parfum (22%), Aqua, natural neroli oil, marine accord. IFRA 51 compliant.",
    directions: "Three sprays — chest, neck, wrists. Reapply mid-afternoon in summer heat.",
    price: 1099, mrp: 1499, trialPrice: 249,
    rating: 4.7, reviewCount: 156,
    reviews: baseReviews("marine"),
    image: marineAsset.url,
    seo: {
      title: "Marine — Fresh Aquatic Eau de Parfum | Luxoree",
      description: "Sea salt, neroli and driftwood. A clean, premium aquatic for spring and summer. 6–8 hour wear. Long-lasting, hand-blended in India.",
    },
  },
  {
    slug: "sapphire",
    name: "Sapphire",
    gender: "unisex",
    tagline: "Cool, cut, unmistakable.",
    shortDescription: "Cardamom, iris and blue cypress — sharp, refined, quietly magnetic.",
    description:
      "Sapphire is the fragrance of clean lines and cold light. Cardamom and pink pepper cut through the opening, followed by iris butter, blue cypress and a whisper of geranium. The dry-down settles into ambroxan, cashmere musk and pale wood — a modern architecture of a scent that reads as expensive from three feet away.",
    family: "Woody • Aromatic",
    mood: ["Modern", "Cool", "Understated"],
    notes: {
      top: ["Cardamom", "Pink Pepper", "Mandarin"],
      heart: ["Iris Butter", "Blue Cypress", "Geranium"],
      base: ["Ambroxan", "Cashmere Musk", "Pale Wood"],
    },
    longevity: "8–10 Hours", projection: "Moderate",
    season: ["All Seasons"],
    occasion: ["Office", "Daily Wear", "Casual Dinner"],
    ingredients: "Alcohol Denat., Parfum (25%), Aqua, iris butter, ambroxan. IFRA 51 compliant. Cruelty-free.",
    directions: "Two sprays on pulse points. Sapphire projects at arm's length — no need to overspray.",
    price: 1199, mrp: 1699, trialPrice: 299,
    rating: 4.8, reviewCount: 134, featured: true,
    reviews: baseReviews("sapphire"),
    image: sapphireAsset.url,
    seo: {
      title: "Sapphire — Iris & Cypress Eau de Parfum | Luxoree",
      description: "Cardamom, iris butter and ambroxan. A modern, refined signature for daily wear. Long-lasting 8–10 hours. Premium fragrance made in India.",
    },
  },
  {
    slug: "perfect",
    name: "Perfect",
    gender: "women",
    tagline: "The one you'll wear on the day everything matters.",
    shortDescription: "Peony, jasmine sambac and cashmere musk — romantic, radiant, effortlessly feminine.",
    description:
      "Perfect is a bright bouquet of peony and Italian bergamot, a heart of jasmine sambac and Bulgarian rose, drying down to cashmere musk, blonde woods and a hint of vanilla. It is the fragrance equivalent of a perfectly cut white silk dress — quietly, unmistakably beautiful.",
    family: "Floral • Musk",
    mood: ["Romantic", "Radiant", "Feminine"],
    notes: {
      top: ["Peony", "Italian Bergamot", "Pear"],
      heart: ["Jasmine Sambac", "Bulgarian Rose", "Magnolia"],
      base: ["Cashmere Musk", "Blonde Woods", "Vanilla Bourbon"],
    },
    longevity: "8–10 Hours", projection: "Moderate",
    season: ["Spring", "Summer", "Autumn"],
    occasion: ["Date Night", "Weddings", "Daily Wear"],
    ingredients: "Alcohol Denat., Parfum (26%), Aqua, jasmine sambac absolute, rose oil. IFRA 51 compliant.",
    directions: "Two sprays on pulse points. Spritz once into hair for a soft trail.",
    price: 1249, mrp: 1799, trialPrice: 349,
    rating: 4.9, reviewCount: 219, bestSeller: true, featured: true,
    reviews: baseReviews("perfect"),
    image: perfectAsset.url,
    seo: {
      title: "Perfect — Jasmine & Rose Eau de Parfum | Luxoree",
      description: "Peony, jasmine sambac and cashmere musk. A radiant floral for romantic wear. 8–10 hours. India's favourite feminine fragrance.",
    },
  },
  {
    slug: "addiction",
    name: "Addiction",
    gender: "women",
    tagline: "Sweet, dark, and impossible to walk past.",
    shortDescription: "Bulgarian rose, saffron and vanilla — sensual, warm, deeply addictive.",
    description:
      "Addiction opens with saffron, raspberry and a spike of pink pepper before revealing a heart of Bulgarian rose, ylang-ylang and orange blossom. The base is what earns its name — vanilla, patchouli, benzoin and a soft plume of oud. Wear when you want to be remembered.",
    family: "Floral • Amber",
    mood: ["Sensual", "Bold", "Addictive"],
    notes: {
      top: ["Saffron", "Raspberry", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Ylang-Ylang", "Orange Blossom"],
      base: ["Vanilla", "Patchouli", "Benzoin", "Oud"],
    },
    longevity: "10+ Hours", projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Date Night", "Evening", "Special Occasions"],
    ingredients: "Alcohol Denat., Parfum (28%), Aqua, Bulgarian rose absolute, oud. IFRA 51 compliant.",
    directions: "One spray is enough — Addiction is intense. Two if you want to be impossible to forget.",
    price: 1299, mrp: 1899, trialPrice: 349,
    rating: 4.9, reviewCount: 176, bestSeller: true,
    reviews: baseReviews("addiction"),
    image: addictionAsset.url,
    seo: {
      title: "Addiction — Rose, Saffron & Vanilla Eau de Parfum | Luxoree",
      description: "Saffron, Bulgarian rose and vanilla. A sensual, long-lasting fragrance for evening wear. 10+ hours longevity. Free delivery in India.",
    },
  },
];

export const bySlug = (slug: string) => perfumes.find((p) => p.slug === slug);
export const bestSellers = () => perfumes.filter((p) => p.bestSeller);
export const featured = () => perfumes.filter((p) => p.featured);
export const byGender = (g: Gender) => perfumes.filter((p) => p.gender === g);
