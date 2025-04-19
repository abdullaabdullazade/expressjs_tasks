const jwt = require("jsonwebtoken")


secret = "abdulaxows"

// const token = jwt.sign({ "abdulla": 12 }, secret, {
//     expiresIn: "1s", 
//     notBefore: "0", 
// });


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhYmR1bGxhIjoxMiwiaWF0IjoxNzQ1MDQ0NjI2LCJuYmYiOjE3NDUwNDQ2MjYsImV4cCI6MTc0NTA0NDYyN30.4n1vzd3ePqyDy6J_mnwnd3W0jQKecmHgm5gCMtu16Kk"
try {
    const verify_token = jwt.verify(token, secret)
    console.log(verify_token)

} catch (e) { console.log("error") }