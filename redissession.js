const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");
const RedisStore = require("connect-redis")ş;

const app = express();

// Redis client yaradılır
const redisClient = createClient({
  legacyMode: true // Redis v4+ üçün bəzi metodlara uyğunluq təmin edir
});

// Redis serverə qoşulmaq
redisClient.connect().catch(console.error);

// Redis store konfiqurasiya edilir
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:"
});

// Express session middleware
app.use(session({
  store: redisStore,
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // təhlükəsizlik üçün əlavə olunur
    secure: false,  // localda false saxla, production-da true (HTTPS tələb edir)
    maxAge: 1000 * 60 * 10 // 10 dəqiqə
  }
}));

// Test route
app.get("/counter", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Views: ${req.session.views}`);
});

// Server start
app.listen(3000, () => {
  console.log("✅ Server http://localhost:3000 ünvanında işləyir");
});
