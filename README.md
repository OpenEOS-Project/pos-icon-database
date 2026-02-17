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

### Ohne React (plain JS/HTML)

```js
import { searchIcons, getIcon } from '@openeos/pos-icons';

// Icon-Eintrag holen
const icon = getIcon('pommes');

// Pfad zum PNG im node_modules-Ordner
const iconPath = `node_modules/@openeos/pos-icons/icons/256/${icon.icon256}`;

// Beispiel: <img> dynamisch erstellen
const img = document.createElement('img');
img.src = iconPath;
img.width = 64;
img.height = 64;
img.alt = 'Pommes';
document.body.appendChild(img);
```

Oder direkt im HTML:

```html
<img src="node_modules/@openeos/pos-icons/icons/256/pommes.png" width="64" height="64" alt="Pommes" />
```

### Direkt von GitHub (ohne NPM)

Icons können auch ohne Installation direkt über die GitHub Raw-URL eingebunden werden:

```html
<img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/pommes.png" width="64" height="64" alt="Pommes" />
```

Basis-URL: `https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/{id}.png`

## Verfügbare Icons

<!-- ICON-TABLE-START -->
**5 Produkte** (5/5 Icons generiert)

### Food

| Icon | Name | ID | Aliase |
|:----:|------|-----|--------|
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/pommes.png" width="48" height="48" alt="Pommes" /> | **Pommes** | `pommes` | pommes frites, french fries, fries, fritten |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/currywurst.png" width="48" height="48" alt="Currywurst" /> | **Currywurst** | `currywurst` | curry wurst, curry sausage |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/hamburger.png" width="48" height="48" alt="Hamburger" /> | **Hamburger** | `hamburger` | burger, cheeseburger |

### Drinks

| Icon | Name | ID | Aliase |
|:----:|------|-----|--------|
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/wasser.png" width="48" height="48" alt="Wasser" /> | **Wasser** | `wasser` | water, mineralwasser, sprudel |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/apfelschorle.png" width="48" height="48" alt="Apfelschorle" /> | **Apfelschorle** | `apfelschorle` | apple spritzer, apfelsaft gespritzt |

<!-- ICON-TABLE-END -->

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

### README Icon-Tabelle aktualisieren

Die Icon-Tabelle in dieser README wird automatisch aus `data/products.json` generiert:

```bash
pnpm run build-readme
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

## NPM veröffentlichen

  1. NPM Account & Login

  npm login

  2. Organisation anlegen (einmalig)

  Da das Paket unter @openeos/ gescoped ist, brauchst du eine NPM-Organisation namens openeos. Erstelle sie unter https://www.npmjs.com/org/create – oder publiziere ohne Scope.

  3. Icons generieren + publizieren

  pnpm run generate          # Icons erzeugen (OpenAI API)
  pnpm run build-index       # Suchindex bauen
  pnpm publish --access public

  prepublishOnly führt automatisch build-index + build nochmal aus, aber die Icons müssen vorher da sein.

  Wichtig:
  - --access public ist nötig bei scoped Packages (sonst versucht NPM ein kostenpflichtiges privates Paket)
  - Falls du keine NPM-Org willst, ändere den Namen in package.json zu z.B. openeos-pos-icons (ohne Scope)

  Spätere Updates:

  # Version hochzählen
  npm version patch   # 0.1.0 → 0.1.1
  # oder: npm version minor / npm version major

  # Publizieren
  pnpm publish --access public


## Lizenz

CC0-1.0 – Public Domain
