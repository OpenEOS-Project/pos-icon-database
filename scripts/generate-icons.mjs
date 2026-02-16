import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PRODUCTS_PATH = path.join(ROOT, 'data', 'products.json');
const PROMPT_PATH = path.join(ROOT, 'prompts', 'master-prompt.txt');
const ICONS_1024 = path.join(ROOT, 'icons', '1024');
const ICONS_256 = path.join(ROOT, 'icons', '256');

function printUsage() {
  console.log(`
Usage: node scripts/generate-icons.mjs [options]

Options:
  --product <id>   Generate icon for a specific product only
  --force          Regenerate even if icon already exists
  --help           Show this help message

Examples:
  node scripts/generate-icons.mjs                    # Generate all missing icons
  node scripts/generate-icons.mjs --product pommes   # Generate only pommes
  node scripts/generate-icons.mjs --force             # Regenerate all icons
  `);
}

async function main() {
  const { values } = parseArgs({
    options: {
      product: { type: 'string' },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
  });

  if (values.help) {
    printUsage();
    process.exit(0);
  }

  // Lazy-import openai and sharp so --help works without them installed
  const { default: OpenAI } = await import('openai');
  const { default: sharp } = await import('sharp');

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    console.error('Copy .env.example to .env and add your key.');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));
  const promptTemplate = fs.readFileSync(PROMPT_PATH, 'utf-8');

  // Filter to specific product if requested
  let targets = products;
  if (values.product) {
    targets = products.filter((p) => p.id === values.product);
    if (targets.length === 0) {
      console.error(`Error: Product "${values.product}" not found in products.json`);
      process.exit(1);
    }
  }

  // Ensure output directories exist
  fs.mkdirSync(ICONS_1024, { recursive: true });
  fs.mkdirSync(ICONS_256, { recursive: true });

  const total = targets.length;
  let completed = 0;
  let skipped = 0;

  for (const product of targets) {
    const icon1024 = path.join(ICONS_1024, `${product.id}.png`);
    const icon256 = path.join(ICONS_256, `${product.id}.png`);

    // Skip if icon exists and not forcing
    if (!values.force && fs.existsSync(icon1024) && fs.existsSync(icon256)) {
      skipped++;
      completed++;
      console.log(`[${completed}/${total}] ${product.name} – skipped (exists)`);
      continue;
    }

    const prompt = promptTemplate.replace('{subject}', product.prompt_subject);

    console.log(`[${completed + 1}/${total}] ${product.name} – generating...`);

    try {
      const response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'medium',
      });

      // gpt-image-1 returns base64 data
      const base64Data = response.data[0].b64_json;
      const imageBuffer = Buffer.from(base64Data, 'base64');

      // Save 1024px master
      fs.writeFileSync(icon1024, imageBuffer);

      // Resize to 256px
      await sharp(imageBuffer)
        .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(icon256);

      completed++;
      console.log(`[${completed}/${total}] ${product.name} – done`);
    } catch (err) {
      completed++;
      console.error(`[${completed}/${total}] ${product.name} – ERROR: ${err.message}`);
    }
  }

  console.log(`\nFinished: ${completed - skipped} generated, ${skipped} skipped, ${total} total`);
}

main();
