import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "./Router";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { notes, deleteNote, getAllNotes , editNote} = context;
  useEffect(() => {
    getAllNotes();
  }, []);

  const closeRef = useRef(null)


  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const editNotePop = (e)=>{
    setNote({id:e._id ,etitle : e.title , edescription : e.description , etag : e.tag}) 
  }

  const upateNote=()=>{
    editNote(note.id ,note.etitle , note.edescription , note.etag);
    closeRef.current.click();
    console.log(props.showAlert);
    props.showAlert("Note Upated Successfully" , "success")

  }

  const delNote=(id)=>{
    deleteNote(id)
    props.showAlert("Note Deleted Successfully" , "warning")
  }

  
  
  return (
    <>
      <div className="row">
        {notes.length === 0 && <p>No Notes To Show</p>}
        {notes.map((e) => {
          return (
            <div className="col-md-3" key={e._id}>
              <div className="card my-3">
                <div className="card-body">
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <h5 className="card-title">
                      {e.title}
                      <sup style={{ margin: "0px 5px" }}>{e.tag}</sup>
                    </h5>
                    <div>
                      <i
                        className="fas fa-trash-alt mx-2"
                        onClick={() => {
                          delNote(e._id);
                        }}
                      ></i>
                      <i
                        className="far fa-edit mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#reg-modal"
                        onClick={()=>{editNotePop(e)}}
                      ></i>
                    </div>
                  </div>
                  <p className="card-text">{e.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="modal fade"
        id="reg-modal"
        tabIndex="-1"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-title">
                Edit a Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="etitle"
                  placeholder="Enter Note Title"
                  onChange={handleChange}
                  value={note.etitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="etag"
                  placeholder="Enter You Tag"
                  onChange={handleChange}
                  value={note.etag}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Note
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="edescription"
                  rows="3"
                  placeholder="Enter You Note"
                  onChange={handleChange}
                  value={note.edescription}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                Close
              </button>
              <button disabled={note.edescription.length<5 || note.etitle.length<3} type="button" onClick={upateNote} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
