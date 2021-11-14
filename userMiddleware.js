const express = require('express')
const app = express()
const userModel = require('./models/User.js')

const getUser = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.id)
        if (!user) {
            res.status(400).json({ message: "Coudn't find the user." })
            return
        }
        res.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const findUniqueUser = async (req, res, next) => {
    try {
        if (req.body.name != null) {
            let user = await userModel.find({ name: req.body.name })
            // dups
            if (user.length != 0) {
                res.status(400).json({ message: "The name " + req.body.name + " is already exist." })
                return
            }
            else {
                next()
            }
        }
        else {
            res.status(400).json({ message: "Please provide a name." })
            return
        }
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}
module.exports = { getUser, findUniqueUser }