const Note = require('../models/notes')


async function GetAllNotes(req, res) {
    const username = req.query.user
    try {
        let notes;
        if (username) {
            notes = await Note.find({ username })
        } else {
            notes = await Note.find()
        }
        res.status(200).json(notes)
    }catch(err){
        res.status(500).json(err)
    }
}


async function GetNoteByID(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).json("Note not Found")
        }
    }catch(err){
        res.status(500).json(err)
    }
}

async function createNote(req, res) {
    const newNote = new Note({

        title : req.body.title,
        description: req.body.description || title,
        username: req.body.username,
        body : req.body.body,

    })
    try {
        const savedNote = await newNote.save()
        res.status(200).json(savedNote)
    } catch (err){
        res.status(500).json(err)
    }
}

async function updateNoteByID(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (note.username === req.body.username) {
            try {
                const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new: true}
                )
                res.status(200).json(updatedNote)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your note!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function deleteNoteByID(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (note.username === req.body.username) {
            try {
                await note.delete()
                res.status(200).json("Note has been deleted...")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only delete your note!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports = {
    GetAllNotes,
    GetNoteByID,
    createNote,
    updateNoteByID,
    deleteNoteByID
}