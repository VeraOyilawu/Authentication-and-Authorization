const express = require("express")
const PORT = 1111
const db = require("./config/database")
const router = require("./routes/userRouter")

const app = express()
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})

