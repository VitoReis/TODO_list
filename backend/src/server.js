const express = require('express')
const app = express()
app.use(express.json())
var cors = require('cors')
app.use(cors())
const router = require('./routes')
app.use(router)

require('dotenv').config()
const PORT = process.env.PORT || 3001
const MONGOURL = process.env.MONGOURL

const mongoose = require('mongoose')
mongoose.connect(MONGOURL)

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
