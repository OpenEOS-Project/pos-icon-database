import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PRODUCTS_PATH = path.join(ROOT, 'data', 'products.json');
const README_PATH = path.join(ROOT, 'README.md');
const ICONS_256 = path.join(ROOT, 'icons', '256');

const BASE_URL = 'https://raw.githubusercontent.com/OpenEOS-Project/pos-icon-database/main/icons/256';

const START_MARKER = '<!-- ICON-TABLE-START -->';
const END_MARKER = '<!-- ICON-TABLE-END -->';

const CATEGORY_LABELS = {
  food: 'Food',
  drink: 'Drinks',
  side: 'Sides',
  dessert: 'Desserts',
};

function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));
  const readme = fs.readFileSync(README_PATH, 'utf-8');

  // Group by category
  const categories = {};
  for (const product of products) {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  }

  // Build markdown table per category
  const sections = [];

  for (const [category, items] of Object.entries(categories)) {
    const label = CATEGORY_LABELS[category] || category;
    sections.push(`### ${label}\n`);
    sections.push('| Icon | Name | ID | Aliases |');
    sections.push('|:----:|------|-----|---------|');

    for (const item of items) {
      const hasIcon = fs.existsSync(path.join(ICONS_256, `${item.id}.png`));
      const iconCell = hasIcon
        ? `<img src="${BASE_URL}/${item.id}.png" width="48" height="48" alt="${item.name}" />`
        : '_missing_';
      const aliases = item.aliases.join(', ');
      sections.push(`| ${iconCell} | **${item.name}** | \`${item.id}\` | ${aliases} |`);
    }

    sections.push('');
  }

  const totalCount = products.length;
  const iconCount = products.filter((p) =>
    fs.existsSync(path.join(ICONS_256, `${p.id}.png`))
  ).length;

  const table = [
    `**${totalCount} products** (${iconCount}/${totalCount} icons generated)\n`,
    ...sections,
  ].join('\n');

  // Replace between markers
  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    console.error('Error: Markers not found in README.md');
    console.error(`Looking for "${START_MARKER}" and "${END_MARKER}"`);
    process.exit(1);
  }

  const newReadme =
    readme.substring(0, startIdx + START_MARKER.length) +
    '\n' +
    table +
    '\n' +
    readme.substring(endIdx);

  fs.writeFileSync(README_PATH, newReadme);
  console.log(`README updated: ${totalCount} products, ${iconCount} icons`);
}

main();
