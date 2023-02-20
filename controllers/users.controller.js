const User = require('../models/user')
const bcrypt = require('bcrypt')
const Note = require('../models/notes')

async function GetUserByID(req, res) {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    }catch(err) {
        res.status(500).json(err)    }
}


async function UpdateUserByID(req, res) {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true})
            res.status(200).json(updateduser)

        } catch (err) {
            res.status(500).json(err)
        }
        
    } else {
        res.status(401).json("You can only update your account!")
    }
}


async function DeleteUserByID(req, res) {
    if (req.body.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Note.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...")

            }  catch (err){
                res.status(500).json(err)
            }
        }  catch (err) {
            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can only delete your account!")
    }
}

module.exports = {
    GetUserByID,
    UpdateUserByID,
    DeleteUserByID
}