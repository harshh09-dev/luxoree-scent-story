import midnightOud from "@/assets/perfumes/midnight-oud.jpg";
import royalCedar from "@/assets/perfumes/royal-cedar.jpg";
import velvetNoir from "@/assets/perfumes/velvet-noir.jpg";
import urbanLegend from "@/assets/perfumes/urban-legend.jpg";
import onyxReserve from "@/assets/perfumes/onyx-reserve.jpg";
import bloomEssence from "@/assets/perfumes/bloom-essence.jpg";
import velvetRose from "@/assets/perfumes/velvet-rose.jpg";
import amberSilk from "@/assets/perfumes/amber-silk.jpg";
import peonyDusk from "@/assets/perfumes/peony-dusk.jpg";
import ivoryMuse from "@/assets/perfumes/ivory-muse.jpg";
import oceanBreeze from "@/assets/perfumes/ocean-breeze.jpg";
import goldenDune from "@/assets/perfumes/golden-dune.jpg";
import smokeVanilla from "@/assets/perfumes/smoke-vanilla.jpg";
import whiteIris from "@/assets/perfumes/white-iris.jpg";
import nomad from "@/assets/perfumes/nomad.jpg";

export type Gender = "men" | "women" | "unisex";

export type Perfume = {
  slug: string;
  name: string;
  gender: Gender;
  tagline: string;
  description: string;
  family: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  longevity: "6–8 Hours" | "8–10 Hours";
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
  bestSeller?: boolean;
  featured?: boolean;
  isNew?: boolean;
  image: string;
};

