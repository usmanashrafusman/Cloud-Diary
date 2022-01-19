import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Alerts from "./Alerts";
import Login from "./Login";
import SignUp from "./SignUp";

const NoteContext = createContext();
function Router() {
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let status = localStorage.getItem("token")
 useEffect(() => {
  if (localStorage.getItem("token")) {
    setIsLoggedIn(true);
  }
 }, [status]);
 

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    const index = notes.findIndex((e) => e._id === id);
    notes.splice(index, 1);
    setNotes([...notes]);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Alerts alert={alert} />

      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, getAllNotes, editNote }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoggedIn ? (
                <Home showAlert={showAlert} />
              ) : (
                <Login showAlert={showAlert} />
              )
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignUp showAlert={showAlert} />}
          />
        </Routes>
      </NoteContext.Provider>
    </BrowserRouter>
  );
}

export default Router;
export { NoteContext };
