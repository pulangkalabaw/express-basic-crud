const express = require('express')
const app = express()
const userModel = require('./models/User.js')
const { getUser, findUniqueUser } = require('./userMiddleware.js')
const router = express.Router()

// Get all records
router.get('/', async (req, res) => {
    try {
        let users = await userModel.find({})
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
})

// Get record
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Insert record
router.post('/add', findUniqueUser, async (req, res) => {
    let newUser = new userModel({
        name: req.body.name,
        age: req.body.age,
    })
    try {
        newUser = await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
})

// Update record
router.patch('/:id', getUser, async (req, res) => {
    
    try {
        res.user.name = req.body.name
        res.user.age = req.body.age
        updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
})

// Delete record
router.delete('/:id', getUser, async (req, res) => {
    try {
        res.user.remove()
        res.json({ message: "Successfully deleted."})
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    } 

})

module.exports = router