const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.url)
.then( () => {
    console.log("connected.........");
})
.catch( () => {
    console.log("unable to connect.......");
})