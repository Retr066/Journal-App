import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";
import { NoteProps } from "../../interfaces/note.interface";
import { RootState } from "../../interfaces/rootState.type";

export const NoteAppBar = () => {
  const dispatch = useDispatch();
  const { active: note }: { active: NoteProps } = useSelector(
    (state: RootState) => state.notes
  );
  const handleSave = () => {
    dispatch(startSaveNote(note));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    dispatch(startUploading(file));
  };
  const handlePictureClick = (e: any) => {
    document.getElementById("fileSelector")?.click();
  };
  return (
    <div className="notes_appbar">
      <span>28 de agosto 2022</span>
      <input
        type="file"
        id="fileSelector"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn btn-black" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn btn-black" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
