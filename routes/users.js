const router = require("express").Router()
const userController = require('../controllers/users.controller')
const { verify } = require('../validators/jwtverify.validator') 



// GET USER BY ID
router.get('/:id', userController.GetUserByID)


// UPDATE USER
router.put('/:id', verify, userController.UpdateUserByID)


// DELETE USER
router.delete('/delete/:id', verify, userController.DeleteUserByID)


module.exports = router