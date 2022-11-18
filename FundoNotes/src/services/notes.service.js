/* eslint-disable prettier/prettier */
import Notes from '../models/notes.model';

//create a new note
export const createNote = async (body) => {
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (UserID) => {
  const data = await Notes.find({ UserID });
  return data;
};

//get a note by id
export const GetNote = async (id, UserID) => {
  const data = await Notes.findById({ _id: id, UserID: UserID });
  return data;
};

//update a note
export const updateNote = async (id, UserID, body) => {
  const data = await Notes.findByIdAndUpdate(
    {
      _id: id,
      UserID: UserID
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete a Single note
export const deleteNote = async (id, UserID) => {
  await Notes.findByIdAndDelete({ _id: id, UserID: UserID });
  return '';
};

//archieve a note
export const archiveNote = async (id, UserID) => {
  const note = await Notes.findOne({ _id: id, UserId: UserID });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

//trash a note
export const trashNote = async (id, UserID) => {
  const note = await Notes.findOne({ _id: id,
    UserID: UserID });
  const isTrash = note.isTrash === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id
    },
    { isTrash: isTrash },
    {
      new: true
    }
  );
  return data;
};
