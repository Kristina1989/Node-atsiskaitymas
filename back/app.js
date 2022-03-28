const express = require("express")
const app = express()
const cors = require('cors')
const mainRouter = require('./router/mainRouter')
const mongoose = require("mongoose")
const session = require('express-session')
require("dotenv").config()

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("Database connection successful")
}).catch(e => {
    console.log(e)
    console.log("Failed o connect")
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(cors({credentials: true, origin: true}))
app.use(express.json())
app.use("/", mainRouter)

app.listen(4000)