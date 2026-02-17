# @openeos/pos-icons

Consistent, AI-generated food & drink icons for point-of-sale systems.

## Features

- ~30 icons for typical event and club catering products (food, drinks, sides, desserts)
- Flat/minimal design, white background
- 256x256px PNG icons
- React component `<PosIcon />`
- Search function by name, aliases, and category
- TypeScript types

## Installation

```bash
pnpm add @openeos/pos-icons
```

## Usage

### React Component

```tsx
import { PosIcon } from '@openeos/pos-icons';

<PosIcon id="pommes" size={64} />
<PosIcon id="bier" size={128} className="rounded" />
```

### Search Function

```ts
import { searchIcons, getIcon, getAllIcons } from '@openeos/pos-icons';

// Search by keyword
const results = searchIcons('pom');
// → [{ id: 'pommes', terms: [...], icon256: 'pommes.png' }]

// Get single icon by ID
const icon = getIcon('bier');

// Get all icons
const all = getAllIcons();
```

### Without React (plain JS/HTML)

```js
import { searchIcons, getIcon } from '@openeos/pos-icons';

// Get icon entry
const icon = getIcon('pommes');

// Path to PNG in node_modules
const iconPath = `node_modules/@openeos/pos-icons/icons/256/${icon.icon256}`;

// Example: create <img> dynamically
const img = document.createElement('img');
img.src = iconPath;
img.width = 64;
img.height = 64;
img.alt = 'Pommes';
document.body.appendChild(img);
```

Or directly in HTML:

```html
<img src="node_modules/@openeos/pos-icons/icons/256/pommes.png" width="64" height="64" alt="Pommes" />
```

### Directly from GitHub (without NPM)

Icons can also be used directly via GitHub raw URL without installation:

```html
<img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/pommes.png" width="64" height="64" alt="Pommes" />
```

Base URL: `https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/{id}.png`

## Available Icons

<!-- ICON-TABLE-START -->
**5 products** (5/5 icons generated)

### Food

| Icon | Name | ID | Aliases |
|:----:|------|-----|---------|
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/pommes.png" width="48" height="48" alt="Pommes" /> | **Pommes** | `pommes` | pommes frites, french fries, fries, fritten |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/currywurst.png" width="48" height="48" alt="Currywurst" /> | **Currywurst** | `currywurst` | curry wurst, curry sausage |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/hamburger.png" width="48" height="48" alt="Hamburger" /> | **Hamburger** | `hamburger` | burger, cheeseburger |

### Drinks

| Icon | Name | ID | Aliases |
|:----:|------|-----|---------|
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/wasser.png" width="48" height="48" alt="Wasser" /> | **Wasser** | `wasser` | water, mineralwasser, sprudel |
| <img src="https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256/apfelschorle.png" width="48" height="48" alt="Apfelschorle" /> | **Apfelschorle** | `apfelschorle` | apple spritzer, apfelsaft gespritzt |

<!-- ICON-TABLE-END -->

## Generating Icons

Icons are generated using the OpenAI API (gpt-image-1).

### Setup

```bash
cp .env.example .env
# Add your OPENAI_API_KEY to .env
pnpm install
```

### Generate all missing icons

```bash
pnpm run generate
```

### Generate a single icon

```bash
node scripts/generate-icons.mjs --product pommes
```

### Force regenerate (overwrite)

```bash
node scripts/generate-icons.mjs --product pommes --force
```

### Rebuild search index

```bash
pnpm run build-index
```

### Update README icon table

The icon table in this README is auto-generated from `data/products.json`:

```bash
pnpm run build-readme
```

## Project Structure

```
icons/
  1024/          # Master icons (1024x1024, AI-generated)
  256/           # POS icons (256x256, resized)
data/
  products.json  # Product database
  index.json     # Search index (auto-generated)
prompts/
  master-prompt.txt  # AI style prompt
scripts/
  generate-icons.mjs  # OpenAI icon generator
  build-index.mjs     # Search index builder
  build-readme.mjs    # README table generator
src/
  index.ts       # Main exports
  search.ts      # Search function
  PosIcon.tsx    # React component
  types.ts       # TypeScript types
```

## Publishing to NPM

### Initial Setup

1. **NPM Login:**

   ```bash
   npm login
   ```

2. **Create organization** (once):

   Since the package is scoped under `@openeos/`, an NPM organization `openeos` is required.
   Create one at https://www.npmjs.com/org/create.

### First Publish

```bash
pnpm run generate            # Generate icons (OpenAI API)
pnpm run build-index         # Build search index
pnpm run build-readme        # Update README
pnpm publish --access public
```

> `--access public` is required for scoped packages, otherwise NPM will attempt to create a paid private package.
> `prepublishOnly` automatically runs `build-index` + `build`, but icons must be generated beforehand.

### Publishing Updates

```bash
npm version patch   # 0.1.0 → 0.1.1 (or: minor / major)
pnpm publish --access public
```

## License

CC0-1.0 – Public Domain
