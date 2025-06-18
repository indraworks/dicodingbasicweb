import React, { createContext, useContext, useEffect, useState } from "react";
//memamkai smua function CRUD pada notes yg ada di network-data,js
import {
  getActiveNotes,
  getArchiveNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNote,
  editNote,
} from "../utils/data";

//create context bernama noteContext
const NotesContext = createContext();
//buat Provider utk wraper

export const NotesProvider = () => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch ambil archiveNotes & activeNotes
  //function dilakukan jika kita memlakukan operasi CRUD
  //stlah operasi CRUD   createNote,removeNote, archive,unarchive ,getNote(id),editNote(id)
  //mngmbil perubahan  yg ter-update  dari notes/archive atau note(id) yg ada di API !

  const fetchNotes = async () => {
    //activekan loading
    setLoading(true);
    const active = await getActiveNotes();
    const archive = await getArchiveNotes();
    if (!active.error) setActiveNotes(active.data || []);
    if (!archive.error) setArchiveNotes(archive.data || []);
    setLoading(false);
  };
  //hanya sekali saja tiap refresh utk ambil fetch
  useEffect(() => {
    fetchNotes();
  }, []);

  //func createNote,removeNote, archive,unarchive ,getNote(id)
  const createNote = async ({ title, body }) => {
    const result = addNote({ title, body }); //contoh 1 saja
    //jadi stlah mlkukan addNote jika tak error naka hasil di tampun di result ( respinse dari API)
    //dan jalankan fetchNote dimana update state activeNote dan archiveNote!
    //yg  jalan func lainya sama !
    if (!result.error) {
      await fetchNotes();
    }
    return result;
  };

  const removeNote = async (id) => {
    const result = await deleteNote(id);
    if (!result.error) {
      await fetchNotes();
    }
    return result;
  };

  const archive = async (id) => {
    const result = await archiveNote(id);
    if (!result.error) {
      await fetchNotes();
    }
    return result;
  };
  const unarchive = async (id) => {
    const result = await unarchiveNote(id);
    if (!result.error) {
      await fetchNotes();
    }
    return result;
  };

  const getNoteById = async (id) => {
    const result = await getNote(id);
    return result;
  };

  //ini tidak ada di network-data!!!
  const updateNote = async (id, { title, body }) => {
    const result = await editNote(id, { title, body });
    if (!result.error) {
      await fetchNotes();
    }
    return result;
  };

  return (
    <NotesContext.Provider
      value={{
        activeNotes,
        archiveNotes,
        loading,
        createNote,
        //gunakan alias
        //sblah kiri alias
        deleteNote: removeNote,
        archiveNote: archive,
        unarchiveNote: unarchive,
        getNote: getNoteById,
        editNote: updateNote,
        refreshNote: fetchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
//consumer
export function useNotes() {
  return useContext(NotesContext);
}
/*
smua func yg kita pakai di context ini  diambil dari utils sbb:






*/
