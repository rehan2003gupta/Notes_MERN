import Note from "../models/noteModel.js";

// GET all notes
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// CREATE note
export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new Error("All fields required");
    }

    const note = await Note.create({ title, content,user: req.user._id, });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// DELETE note
export const deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// UPDATE note
export const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
};