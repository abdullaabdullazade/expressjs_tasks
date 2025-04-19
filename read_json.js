const fs = require("fs")
const path = require("path")
const { json } = require("stream/consumers")


PATH = path.join(__dirname, "abdulla.json")

let data = JSON.parse(fs.readFileSync(PATH))

console.log()//i must parse

"----------------------------------"
data.push({ name: "Tugay", age: 21 });


fs.writeFileSync(PATH, JSON.stringify(data, null, 2))
"_------------------------------------"

"delete and add"
