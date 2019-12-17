/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const Cosmos = require('./db/cosmos');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const db = require('./users');
require('dotenv').config();

const CACHE_ENABLED = process.env.CACHE_ENABLED === 'true' || false;
const port = process.env.WEBSITES_PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
  length: function(n, key) {
    return n.length;
  },
  maxAge: 1000 * 60 * 60 * 24 * 30,
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.path}${JSON.stringify(req.query)}`;
}

async function renderAndCache(req, res) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && CACHE_ENABLED) {
    console.log(`serving from cache ${key}`);
    res.setHeader('x-cache', 'HIT');
    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
    res.send(ssrCache.get(key));
    return;
  }

  // let's get the containers from cosmosDB and pass that along to the getInitialProps method on pages
  const containers = await Cosmos.connect();

  try {
    console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML({ ...req, containers }, res, req.path, req.query);

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

const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }),
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.prepare().then(() => {
  const server = express();
  // BodyParser Middleware
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  // Express Session
  server.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true,
    }),
  );

  // Passport init
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
  server.get('/_next/*', (req, res) => {
    /* serving _next static content using next.js handler */
    handle(req, res);
  });

  server.get('*', (req, res) => {
    /* serving page */
    return renderAndCache(req, res);
  });

  // Endpoint to login
  server.post('/login', passport.authenticate('local', { failureRedirect: 'signin' }), function(req, res) {
    console.log('success: req, res: ', req, res);

    res.send(req.user);
  });

  // Endpoint to get current user
  server.get('/user', function(req, res) {
    res.send(req.user);
  });

  // Endpoint to logout
  server.get('/logout', function(req, res) {
    console.log('loggingout ');
    req.logout();
    res.send(null);
  });
  /* starting server */
  server.listen(port, err => {
    if (err) throw err;
    // console.log(`> Ready on http://localhost:${port}`);
  });
});
