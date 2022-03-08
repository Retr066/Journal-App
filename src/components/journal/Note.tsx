import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import useForm from "../../hooks/useForm";
import { NoteProps } from "../../interfaces/note.interface";
import { RootState } from "../../interfaces/rootState.type";
import { NoteAppBar } from "./NoteAppBar";

export const Note = () => {
  const { active: note }: { active: NoteProps } = useSelector(
    (state: RootState) => state.notes
  );
  const {
    values: formValues,
    handleInputsChange,
    resetState,
  } = useForm<NoteProps>(note);
  const dispatch = useDispatch();
  const { title, body, id } = formValues;

  const isActiveId = useRef(note.id);

  useEffect(() => {
    if (note.id !== isActiveId.current) {
      resetState(note);
      isActiveId.current = note.id;
    }
  }, [note, resetState]);

  useEffect(() => {
    if (id) dispatch(activeNote(id, { ...formValues }));
  }, [formValues]);

  const handleDelete = () => {
    if (id) dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          autoComplete="off"
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          onChange={handleInputsChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputsChange}
        />
        {note.imaUrl && (
          <div className="notes_image">
            <img alt="imagen" src={note.imaUrl} />
          </div>
        )}
      </div>
      <div className="btn btn-danger" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
};
