# @openeos/pos-icons

Konsistente, KI-generierte Food & Drink Icons für Kassensysteme (POS).

## Features

- ~30 Icons für typische Vereinsfest-Produkte (Food, Drinks, Sides, Desserts)
- Flat/Minimal Design, weißer Hintergrund
- 256×256px PNG Icons
- React-Komponente `<PosIcon />`
- Suchfunktion über Name, Aliase und Kategorie
- TypeScript-Typen

## Installation

```bash
pnpm add @openeos/pos-icons
```

## Nutzung

### React-Komponente

```tsx
import { PosIcon } from '@openeos/pos-icons';

<PosIcon id="pommes" size={64} />
<PosIcon id="bier" size={128} className="rounded" />
```

### Suchfunktion

```ts
import { searchIcons, getIcon, getAllIcons } from '@openeos/pos-icons';

// Suche nach Stichwort
const results = searchIcons('pom');
// → [{ id: 'pommes', terms: [...], icon256: 'pommes.png' }]

// Einzelnes Icon per ID
const icon = getIcon('bier');

// Alle Icons
const all = getAllIcons();
```

## Icons generieren

Icons werden per OpenAI-API (gpt-image-1) erzeugt.

### Setup

```bash
cp .env.example .env
# OPENAI_API_KEY in .env eintragen
pnpm install
```

### Alle fehlenden Icons generieren

```bash
pnpm run generate
```

### Einzelnes Icon generieren

```bash
node scripts/generate-icons.mjs --product pommes
```

### Icon erzwingen (überschreiben)

```bash
node scripts/generate-icons.mjs --product pommes --force
```

### Suchindex neu bauen

```bash
pnpm run build-index
```

## Projekt-Struktur

```
icons/
  1024/          # Master-Icons (1024×1024, KI-generiert)
  256/           # POS-Icons (256×256, resized)
data/
  products.json  # Produktdatenbank
  index.json     # Suchindex (auto-generiert)
prompts/
  master-prompt.txt  # KI-Stil-Prompt
scripts/
  generate-icons.mjs  # OpenAI Icon-Generator
  build-index.mjs     # Suchindex-Builder
src/
  index.ts       # Hauptexport
  search.ts      # Suchfunktion
  PosIcon.tsx    # React-Komponente
  types.ts       # TypeScript-Typen
```

## Kategorien

| Kategorie | Produkte |
|-----------|----------|
| food | Schnitzel, Pommes, Bratwurst, Currywurst, Leberkäse, Flammkuchen, Brezel, Pizza, Hamburger, Hotdog, Kartoffelsalat, Grillhähnchen |
| drink | Bier, Weizen, Radler, Cola, Fanta, Sprite, Wasser, Apfelschorle, Kaffee, Tee |
| side | Ketchup, Mayonnaise, Senf |
| dessert | Eis, Kuchen, Waffel, Crêpe |

## Lizenz

CC0-1.0 – Public Domain
