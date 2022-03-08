import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { NoteProps } from "../../interfaces/note.interface";

export const JounalEntry = ({ id, title, body, date, imaUrl }: NoteProps) => {
  const noteDay = moment(date);
  const dispacth = useDispatch();
  const handleEntryClick = () => {
    if (id !== undefined)
      dispacth(
        activeNote(id, {
          title,
          body,
          date,
          imaUrl,
        })
      );
  };

  return (
    <div
      className="journal__entry animate__animated animate__fadeInDown animate__faster"
      onClick={handleEntryClick}
    >
      {imaUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${imaUrl})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDay.format("dddd")}</span>
        <h4>{noteDay.format("Do")} </h4>
      </div>
    </div>
  );
};
