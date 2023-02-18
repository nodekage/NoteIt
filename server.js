const express = require("express")

const CONFIG = require("./config/config")


const app = express()

require('./db/mongoDb').connectToMongoDB()


app.get("/", (req, res) => {
    res.send({
        message : "Welcome to NoteIt!"
    })

})

app.listen(CONFIG.PORT, () => {
    console.log(`Server Running On Port ${CONFIG.PORT}`)

})

