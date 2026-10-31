// Serves the production build the way GitHub Pages does: files as-is, and any
// unknown path gets 404.html with a 404 status (CI copies index.html there, which
// is what makes deep links like /skills work on Pages).
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist/ul-portfolio/browser');
const port = Number(process.env.PORT ?? 4300);

if (!existsSync(join(root, 'index.html'))) {
  console.error(`No build found at ${root}. Run "npm run build" first.`);
  process.exit(1);
}

// Locally there is no 404.html unless the CI copy step ran, so fall back to index.html.
const notFoundPage = existsSync(join(root, '404.html')) ? '404.html' : 'index.html';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function resolveFile(urlPath) {
  const file = normalize(join(root, decodeURIComponent(urlPath)));
  if (!file.startsWith(root) || !existsSync(file)) return null;
  if (statSync(file).isDirectory()) {
    const index = join(file, 'index.html');
    return existsSync(index) ? index : null;
  }
  return file;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  const file = resolveFile(pathname);
  const target = file ?? join(root, notFoundPage);
  res.writeHead(file ? 200 : 404, {
    'Content-Type': types[extname(target)] ?? 'application/octet-stream',
  });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
