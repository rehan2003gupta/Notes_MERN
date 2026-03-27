import { Router } from "express";
const router = Router();
import protect from "../middlewares/authMiddleware.js";
// ADD THE .js EXTENSION HERE
import { getNotes, createNote, deleteNote, updateNote } from "../controllers/noteController.js";

// routes
router.get("/",protect, getNotes);
router.post("/",protect, createNote);
router.delete("/:id",protect, deleteNote);
router.put("/:id",protect, updateNote);

export default router;
