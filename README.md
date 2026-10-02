# Genesys Coiffure — site vitrine

Site vitrine premium (statique) pour **Genesys Coiffure**, salon de coiffure afro‑caribéen à La Ferté‑Alais.
Direction artistique « chic & doré » : noir profond + or/champagne, typographie éditoriale (Fraunces + Jost),
animations GSAP, bilingue **FR / EN**, galerie des vraies réalisations du salon, et **réservation en ligne**.

## 🚀 Mettre le site en ligne

Le site est 100 % statique (HTML/CSS/JS) — aucun build nécessaire.

- **Test local** : ouvrez `index.html` dans un navigateur. Pour que la carte Google et les polices
  se chargent parfaitement, servez le dossier en HTTP (ex. `npx serve .` puis ouvrez l'adresse affichée).
- **Mise en ligne gratuite** :
  - **Netlify** / **Vercel** : glissez-déposez le dossier `genesys-coiffure` → le site est en ligne.
  - **GitHub Pages** : poussez le dossier, activez Pages sur la branche.
  - **OVH / hébergeur classique** : envoyez tout le dossier par FTP à la racine `www`.

## ✏️ Personnaliser (l'essentiel est regroupé en haut de `js/main.js`)

```js
var CONFIG = {
  bookingUrl:     "https://digablopos.fr/book/genesys",          // réservation en ligne
  whatsappNumber: "33777782055",                                // format international, sans "+"
  instagramUrl:   "https://www.instagram.com/genesys_coiffure",
  tiktokUrl:      ""                                            // vide = le bouton est masqué
};
```

- **Changer le numéro WhatsApp** : modifiez `whatsappNumber` (ex. `33623228831` pour le 06 23 22 88 31).
- **Ajouter TikTok** : renseignez `tiktokUrl` → le bouton réapparaît automatiquement.
- **Réservation** : tous les boutons « Réserver » / « Prendre rendez‑vous » ouvrent `bookingUrl` dans un nouvel onglet.
  > L'embed en iframe est **impossible** : la page Digablopos interdit l'affichage dans un autre site
  > (en-tête de sécurité `frame-ancestors`). Le lien/bouton est donc la bonne solution.

## 🌍 Textes bilingues

Tous les textes sont dans **`js/i18n.js`** (objets `fr` et `en`). Pour modifier un texte, éditez la valeur
correspondante dans **les deux** langues. La langue par défaut est le français ; le choix du visiteur est mémorisé.

## 🖼️ Images

Dossier `assets/images/` :
- `hero.jpg`, `hero-2.jpg` — grande image d'accueil (photos premium libres de droits, Pexels).
- `service-*.jpg` — vignettes des prestations.
- `salon-interior.jpg` — section « Le salon ».
- `ig/ig-01.jpg … ig-12.jpg` — **vraies photos du salon** (récupérées depuis Instagram) utilisées dans la galerie.

Pour remplacer une image : déposez votre fichier au même nom, ou changez le chemin dans `index.html`.
> Les photos de la galerie viennent d'Instagram en 640 px (parfait pour la grille). Pour l'image d'accueil
> en plein écran, une photo haute définition (≥ 1600 px) donne le meilleur rendu — envoyez-la si vous l'avez.

## 💶 Tarifs

Les tarifs de la section « Tarifs » sont **indicatifs** (basés sur les prix de départ connus) et affichés
avec la mention « dès … ». Transmettez votre grille tarifaire exacte pour la finaliser — elle se modifie
dans `index.html` (section `#pricing`) et `js/i18n.js`.

## 📝 Blog / Journal

Le blog (conseils sur l'entretien des cheveux afro) est 100 % statique :

- `blog.html` — la page qui liste tous les articles.
- `blog/*.html` — un fichier par article (ex. `blog/routine-hydratation.html`).
- Une section « Journal » sur l'accueil (`#journal`) met en avant 3 articles.

**Ajouter un article** :
1. Dupliquez un fichier existant de `blog/` et renommez-le (ex. `blog/entretien-locks.html`).
2. Modifiez le titre, le `<meta description>`, l'image de bannière et le contenu dans `<div class="article__body">`.
3. Ajoutez une carte vers l'article dans `blog.html` (et, si vous voulez, dans la section `#journal` de `index.html`) en copiant un bloc `.post-card`.

> Le contenu des articles est rédigé en français (public principal). L'habillage du site reste bilingue.
> Pour une version anglaise d'un article, créez un fichier dédié et ajoutez le sélecteur de langue si besoin.

## 📌 À confirmer / pistes d'amélioration

- [x] ~~Numéro de téléphone~~ → **06 23 22 88 31** (Instagram) utilisé partout.
- [ ] Grille tarifaire exacte.
- [ ] Photo d'accueil haute définition (optionnel).
- [x] ~~Lien TikTok~~ → **@genesys.coiffure** ajouté.
- [ ] Ajouter de vrais avis clients (Google / témoignages).
- [ ] Intégrer les vidéos Instagram (carrousel de reels) si souhaité.

## 🗂️ Structure

```
genesys-coiffure/
├── index.html        # page principale (attributs data-i18n pour la traduction)
├── blog.html         # liste des articles du Journal
├── blog/             # articles (un fichier HTML par article)
│   ├── routine-hydratation.html
│   ├── coiffures-protectrices.html
│   └── soin-cuir-chevelu.html
├── css/styles.css    # design (tokens de couleur/typo en haut du fichier)
├── js/
│   ├── i18n.js       # tous les textes FR / EN
│   └── main.js       # config + animations + interactions
└── assets/
    ├── favicon.svg
    └── images/       # photos (dont ig/ = vraies réalisations Instagram)
```

Technos : GSAP + ScrollTrigger (animations), Lenis (défilement fluide), Google Fonts. Aucune dépendance à installer.
Accessibilité : navigation clavier, `prefers-reduced-motion` respecté, contrastes soignés, liens d'évitement.
