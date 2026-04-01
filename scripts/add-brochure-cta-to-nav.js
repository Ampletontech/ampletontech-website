const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function getAllHtml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'scripts'].includes(entry.name)) {
      out.push(...getAllHtml(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = getAllHtml(ROOT);

files.forEach((file) => {
  const base = path.basename(file);
  const rel = path.relative(ROOT, file);
  if (!rel.endsWith('.html')) return;

  let html = fs.readFileSync(file, 'utf8');

  // Skip index.html – already has header CTA and desktop behavior
  if (base === 'index.html') return;

  // If already has a nav-link brochure CTA, skip
  if (html.includes('nav-link-brochure-cta')) return;

  // Find header CTA href in this file
  const ctaMatch = html.match(/<a[^>]+class="header-cta"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*class="header-cta"/);
  let href = null;
  if (ctaMatch) {
    href = ctaMatch[1] || ctaMatch[2];
  }
  if (!href) return;

  // Build mobile nav CTA
  const mobileCta = `\n              <a href="${href}" class="nav-link nav-link-brochure-cta">Our Brochure</a>`;

  // Inject just before closing </nav> of primary nav-menu
  const navCloseIndex = html.indexOf('</nav>');
  if (navCloseIndex === -1) return;

  html = html.slice(0, navCloseIndex) + mobileCta + html.slice(navCloseIndex);

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated:', rel);
});

