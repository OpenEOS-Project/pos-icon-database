import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PRODUCTS_PATH = path.join(ROOT, 'data', 'products.json');
const ICONS_256 = path.join(ROOT, 'icons', '256');
const INDEX_PATH = path.join(ROOT, 'data', 'index.json');

function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));

  const index = [];
  let skipped = 0;

  for (const product of products) {
    const iconFile = `${product.id}.png`;
    const iconPath = path.join(ICONS_256, iconFile);

    if (!fs.existsSync(iconPath)) {
      console.warn(`Warning: No 256px icon for "${product.name}" (${product.id}) – skipping`);
      skipped++;
      continue;
    }

    // Build search terms from name, aliases, category, and id
    const terms = [
      product.name.toLowerCase(),
      ...product.aliases.map((a) => a.toLowerCase()),
      product.category.toLowerCase(),
      product.id.toLowerCase(),
    ];

    // Deduplicate
    const uniqueTerms = [...new Set(terms)];

    index.push({
      id: product.id,
      terms: uniqueTerms,
      icon256: iconFile,
    });
  }

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');

  console.log(`Index built: ${index.length} entries written to data/index.json`);
  if (skipped > 0) {
    console.log(`Skipped ${skipped} products without icons`);
  }
}

main();
