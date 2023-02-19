const router = require("express").Router()
const noteController = require('../controllers/notes.controllers')
const { verify } = require('../validators/jwtverify.validator') 



// CREATE POST
router.post('/create', verify, noteController.createNote)



// UPDATE POST
router.put('/:id',verify, noteController.updateNoteByID)


// DELETE POST
router.delete('/:id',verify, noteController.deleteNoteByID)


// GET POST BY ID
router.get('/:id', noteController.GetNoteByID)


// GET ALL POSTS
router.get('/', noteController.GetAllNotes)



module.exports = router