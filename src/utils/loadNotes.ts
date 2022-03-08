import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NoteProps } from "../interfaces/note.interface";

export const loadNotes = (uid: string) => {
  return new Promise<NoteProps[]>(function (resolve) {
    getDocs(collection(db, `${uid}/journal/notes/`))
      .then((notesSnap) => {
        const notes: NoteProps[] = [];
        notesSnap.forEach((snapHijo) => {
          const { title, date, body, imaUrl } = snapHijo.data();
          notes.push({
            id: snapHijo.id,
            title,
            date,
            body,
            imaUrl,
          });
        });
        resolve(notes);
      })
      .catch((e) => {
        throw new Error("Algo salio mal en llamar todos las notes:" + e);
      });
  });
};
