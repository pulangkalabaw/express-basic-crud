// init
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const userRoutes = require('./route.js')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))

// mongoose connection
const db = mongoose.connection
const connectionString = process.env.ConnectionString
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
db.once('open', _ => { console.log('Database connected:', connectionString) })
db.on('error', err => { console.error('connection error:', err) })


// routes
app.get('/', (req, res) => {
    console.log('Redirecting to /users..')
    res.redirect('/users')
})
app.use('/users', userRoutes)

app.listen(port, (error) => {
    if (error) console.log(error)
    console.log(`Listening on port ${port}`)
})