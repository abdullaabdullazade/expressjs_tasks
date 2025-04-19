const express = require("express")
const rateLimit = require("express-rate-limit")
const cors = require('cors')



const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000 * 60 * 24, // 24
  max: 10,
  message: 'Çox tez-tez sorğu göndərirsiniz. Zəhmət olmasa bir az gözləyin.'
});

app.use(cors(
  {
    origin: "http://locahost:5743",
    allowedHeaders: ["POST", "GET"]
  }
))
app.use(express.json())
app.use("/", limiter)
app.get("/", (req, res) => { res.send("backend is working") })

app.get("/abdulla", (req, res) => { res.send("salam abdulla") })




app.listen(3000, () => { console.log("running") })