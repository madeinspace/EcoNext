const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const Cosmos = require('./db/cosmos');
const path = require('path');
const favicon = require('serve-favicon');

require('dotenv').config();

const CACHE_ENABLED = process.env.CACHE_ENABLED === 'true' || false;
const port = process.env.WEBSITES_PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
  length: function (n, key) { return n.length },
  maxAge: 1000 * 60 * 60 * 12, // 12hours
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getCacheKey(req) {
  return `${req.path}${JSON.stringify(req.query)}`;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function renderAndCache(req, res) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && CACHE_ENABLED) {
    console.log(`serving from cached ${key}`);
    const c = ssrCache.get(key)
    res.setHeader('x-cache', 'HIT');
    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
    res.send(ssrCache.get(key));
    return;
  }

  // let's get the containers from cosmosDB and pass that along to the getInitialProps method on pages
  // const containers = await Cosmos.connect();

  try {
    console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML({ ...req }, res, req.path, req.query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    if (CACHE_ENABLED) {
      ssrCache.set(key, html);
    }

    res.setHeader('x-cache', 'MISS');
    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query);
  }
}

app.prepare().then(() => {
  const server = express();
  server.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
  server.get('/_next/*', (req, res) => {
    /* serving _next static content using next.js handler */
    handle(req, res);
  });

  server.get('*', (req, res) => {
    /* serving page */
    return renderAndCache(req, res);
  });

  /* starting server */
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