export const perfumes: Perfume[] = [
  {
    slug: "midnight-oud",
    name: "Midnight Oud",
    gender: "men",
    tagline: "Bold, mysterious, unforgettable.",
    description:
      "A commanding blend of rich oud and warm spices, wrapped in a veil of dark amber. Midnight Oud is a fragrance for the man who arrives without announcement — and lingers long after he leaves.",
    family: "Woody • Oud",
    notes: {
      top: ["Saffron", "Nutmeg", "Bergamot"],
      heart: ["Oud", "Patchouli", "Geranium"],
      base: ["Amber", "Musk", "Sandalwood"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Party", "Winter dates"],
    ingredients: "Alcohol Denat., Parfum, Aqua, natural essential oils, IFRA compliant.",
    directions: "Spray on pulse points — wrists, neck, chest. Do not rub. Store cool, away from sunlight.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.9, reviewCount: 168, bestSeller: true, featured: true,
    image: midnightOud,
  },
  {
    slug: "royal-cedar",
    name: "Royal Cedar",
    gender: "men",
    tagline: "Woody warmth with a regal edge.",
    description:
      "Fresh cedar meets smoky vetiver and creamy sandalwood. Royal Cedar is refined masculinity — the scent of quiet confidence.",
    family: "Woody • Spicy",
    notes: {
      top: ["Cedar", "Cardamom", "Pink Pepper"],
      heart: ["Vetiver", "Iris", "Cypress"],
      base: ["Sandalwood", "Tonka", "Vanilla"],
    },
    longevity: "6–8 Hours",
    projection: "Moderate",
    season: ["All Seasons"],
    occasion: ["Office", "Daily wear"],
    ingredients: "Alcohol Denat., Parfum, Aqua, natural cedar oil, IFRA compliant.",
    directions: "Two sprays on pulse points. Layer with body oil for longer wear.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.7, reviewCount: 98, bestSeller: true,
    image: royalCedar,
  },
  {
    slug: "velvet-noir",
    name: "Velvet Noir",
    gender: "men",
    tagline: "Sweet warmth wrapped in shadow.",
    description:
      "Tonka bean and dark chocolate laced with tobacco and leather. Velvet Noir is a slow, seductive fragrance — plush, intimate, and unmistakably premium.",
    family: "Amber • Sweet",
    notes: {
      top: ["Bergamot", "Cinnamon"],
      heart: ["Tonka Bean", "Dark Chocolate", "Tobacco"],
      base: ["Leather", "Amber", "Vanilla"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Date night", "Evening"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "One or two sprays are enough — this fragrance is intense.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.6, reviewCount: 76, featured: true,
    image: velvetNoir,
  },
  {
    slug: "urban-legend",
    name: "Urban Legend",
    gender: "men",
    tagline: "Smoked leather. City lights.",
    description:
      "Charcoal-smoked leather, black pepper and a whisper of iris. Urban Legend is the scent of late-night walks through empty city streets — cool, sharp, alive.",
    family: "Leather • Smoky",
    notes: {
      top: ["Black Pepper", "Grapefruit"],
      heart: ["Leather", "Iris", "Violet"],
      base: ["Smoked Wood", "Musk", "Ambergris"],
    },
    longevity: "6–8 Hours",
    projection: "Moderate",
    season: ["Autumn", "Winter", "Spring"],
    occasion: ["Casual", "Weekend"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Spray on clothing and pulse points for the smokiest projection.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.5, reviewCount: 54, isNew: true,
    image: urbanLegend,
  },
  {
    slug: "onyx-reserve",
    name: "Onyx Reserve",
    gender: "men",
    tagline: "Rare, dense, distinguished.",
    description:
      "The house's most intense masculine composition. Deep resins, precious woods and a heart of black orchid. Reserved for the rarest of moments.",
    family: "Oriental • Woody",
    notes: {
      top: ["Elemi", "Bergamot"],
      heart: ["Black Orchid", "Rose Absolute", "Frankincense"],
      base: ["Oud", "Amber Resin", "Musk"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Winter"],
    occasion: ["Formal", "Special evenings"],
    ingredients: "Alcohol Denat., Parfum, Aqua, natural resins, IFRA compliant.",
    directions: "One spray. Trust it.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.8, reviewCount: 89,
    image: onyxReserve,
  },
  {
    slug: "bloom-essence",
    name: "Bloom Essence",
    gender: "women",
    tagline: "Floral, radiant, forever in bloom.",
    description:
      "A sunlit bouquet of peony, rose and jasmine, softened by musk and warm woods. Bloom Essence is femininity in full flower — bright, generous, alive.",
    family: "Floral • Fresh",
    notes: {
      top: ["Peony", "Pear", "Bergamot"],
      heart: ["Rose", "Jasmine", "Lily"],
      base: ["White Musk", "Cedarwood", "Amber"],
    },
    longevity: "6–8 Hours",
    projection: "Moderate",
    season: ["Spring", "Summer"],
    occasion: ["Daily wear", "Brunch", "Daytime"],
    ingredients: "Alcohol Denat., Parfum, Aqua, natural florals, IFRA compliant.",
    directions: "Spray on wrists and neck. Let the top notes settle.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.8, reviewCount: 210, bestSeller: true, featured: true,
    image: bloomEssence,
  },
  {
    slug: "velvet-rose",
    name: "Velvet Rose",
    gender: "women",
    tagline: "Dark rose. Deep desire.",
    description:
      "Bulgarian rose absolute layered over raspberry, saffron and oud. Velvet Rose is romantic without ever being sweet — a fragrance with a pulse.",
    family: "Floral • Oriental",
    notes: {
      top: ["Raspberry", "Saffron"],
      heart: ["Bulgarian Rose", "Turkish Rose", "Violet"],
      base: ["Oud", "Patchouli", "Musk"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Date night", "Evening"],
    ingredients: "Alcohol Denat., Parfum, Aqua, rose absolute, IFRA compliant.",
    directions: "Spray, do not rub. Let the rose bloom.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.9, reviewCount: 145, bestSeller: true,
    image: velvetRose,
  },
  {
    slug: "amber-silk",
    name: "Amber Silk",
    gender: "women",
    tagline: "Warm amber wrapped in silk.",
    description:
      "Honey, amber and vanilla poured over creamy sandalwood. Amber Silk is a warm-skin fragrance — golden, close, and endlessly wearable.",
    family: "Amber • Warm",
    notes: {
      top: ["Honey", "Mandarin"],
      heart: ["Amber", "Benzoin", "Iris"],
      base: ["Sandalwood", "Vanilla", "Tonka"],
    },
    longevity: "8–10 Hours",
    projection: "Moderate",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Cozy nights"],
    ingredients: "Alcohol Denat., Parfum, Aqua, amber resin, IFRA compliant.",
    directions: "Layer on skin. Perfect after a shower.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.7, reviewCount: 132,
    image: amberSilk,
  },
  {
    slug: "peony-dusk",
    name: "Peony Dusk",
    gender: "women",
    tagline: "The hour just before nightfall.",
    description:
      "Fresh peony, dewy magnolia and a whisper of pink pepper, drying down to soft cashmeran. Peony Dusk is delicate but never quiet.",
    family: "Floral • Fresh",
    notes: {
      top: ["Pink Pepper", "Pear"],
      heart: ["Peony", "Magnolia", "Freesia"],
      base: ["Cashmeran", "White Musk", "Cedar"],
    },
    longevity: "6–8 Hours",
    projection: "Soft",
    season: ["Spring"],
    occasion: ["Daily wear", "Office"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Two or three sprays on pulse points and hair.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.6, reviewCount: 88, isNew: true,
    image: peonyDusk,
  },
  {
    slug: "ivory-muse",
    name: "Ivory Muse",
    gender: "women",
    tagline: "Cream. Cashmere. Quiet luxury.",
    description:
      "Iris butter, magnolia and white musk on a soft bed of vanilla and sandalwood. Ivory Muse is the fragrance equivalent of a cashmere scarf — refined, understated, unforgettable.",
    family: "Floral • Musk",
    notes: {
      top: ["Magnolia", "Bergamot"],
      heart: ["Iris", "Orris", "Tuberose"],
      base: ["Vanilla", "Sandalwood", "White Musk"],
    },
    longevity: "6–8 Hours",
    projection: "Soft",
    season: ["All Seasons"],
    occasion: ["Office", "Everyday elegance"],
    ingredients: "Alcohol Denat., Parfum, Aqua, iris butter, IFRA compliant.",
    directions: "Spray generously — Ivory Muse sits close to the skin.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.7, reviewCount: 104,
    image: ivoryMuse,
  },
  {
    slug: "ocean-breeze",
    name: "Ocean Breeze",
    gender: "unisex",
    tagline: "Salt air. Blue horizon.",
    description:
      "Sea salt, bergamot and neroli lifted by driftwood and clean musks. Ocean Breeze is that first morning by the water — fresh, weightless, alive.",
    family: "Aquatic • Fresh",
    notes: {
      top: ["Sea Salt", "Bergamot", "Grapefruit"],
      heart: ["Neroli", "Marine Accord", "Jasmine"],
      base: ["Driftwood", "White Musk", "Ambergris"],
    },
    longevity: "6–8 Hours",
    projection: "Moderate",
    season: ["Spring", "Summer"],
    occasion: ["Daily wear", "Travel"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Spray liberally. Reapply after long days.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.8, reviewCount: 124, bestSeller: true, featured: true,
    image: oceanBreeze,
  },
  {
    slug: "golden-dune",
    name: "Golden Dune",
    gender: "unisex",
    tagline: "Warm sand. Golden hour.",
    description:
      "Sun-baked amber, dry woods and a hint of tobacco. Golden Dune is a warm, sensual fragrance that wears equally beautifully on any skin.",
    family: "Amber • Woody",
    notes: {
      top: ["Amber", "Cardamom"],
      heart: ["Tobacco Leaf", "Iris", "Suede"],
      base: ["Sandalwood", "Vanilla", "Musk"],
    },
    longevity: "8–10 Hours",
    projection: "Moderate",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Travel"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Spray on pulse points. Warms with body heat.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.7, reviewCount: 91,
    image: goldenDune,
  },
  {
    slug: "smoke-and-vanilla",
    name: "Smoke & Vanilla",
    gender: "unisex",
    tagline: "Cozy, smoky, comforting.",
    description:
      "Madagascar vanilla threaded with birch smoke, tonka and coffee. Smoke & Vanilla is a modern gourmand — warm, addictive, unisex.",
    family: "Gourmand • Smoky",
    notes: {
      top: ["Coffee", "Pink Pepper"],
      heart: ["Vanilla Bean", "Birch Smoke", "Tonka"],
      base: ["Cedar", "Benzoin", "Musk"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Cozy nights"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Two sprays. This one carries.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.9, reviewCount: 178, bestSeller: true,
    image: smokeVanilla,
  },
  {
    slug: "white-iris",
    name: "White Iris",
    gender: "unisex",
    tagline: "Cool iris. Powdered elegance.",
    description:
      "Powdery iris, green violet leaf and a soft ambrette seed base. White Iris is understated luxury — the kind of scent someone leans in to ask about.",
    family: "Floral • Powdery",
    notes: {
      top: ["Violet Leaf", "Bergamot"],
      heart: ["Iris", "Orris Butter", "Neroli"],
      base: ["Ambrette Seed", "White Musk", "Cedar"],
    },
    longevity: "6–8 Hours",
    projection: "Soft",
    season: ["Spring", "Summer"],
    occasion: ["Office", "Daily wear"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Spray on clothing and skin. Best on cool days.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.6, reviewCount: 72,
    image: whiteIris,
  },
  {
    slug: "nomad",
    name: "Nomad",
    gender: "unisex",
    tagline: "Leather, spice, worn roads.",
    description:
      "Suede-soft leather, saffron and dried fruits over a base of amber and myrrh. Nomad is a traveler's fragrance — warm, wanderlust, well-worn.",
    family: "Leather • Amber",
    notes: {
      top: ["Saffron", "Cinnamon", "Cardamom"],
      heart: ["Leather", "Dried Fig", "Rose"],
      base: ["Amber", "Myrrh", "Sandalwood"],
    },
    longevity: "8–10 Hours",
    projection: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Travel", "Evening"],
    ingredients: "Alcohol Denat., Parfum, Aqua, IFRA compliant.",
    directions: "Layer on skin and clothing for the full leather story.",
    price: 349, mrp: 499, trialPrice: 99,
    rating: 4.8, reviewCount: 116, isNew: true,
    image: nomad,
  },
];

export const bySlug = (slug: string) => perfumes.find((p) => p.slug === slug);
export const bestSellers = () => perfumes.filter((p) => p.bestSeller);
export const featured = () => perfumes.filter((p) => p.featured);
export const newArrivals = () => perfumes.filter((p) => p.isNew);
export const byGender = (g: Gender) => perfumes.filter((p) => p.gender === g);
