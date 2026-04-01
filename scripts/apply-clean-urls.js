/**
 * Converts internal page links to root-relative extensionless URLs for production.
 * Run from repo root: node scripts/apply-clean-urls.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const STATIC_EXT =
  /\.(pdf|webp|png|jpe?g|svg|ico|mp4|gif|woff2?|ttf|eot|css|js|xml|json)$/i;

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtml(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function toRootPath(fromFile, urlPath) {
  const noHash = urlPath.split('#')[0];
  if (!noHash) return '';
  /* Already site-root-relative — avoid path.join quirks on Windows */
  if (noHash.startsWith('/')) {
    return noHash.replace(/^\/+/, '').replace(/\\/g, '/');
  }
  const resolved = path.normalize(path.join(path.dirname(fromFile), noHash));
  return path.relative(ROOT, resolved).replace(/\\/g, '/');
}

function pageUrlFromRel(rel) {
  if (!rel || rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) {
    const d = rel.slice(0, -'/index.html'.length);
    return d ? `/${d}/` : '/';
  }
  if (rel.endsWith('index.html')) return '/';
  if (rel.endsWith('.html')) return `/${rel.slice(0, -5)}`;
  return `/${rel}`;
}

function cleanPageHref(fromFile, href) {
  const trimmed = href.trim();
  if (!trimmed) return href;
  if (/^(https?:|mailto:|tel:|data:)/i.test(trimmed)) return href;
  if (trimmed.startsWith('//')) return href;

  const hashIdx = trimmed.indexOf('#');
  const urlPart = hashIdx >= 0 ? trimmed.slice(0, hashIdx) : trimmed;
  const hash = hashIdx >= 0 ? trimmed.slice(hashIdx) : '';

  if (!urlPart) return hash || href;

  /* Static assets → always root-relative */
  if (
    STATIC_EXT.test(urlPart) ||
    urlPart.includes('/assets/') ||
    urlPart.startsWith('assets/') ||
    /\/(css|js)\//i.test(urlPart) ||
    (/^(\.\/|\.\.\/)/.test(urlPart) && /\.(css|js)$/i.test(urlPart))
  ) {
    const rel = toRootPath(fromFile, urlPart);
    if (!rel.startsWith('..')) return `/${rel}${hash}`;
    return href;
  }

  if (!urlPart.endsWith('.html') && !urlPart.endsWith('/')) {
    return href;
  }

  const rel = toRootPath(fromFile, urlPart);
  if (rel.startsWith('..')) return href;

  return pageUrlFromRel(rel) + hash;
}

function cleanSrc(fromFile, src) {
  const u = src.trim();
  if (!u || /^(https?:|data:)/i.test(u) || u.startsWith('//')) return src;
  if (STATIC_EXT.test(u) || /\.js$/i.test(u)) {
    const rel = toRootPath(fromFile, u.split('#')[0]);
    if (!rel.startsWith('..')) return `/${rel}`;
  }
  return src;
}

function transformHtmlFile(filePath) {
  let s = fs.readFileSync(filePath, 'utf8');

  s = s.replace(/href="([^"]*)"/g, (m, h) => {
    const next = cleanPageHref(filePath, h);
    return `href="${next}"`;
  });

  s = s.replace(/src="([^"]*)"/g, (m, u) => {
    const next = cleanSrc(filePath, u);
    return `src="${next}"`;
  });

  fs.writeFileSync(filePath, s, 'utf8');
}

function buildRedirectLines() {
  const lines = [];
  const htmlFiles = walkHtml(ROOT);

  for (const abs of htmlFiles) {
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    let urlPath;
    let dest = '/' + rel;

    if (rel === 'index.html') {
      urlPath = '/';
      dest = '/index.html';
    } else if (rel.endsWith('/index.html')) {
      const dir = rel.slice(0, -'/index.html'.length);
      urlPath = `/${dir}/`;
      lines.push(`${urlPath}  ${dest}  200`);
      lines.push(`/${dir}  ${dest}  200`);
      continue;
    } else if (rel.endsWith('.html')) {
      urlPath = `/${rel.slice(0, -5)}`;
    } else continue;

    lines.push(`${urlPath}  ${dest}  200`);
  }

  return [...new Set(lines)].sort().join('\n') + '\n';
}

function buildVercelRewrites() {
  const htmlFiles = walkHtml(ROOT);
  const rewrites = [];

  for (const abs of htmlFiles) {
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    const dest = '/' + rel;

    if (rel === 'index.html') {
      rewrites.push({ source: '/', destination: '/index.html' });
      continue;
    }
    if (rel.endsWith('/index.html')) {
      const dir = rel.slice(0, -'/index.html'.length);
      rewrites.push({ source: `/${dir}`, destination: dest });
      rewrites.push({ source: `/${dir}/`, destination: dest });
      continue;
    }
    if (rel.endsWith('.html')) {
      const clean = `/${rel.slice(0, -5)}`;
      rewrites.push({ source: clean, destination: dest });
    }
  }

  return { rewrites };
}

// --- run ---
const files = walkHtml(ROOT);
for (const f of files) {
  transformHtmlFile(f);
  console.log('Updated', path.relative(ROOT, f));
}

const redirects = buildRedirectLines();
fs.writeFileSync(path.join(ROOT, '_redirects'), redirects, 'utf8');
console.log('Wrote _redirects');

const vercel = buildVercelRewrites();
fs.writeFileSync(
  path.join(ROOT, 'vercel.json'),
  JSON.stringify(vercel, null, 2),
  'utf8'
);
console.log('Wrote vercel.json');

const htaccess = `DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Extensionless URLs: /about-us -> /about-us.html (internal)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L,QSA]

  # Optional: 301 redirect old .html URLs to clean URLs (uncomment on Apache if desired)
  # RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\\ /([^.]+)\\.html\\ HTTP/
  # RewriteRule ^(.+)\\.html$ /$1 [R=301,L]
</IfModule>
`;

fs.writeFileSync(path.join(ROOT, '.htaccess'), htaccess, 'utf8');
console.log('Wrote .htaccess');
