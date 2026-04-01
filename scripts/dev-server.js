/**
 * Local static server with extensionless URLs (same idea as .htaccess / Netlify rewrites).
 * Live Server and plain file servers do NOT map /about-us → about-us.html — use this instead.
 *
 * From repo root: node scripts/dev-server.js
 * Then open http://127.0.0.1:5500/ (PORT env overrides default 5500)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT, 10) || 5500;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function buildAbsFromPathname(pathname) {
  let p = pathname.split('?')[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    return null;
  }
  const segments = p.split('/').filter(Boolean);
  for (const seg of segments) {
    if (seg === '..') return null;
  }
  if (segments.length === 0) {
    return path.join(ROOT, 'index.html');
  }
  return path.join(ROOT, ...segments);
}

function resolveFile(pathname) {
  const abs = buildAbsFromPathname(pathname);
  if (!abs) return null;

  if (fs.existsSync(abs)) {
    const st = fs.statSync(abs);
    if (st.isFile()) return abs;
    if (st.isDirectory()) {
      const idx = path.join(abs, 'index.html');
      if (fs.existsSync(idx) && fs.statSync(idx).isFile()) return idx;
    }
    return null;
  }

  const withHtml = `${abs}.html`;
  if (fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) {
    return withHtml;
  }

  return null;
}

function isUnderRoot(filePath) {
  const rel = path.relative(ROOT, filePath);
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
}

const server = http.createServer((req, res) => {
  const host = req.headers.host || `127.0.0.1:${PORT}`;
  let u;
  try {
    u = new URL(req.url || '/', `http://${host}`);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  if (u.pathname === '/favicon.ico') {
    const fav = path.join(ROOT, 'assets', 'images', 'favicon.png');
    if (fs.existsSync(fav)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(fav).pipe(res);
      return;
    }
  }

  const filePath = resolveFile(u.pathname);
  if (!filePath || !isUnderRoot(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Cannot GET ${u.pathname}`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Dev server (clean URLs): http://127.0.0.1:${PORT}/`);
  console.log('Stop with Ctrl+C. Use this instead of Live Server for extensionless links.');
});
