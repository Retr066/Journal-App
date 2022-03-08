import { actionNoteProps } from "../interfaces/action.interface";
import { NoteProps } from "../interfaces/note.interface";
import { typesActionNotes } from "../types/types";

type stateProps = {
  notes: NoteProps[];
  active: null | NoteProps;
};

const initialState: stateProps = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action: actionNoteProps) => {
  switch (action.type) {
    case typesActionNotes.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case typesActionNotes.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case typesActionNotes.notesLoad:
      return {
        ...state,
        notes: action.payload,
      };
    case typesActionNotes.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if ("id" in action.payload)
            return note.id === action.payload.id ? action.payload : note;
        }),
      };
    case typesActionNotes.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => {
          if (typeof action.payload === "string")
            return note.id !== action.payload;
        }),
      };
    case typesActionNotes.notesLogoutCleaning:
      return initialState;
    default:
      return state;
  }
};
