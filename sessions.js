const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    req.session.user = username;
    return res.send("Login uğurludur");
  }
  res.status(401).send("Yanlış məlumat");
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    return res.send(`Salam ${req.session.user}`);
  }
  res.status(403).send("Zəhmət olmasa login olun");
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send("Çıxış etdiniz");
});

app.listen(3000, () => console.log('Server 3000-də başladı'));
