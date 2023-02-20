const router = require("express").Router()
const noteController = require('../controllers/notes.controllers')
const { verify } = require('../validators/jwtverify.validator') 



// CREATE NOTE
router.post('/create', verify, noteController.createNote)



// UPDATE NOTE
router.put('/:id',verify, noteController.updateNoteByID)


// DELETE NOTE
router.delete('/:id',verify, noteController.deleteNoteByID)


// GET NOTE BY ID
router.get('/:id', noteController.GetNoteByID)


// GET ALL NOTES
router.get('/', noteController.GetAllNotes)



module.exports = router