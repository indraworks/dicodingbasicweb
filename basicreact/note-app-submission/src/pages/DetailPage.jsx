import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiArchive, FiEdit } from "react-icons/fi";

import { useNotes } from "../context/NotesContext";
import { useState, useEffect } from "react";

const DetailPage = () => {
  //smua functuon yg berhunngan dgn notes(CRUD) dan state
  //sudah ada di context dan siap dibagi di smua child /page2 yang ada
  const { getNote, deleteNote, archiveNote, unarchiveNote } = useNotes();
  //local state  hooks
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  //useParams utk ambil id dari browser
  const { id } = useParams();
  //const note = getNote(id); // gak dipakai kita update automaticly dari useEffect !
  const navigate = useNavigate();
  //gunaka useEffect utk melihat perubahan id dari params!
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const result = await getNote(id);
        if (!result.error) {
          //harus dot data krn bawaan dari json
          setNote(result.data);
        }
      } catch (error) {
        console.error("Error Fecthing note ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, getNote]);

  /*
response create/add note :
{
  "status": "success",
  "message": "Note created",
  "data": { <---------------------------------------------------sellalu data! 
      "id": "notes-_O6A6TJcCYUWO7t4",
      "title": "Hello, Notes!",
      "body": "My new notes.",
      "owner": "user-l-wposXQYGosf0ZA",
      "archived": false,
      "createdAt": "2022-07-28T10:12:12.396Z"
  }
}



*/

  // Proper console logging
  //console.log("Current note:", JSON.stringify(note, null, 2));

  if (!note) {
    return <p>Not found the Id!</p>;
  }

  //delete
  const handleDelete = async () => {
    if (window.confirm("Are you want to delete this note?")) {
      await deleteNote(id);
      navigate("/", { replace: true });
    }
    alert("Note deleted successfully!");
  };

  //put archive
  const handleArchive = async () => {
    await archiveNote(id);
    // window.location.href("/");
    navigate("/");
  };

  //put unArchive ( back to activeNote)
  const handleUnArchive = async () => {
    await unarchiveNote(id);
    //window.location.href("/archive");
    navigate("/archive");
  };

  //NOTE :ini nanti lari ke page edit!!
  const handleEdit = () => {
    console.log(`Navigating to: /notes/edit/${id}`);
    navigate(`/notes/edit/${id}`);
  };

  console.log("Current note:", JSON.stringify(note, null, 2));
  return (
    <div className="detail-page">
      <Link to={note.archived ? "/archive" : "/"} className="action">
        <FiArrowLeft />
      </Link>
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">
        {new Date(note.createdAt).toLocaleString()}
      </p>
      <p className="detail-page__body">{note.body}</p>

      <div className="detail-page__action">
        <button
          className="action"
          title="Delete"
          onClick={handleDelete}
        ></button>
        <button className="action" title="Edit" onClick={handleEdit}>
          <FiEdit />
        </button>

        {/* <Link to={`/notes/edit/${id}`} className="action" title="Edit">
          
        </Link> */}
        {note.archived ? (
          <button
            className="action"
            title="Unarchive"
            onClick={handleUnArchive}
          >
            <FiArchive />
          </button>
        ) : (
          <button className="action" title="Archive" onClick={handleArchive}>
            {" "}
            <FiArchive />
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
