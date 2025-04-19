const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()


let users = {}
const secret = "abdullaxows"

app.use(express.json())


app.post("/generate-token", (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ "username": username }, secret, {
        expiresIn: "10s",
        notBefore: "0",

    })

    users[username] = token;
    return res.status(200).send(token)

})



app.get("/verify", (req, res) => {
    const { token } = req.query;
    console.log(token)
    try {
        const verify = jwt.verify(token, secret)
        return res.status(200).send(verify)
    } catch (e){
        console.log(e)
        return res.status(404).send("experied")

    }
})





app.listen(3000, () => { console.log("app running") })

