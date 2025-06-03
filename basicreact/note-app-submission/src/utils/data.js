//data awal tidak boleh dimutation langsung

export const _initialNotes = Object.freeze([
  {
    id: "notes-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
]);

//deepCOpy dari initial
let _notes = JSON.parse(JSON.stringify(_initialNotes));
//helper function dari deepcopy _notes
const _cloneNotes = () => JSON.parse(JSON.stringify(_notes));

//Core function

//getter return ke clonenya
const getAllNotes = () => _cloneNotes();
const getActiveNotes = () => _cloneNotes().filter((note) => !note.archived);
const getArchiveNotes = () => _cloneNotes().filter((note) => note.archived);
const getNote = (id) => _cloneNotes().find((note) => note.id === id);

//Mutatuon (imutable updatenya )
//addNote
const addNote = ({ title, body }) => {
  const newNote = {
    id: `notes-${Date.now()}`,
    title: title || "(untitled)",
    body: body,
    createdAt: new Date().toISOString(),
    archived: false,
  };
  _notes = [..._cloneNotes(), newNote]; //update _note
  return newNote;
};
//deleteNote
const deleteNote = (id) => {
  _notes = _cloneNotes().filter((note) => note.id !== id);
};

//editNote
const editNote = (id, title, body) => {
  _notes = _cloneNotes().map((note) =>
    note.id === id ? { ...note, title: title, body: body } : note
  );
};

//archiveNote
const archiveNote = (id) => {
  _notes = _cloneNotes().map((note) =>
    note.id === id ? { ...note, archived: true } : note
  );
};

//unarchiveNote
const unarchiveNote = (id) => {
  _notes = _cloneNotes().map((note) =>
    note.id === id ? { ...note, archived: false } : note
  );
};

export {
  //algetter
  getAllNotes,
  getActiveNotes,
  getArchiveNotes,
  getNote,
  //mutation
  addNote,
  deleteNote,
  editNote,
  archiveNote,
  unarchiveNote,
};
