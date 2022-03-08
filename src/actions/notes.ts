import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { actionNoteProps } from "../interfaces/action.interface";
import { NoteProps } from "../interfaces/note.interface";
import { typesActionNotes } from "../types/types";
import { Toast } from "../utils/configSwal";
import { fileUpload } from "../utils/fileUpload";
import { loadNotes } from "../utils/loadNotes";

type activeNoteProps = (id: string, note: NoteProps) => actionNoteProps;
type addNewNoteProps = (id: string, note: NoteProps) => actionNoteProps;
type setNoteProps = (notes: NoteProps[]) => actionNoteProps;
type starNewNoteProps = () => (dispatch: Dispatch, getState: Function) => void;
type startLoadingNotesProps = (uid: string) => (dispatch: Dispatch) => void;
type startSaveNoteProps = (
  note: NoteProps
) => (dispatch: Dispatch, getState: Function) => void;
type refreshNoteProps = (note: NoteProps) => actionNoteProps;
type startUploading = (
  file: any
) => (dispatch: Dispatch<any>, getState: Function) => void;

type startDeletingProps = (
  id: string
) => (dispatch: Dispatch, getState: Function) => void;

export const starNewNote: starNewNoteProps = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote: NoteProps = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    addDoc(collection(db, `${uid}/journal/notes`), newNote).then((doc) => {
      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));
    });
  };
};

export const activeNote: activeNoteProps = (id, note) => ({
  type: typesActionNotes.notesActive,
  payload: {
    id,
    ...note,
  },
});
export const addNewNote: addNewNoteProps = (id, note) => ({
  type: typesActionNotes.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes: startLoadingNotesProps = (uid) => {
  return (dispatch) => {
    loadNotes(uid).then((notes) => dispatch(setNotes(notes)));
  };
};

export const setNotes: setNoteProps = (notes) => ({
  type: typesActionNotes.notesLoad,
  payload: notes,
});

export const startSaveNote: startSaveNoteProps = (note) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.imaUrl) delete note.imaUrl;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
    updateDoc(noteRef, noteToFirestore)
      .then(() => {
        if (note.id) dispatch(refreshNote(note));
        Toast.fire({
          icon: "success",
          title: "Saved: " + note.title,
        });
      })
      .catch((e) => {
        Toast.fire({
          icon: "error",
          title: "Error: " + e.message,
        });
      });
  };
};

export const refreshNote: refreshNoteProps = (note) => ({
  type: typesActionNotes.notesUpdated,
  payload: note,
});

export const startUploading: startUploading = (file) => {
  return (dispatch, getState) => {
    const { active: note }: { active: NoteProps } = getState().notes;

    Swal.fire({
      title: "Uploading....",
      text: "Please wait...",
      allowOutsideClick: true,
      timerProgressBar: true,
      backdrop: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    fileUpload(file)
      .then((imaUrl) => {
        if (typeof imaUrl === "string") note.imaUrl = imaUrl;
        dispatch(startSaveNote(note));
        Swal.close();
      })
      .catch((e) => {
        throw e;
      });
  };
};

export const startDeleting: startDeletingProps = (id) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`);
    deleteDoc(noteRef).then(() => dispatch(deleteNote(id)));
  };
};
export const deleteNote = (id: string) => ({
  type: typesActionNotes.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: typesActionNotes.notesLogoutCleaning,
});
