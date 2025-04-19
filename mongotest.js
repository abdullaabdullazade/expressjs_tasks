const User = require("./mongoSchema");

const newUser = new User({
    username: "abdulla",
    password: "123456",
    age: 16,
});

await newUser.save();

await User.create({
    username: "abdulla2",
    password: "abcdef"
});

const user = await User.findOne({ username: "abdulla" });
console.log(user);
