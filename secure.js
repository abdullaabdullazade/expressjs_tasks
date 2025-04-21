require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend domain
    credentials: true,
  })
);

const users = [
  { id: 1, username: "abdulla", password: "ctfkral" },
];


function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Yanlış məlumat" });

  const token = generateToken(user);
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });
  res.json({ message: "Giriş uğurlu" });
});


function verifyToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Token yoxdur" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token etibarsızdır" });
  }
}


app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Salam, ${req.user.username}! Bu qorunan məlumatdır.` });
});


app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Çıxış edildi" });
});

app.listen(3000, () => console.log("Server 3000-də işləyir"));