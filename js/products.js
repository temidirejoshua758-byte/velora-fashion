const PRODUCTS = [
  {
    id: 1, name: "Noir Tailored Blazer", price: 85000, category: "Women", badge: "New",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
    description: "A clean, structured blazer with a relaxed modern cut. Designed to move from day to evening.",
    sizes: ["S","M","L","XL"]
  },
  {
    id: 2, name: "Lumi Satin Dress", price: 72000, category: "Women", badge: "New",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
    description: "Fluid satin, a softly defined waist and an elegant drape made for effortless occasions.",
    sizes: ["S","M","L"]
  },
  {
    id: 3, name: "Aureum Oversized Shirt", price: 42000, category: "Men", badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85",
    description: "A premium oversized shirt with a crisp finish and easy proportions.",
    sizes: ["M","L","XL","XXL"]
  },
  {
    id: 4, name: "Linea Wide-Leg Trouser", price: 48000, category: "Essentials",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
    description: "A high-rise wide-leg silhouette designed to pair with everything.",
    sizes: ["S","M","L","XL"]
  },
  {
    id: 5, name: "Sable Leather Bag", price: 68000, category: "Accessories", badge: "Limited",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    description: "A structured everyday bag with understated hardware and generous room.",
    sizes: ["One Size"]
  },
  {
    id: 6, name: "Cielo Knit Top", price: 36000, category: "Women", badge: "",
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1000&q=85",
    description: "A soft fitted knit with a clean neckline and versatile styling.",
    sizes: ["S","M","L"]
  },
  {
    id: 7, name: "Form Overshirt", price: 52000, category: "Men", badge: "",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85",
    description: "A versatile overshirt cut with a contemporary relaxed fit.",
    sizes: ["M","L","XL"]
  },
  {
    id: 8, name: "Aura Minimal Watch", price: 55000, category: "Accessories", badge: "",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
    description: "Minimal proportions and a refined finish for everyday wear.",
    sizes: ["One Size"]
  }
];

const formatNaira = value => new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0
}).format(value);
