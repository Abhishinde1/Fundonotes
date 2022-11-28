/* eslint-disable prettier/prettier */
import express from 'express';
import * as notesController from '../controllers/notes.comtroller';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck } from '../middlewares/redis.middleware';
import { NewNotesValidator } from '../validators/user.validator';


const router = express.Router();

//route to create a note
router.post('',NewNotesValidator, userAuth, notesController.createNote),

//route to get all notes
router.get('', userAuth,redisCheck, notesController.getAllNotes);

//router to get a note by id
router.get('/:_id', userAuth, notesController.GetNote);

//route to update a note
router.put('/:_id', userAuth, notesController.updateNote);

//route to delete a note
router.delete('/:_id', userAuth, notesController.deleteNote);

//route to archieve a note
router.put('/:_id/archive', userAuth, notesController.archiveNote);

//route to trash a note
router.put('/:_id/trash', userAuth, notesController.trashNote);

export default router;
