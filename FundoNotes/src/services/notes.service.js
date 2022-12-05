/* eslint-disable prettier/prettier */
import { client } from '../config/redis';
import Notes from '../models/notes.model';
//import { client } from 'winston/lib/winston/config';

//create a new note
export const createNote = async (body) => {
  await client.del('getalldata');
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (UserID) => {
  const getNotesDetails = await Notes.find({ UserID });
  await client.set('getalldata',JSON.stringify(getNotesDetails));
  return getNotesDetails ;
};

//get a note by id
export const GetNote = async (id, UserID) => {
  const data = await Notes.findById({ _id: id, UserID: UserID });
  return data;
};

//update a note
export const updateNote = async (id,body, UserID) => {
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
export const archiveNote = async (_id, UserID) => {
  const note = await Notes.findOne({ _id: _id,
     UserID: UserID });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

//trash a note
export const trashNote = async (_id, UserID) => {
  const note = await Notes.findOne({ _id: _id,
    UserID: UserID });
  const isTrash = note.isTrash === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    { isTrash: isTrash },
    {
      new: true
    }
  );
  return data;
};

//pined a note
export const pinnote = async (_id, UserID) => {
  await client.del('getalldata')
  const note = await Notes.findOne({ _id: _id,
    UserID: UserID });
  const pinned = note.pinned === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    { pinned: pinned },
    {
      new: true
    }
  );
  return data;
};
