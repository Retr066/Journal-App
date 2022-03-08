import React from "react";
import { useSelector } from "react-redux";
import { NoteProps } from "../../interfaces/note.interface";
import { RootState } from "../../interfaces/rootState.type";
import { JounalEntry } from "./JounalEntry";

export const JounalEntries = () => {
  const { notes }: { notes: NoteProps[] } = useSelector(
    (state: RootState) => state.notes
  );

  return (
    <div className="journal__entries ">
      {notes.map((note) => (
        <JounalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};
