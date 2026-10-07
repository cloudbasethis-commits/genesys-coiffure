/* =========================================================
   GENESYS COIFFURE — catalogue boutique (données)
   ---------------------------------------------------------
   Pour modifier la boutique : édite ce fichier.
   - cat : "soins" | "extensions" | "accessoires"
   - price : nombre en euros (ex: 14.90)
   - img : chemin de la photo (remplace par ta vraie photo produit)
   - featured : true = mis en avant sur la page d'accueil
   ========================================================= */
window.GENESYS_SHOP = {
  categories: [
    { key: "all",          fr: "Tout",                 en: "All" },
    { key: "soins",        fr: "Soins capillaires",    en: "Hair care" },
    { key: "extensions",   fr: "Extensions & tresses", en: "Extensions & braids" },
    { key: "accessoires",  fr: "Accessoires",          en: "Accessories" }
  ],
  products: [
    // --- Soins capillaires ---
    { id: "masque-karite", cat: "soins", price: 14.90, featured: true,
      img: "assets/images/shop/shop-soins.jpg",
      name: "Masque hydratant au karité",
      desc: "Masque nourrissant intense pour cheveux crépus et bouclés.",
      descEn: "Intense nourishing mask for coily and curly hair." },
    { id: "huile-ricin", cat: "soins", price: 9.90,
      img: "assets/images/shop/shop-soins.jpg",
      name: "Huile de ricin pure — 100 ml",
      desc: "Fortifie, nourrit et favorise la pousse. Idéale pour les contours.",
      descEn: "Strengthens, nourishes and boosts growth. Ideal for edges." },
    { id: "lait-boucles", cat: "soins", price: 12.90,
      img: "assets/images/shop/shop-soins.jpg",
      name: "Lait coiffant définition boucles",
      desc: "Définit les boucles et apporte de la souplesse, sans effet carton.",
      descEn: "Defines curls and adds softness, no crunch." },
    { id: "shampooing-doux", cat: "soins", price: 11.90,
      img: "assets/images/shop/shop-soins.jpg",
      name: "Shampooing doux sans sulfate",
      desc: "Lave en douceur sans dessécher la fibre. Pour un usage régulier.",
      descEn: "Gently cleanses without drying. For regular use." },
    { id: "spray-hydra", cat: "soins", price: 8.90,
      img: "assets/images/shop/shop-soins.jpg",
      name: "Spray hydratant quotidien",
      desc: "Réveille les boucles entre deux lavages. À vaporiser au réveil.",
      descEn: "Revives curls between washes. Spritz in the morning." },

    // --- Extensions & tresses ---
    { id: "meches-kanekalon", cat: "extensions", price: 6.90, featured: true,
      img: "assets/images/shop/shop-extensions.jpg",
      name: "Mèches Kanekalon (lot de 3)",
      desc: "Mèches souples et brillantes pour box braids et twists.",
      descEn: "Soft, glossy hair for box braids and twists." },
    { id: "crochet-braids", cat: "extensions", price: 15.90,
      img: "assets/images/shop/shop-extensions.jpg",
      name: "Crochet braids pré-bouclées",
      desc: "Pose rapide, rendu naturel et volumineux.",
      descEn: "Quick to install, natural and voluminous look." },
    { id: "tissage-naturel", cat: "extensions", price: 39.90,
      img: "assets/images/shop/shop-extensions.jpg",
      name: "Tissage naturel 100 % humain",
      desc: "Cheveux naturels de qualité, colorables et coiffables.",
      descEn: "Quality human hair, can be dyed and styled." },
    { id: "twists-senegalais", cat: "extensions", price: 18.90,
      img: "assets/images/shop/shop-extensions.jpg",
      name: "Twists sénégalais prêts-à-poser",
      desc: "Pré-torsadés, gain de temps garanti pour un style net.",
      descEn: "Pre-twisted, a real time-saver for a clean style." },

    // --- Accessoires ---
    { id: "bonnet-satin", cat: "accessoires", price: 7.90, featured: true,
      img: "assets/images/shop/shop-accessoires.jpg",
      name: "Bonnet satin nuit",
      desc: "Protège vos coiffures et préserve l'hydratation la nuit.",
      descEn: "Protects your style and retains moisture overnight." },
    { id: "taie-satin", cat: "accessoires", price: 12.90,
      img: "assets/images/shop/shop-accessoires.jpg",
      name: "Taie d'oreiller en satin",
      desc: "Réduit la casse et les frisottis. Douce pour la peau aussi.",
      descEn: "Reduces breakage and frizz. Gentle on skin too." },
    { id: "peigne-tresser", cat: "accessoires", price: 4.90,
      img: "assets/images/shop/shop-accessoires.jpg",
      name: "Peigne à queue + pics à tresser",
      desc: "Pour des séparations nettes et des tresses précises.",
      descEn: "For clean partings and precise braids." }
  ]
};
