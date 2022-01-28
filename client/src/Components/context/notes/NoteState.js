import NoteContext from "./noteContext";

const NoteState = (props) => {
  return (
    <NoteContext.Provider value={{ fName: "usman" }}>
      {props.childern}
    </NoteContext.Provider>
  );
};

export default NoteState;
