import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { starNewNote } from "../../actions/notes";
import { RootState } from "../../interfaces/rootState.type";
import { JounalEntries } from "./JounalEntries";

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };
  const handleAddNew = () => {
    dispatch(starNewNote());
  };
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>
        <button type="button" onClick={handleLogout} className="btn btn-black">
          Logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New Entry</p>
      </div>

      <JounalEntries />
    </aside>
  );
};
