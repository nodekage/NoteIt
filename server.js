const express = require("express")
const CONFIG = require("./config/config")
const app = express()

require('./db/mongoDb').connectToMongoDB()

const authRoute = require('./routes/auth')
const noteRoute = require('./routes/notes')
const userRoute = require('./routes/users')


app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/notes', noteRoute)
app.use('/api/v1/users', userRoute)


app.get("/", (req, res) => {
    res.send({
        message : "Welcome to NoteIt!"
    })

})

app.listen(CONFIG.PORT, () => {
    console.log(`Server Running On Port ${CONFIG.PORT}`)

})

