const express = require("express");
const { body, validationResult } = require("express-validator");
const xss = require("xss-clean")
const app = express();


app.use(xss())
app.use(express.json())

/*
 [
    body("username").notEmpty().withMessage("Not empty!"),
    body("email").isEmail().withMessage("Email formatı düzgün deyil!"),
    body("password").isLength({ min: 6 }).withMessage("Parol 6 hərfdən böyük olamlıdır")
]
    burada butun  validation ola bilme ehtimlalarini nezere aliriq

*/
app.post("/register", [
    body("username").notEmpty().escape().withMessage("Not empty!"),
    body("email").isEmail().withMessage("Email formatı düzgün deyil!"),
    body("password").isLength({ min: 6 }).withMessage("Parol 6 hərfdən böyük olamlıdır")
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() })
    }
    return res.send("okey")
})






app.listen(3000, () => console.log("Server 3000-də işləyir"));
