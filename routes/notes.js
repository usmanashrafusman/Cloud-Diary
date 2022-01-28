const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

//Route 1 getting all notes of user through get
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    // getting user's all notes
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
});

// Route 2 add new note Post.
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atlest 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // destruturing title , description , tag
      const { title, description, tag } = req.body;

      // if any error occur show error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //sending data to DB.
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //Saving note of DB
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("An Error Occur");
    }
  }
);

//Route 3 Update user's note
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  let success = false;
  // destruturing title , description , tag
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // finding note to delete by id
    let note = await Note.findById(req.params.id);

    // if note with id don't exist
    if (!note) {
      return res.status(404).json({success , msg : "Note Not Found"});
    }

    //if user's id & the note created with user's id is different
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({success , msg:"Not Allowed"});
    }

    // updating note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    success = true;
    res.json({ note });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
});

// Route 4 delete the note
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    //getting the id of note to delete
    let note = await Note.findById(req.params.id);

    // if id not exist's
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // if note is not create by same user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // deleting note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted ", note: note });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
});

module.exports = router;
