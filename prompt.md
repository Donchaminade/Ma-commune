# Directives de Prompt pour Recréer ce Rendu "Glassmorphism & Dark Premium"

Vous trouverez ci-dessous le guide stylistique et le prompt de référence complet pour reproduire fidèlement l'interface haut de gamme de l'application **Ma Ville** avec ses effets vitrés, ses animations fluides au scroll et sa structure moderne.

---

## 🎨 Conception Visuelle & Palette de Couleurs

L'interface utilise un thème **Sombre Premium / Minuit Épuré** qui fait ressortir les reflets de verre (Glassmorphism) :

*   **Arrière-plan Principal :** Un dégradé progressif allant de `zinc-950` à un bleu nuit cobalt (`#1e2436` ou `#181E30`), puis retournant au `zinc-950`.
*   **Contraste Épuré :** Remplacement de tous les blocs clairs d'origine par des panneaux d'un noir profond translucide, encadrés de micro-bordures blanches à très faible opacité (`border-white/5` ou `border-white/10`).
*   **Couleurs d'Accentuation :** Indigo lumineux (`indigo-500`, `#A5B4FC`), bleu électrique discret, et vert émeraude léger pour les alertes positives.

---

## ✨ Effets de Verre (Glassmorphism)

Pour obtenir cet aspect de "verre dépoli" réaliste, appliquez les classes de composition Tailwind suivantes :

```html
bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg /* Pour les capsules claires */
bg-zinc-900/90 backdrop-blur-md border border-white/10 shadow-2xl /* Pour les cartes sombres vitrées */
bg-zinc-950/80 backdrop-blur-md border-b border-white/10 /* Pour la navigation fixe scrollée */
```

### Le Rendu des Cartes ("Glossy Shine")

Ajoutez un calque de reflet brillant satiné en survol sur les éléments interactifs :

```html
<!-- Sur l'élément parent contenant la classe group et relative -->
<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
```

---

## 🏎️ Navigation Fixe Dynamique (Sticky Glass Header)

La barre de navigation reste invisible ou transparente au repos, puis se transforme en une fine capsule vitrée fixe dès que l'utilisateur défile vers le bas (détection de `window.scrollY > 50`) :

1.  **Au repos :** `bg-transparent py-6 md:py-8`
2.  **En mouvement (Scrolled) :** `fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl transition-all duration-500`
3.  **Compensateur de hauteur (Spacer) :** Un bloc statique de `h-24 md:h-28` en tête de page garantit que le contenu du Hero ne passe pas sous le menu fixe.

---

## 🎬 Animations d'Apparition au Scroll (Scroll Animations)

Les éléments s'animent de manière fluide lors du défilement dans les deux sens (montée et descente) en utilisant **Motion (`motion/react`)** :

*   **Propriétés Communes :**
    *   `initial={{ opacity: 0, y: 50 }}` (ou `y: 35` pour les petits composants).
    *   `whileInView={{ opacity: 1, y: 0 }}` pour animer dès l'apparition.
    *   `viewport={{ once: false, amount: 0.1 }}` (garantit que l'animation s'exécute à chaque fois que l'élément entre dans l'écran, peu importe la direction).
    *   `transition={{ duration: 0.7, ease: "easeOut" }}` pour un mouvement ultra-doux.

*   **Exemple de structure d'un bloc de section :**

```tsx
import { motion } from "motion/react";

export default function MySection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Contenu de votre section */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🔤 Typographies Épurées & Iconographie

L'esthétique repose entièrement sur un contraste typographique fort :

1.  **Titres & En-têtes :** **Space Grotesk** (`font-sans font-black tracking-tight text-white`).
2.  **Corps de texte :** **Inter** (`font-sans font-light text-zinc-300`).
3.  **Surcharges techniques, dates et badges :** **JetBrains Mono** (`font-mono text-xs uppercase tracking-widest text-[#A5B4FC]`).
4.  **Icônes :** Issues uniquement de la librairie **`lucide-react`** intégrées avec des teintes indigo transparentes.

---

## 🕸️ Éléments Décoratifs En Arrière-plan (Vecteurs discrets)

Pour briser la monotonie du fond sombre, injectez des grilles vectorielles ou des courbes fluides à très basse opacité :

*   **Motif de grille (Grid Motif) :**
    ```html
    <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    ```

---

## 💻 Configuration Tailwind CSS (Extrait de `src/index.css`)

Assurez-vous d'ajouter le comportement de défilement doux natif du navigateur dans votre fichier global :

```css
@import "tailwindcss";

@theme {
  --font-sans: "Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

html {
  scroll-behavior: smooth;
}
```
