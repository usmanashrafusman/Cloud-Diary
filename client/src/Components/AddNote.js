import React, { useContext, useState } from "react";
import { NoteContext } from "./Router";

function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = () => {
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note Added Sucessfully" , "primary")
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h3>Add a Note</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={note.title}
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter Note Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={note.tag}
          className="form-control"
          id="tag"
          name="tag"
          placeholder="Enter You Tag"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Note
        </label>
        <textarea
          onChange={handleChange}
          value={note.description}
          className="form-control"
          id="description"
          name="description"
          rows="3"
          placeholder="Enter You Note"
        ></textarea>
      </div>
      <button
        className="btn btn-primary"
        disabled={note.description.length < 5 || note.title.length < 3}
        onClick={handleClick}
      >
        Add Note
      </button>
    </div>
  );
}

export default AddNote;
