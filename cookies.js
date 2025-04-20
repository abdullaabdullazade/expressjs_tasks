const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())

app.get("/set-cookie", (req, res) => {
    const { name } = req.query;
    console.log(name)

    res.cookie("name", name)
    // res.cookie("name",name,{httpOnly: true,maxAge: 60*60*1000})
    // res.resetCookie(name)
    return res.send()
})


app.get("/get-cookie", (req, res) => {
    return res.send(req.cookies.name)
})




app.listen(3000, () => { console.log("running") })