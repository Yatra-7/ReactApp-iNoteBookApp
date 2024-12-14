import { useState } from "react";
import NoteContext from "./noteContex";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1NmRmYTUwZjAxYTk3YWQ5NWQ5ZTQyIn0sImlhdCI6MTczMzgwNzgwMn0.VKbYK4dcS78aS92HPjD-DaxH0mr1OWSPtiJpyhBdUhs",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a not
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1NmRmYTUwZjAxYTk3YWQ5NWQ5ZTQyIn0sImlhdCI6MTczMzgwNzgwMn0.VKbYK4dcS78aS92HPjD-DaxH0mr1OWSPtiJpyhBdUhs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1NmRmYTUwZjAxYTk3YWQ5NWQ5ZTQyIn0sImlhdCI6MTczMzgwNzgwMn0.VKbYK4dcS78aS92HPjD-DaxH0mr1OWSPtiJpyhBdUhs",
      },
    });
    const json = response.json();
    // console.log(json);

    // console.log("deleting note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit  a note
  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1NmRmYTUwZjAxYTk3YWQ5NWQ5ZTQyIn0sImlhdCI6MTczMzgwNzgwMn0.VKbYK4dcS78aS92HPjD-DaxH0mr1OWSPtiJpyhBdUhs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;