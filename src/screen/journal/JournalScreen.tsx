import { useSelector } from "react-redux";
import { Note } from "../../components/journal/Note";
import { NothingSelected } from "../../components/journal/NothingSelected";
import { Sidebar } from "../../components/journal/Sidebar";
import { RootState } from "../../interfaces/rootState.type";

export default function JournalScreen() {
  const { active } = useSelector((state: RootState) => state.notes);
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main>{active ? <Note /> : <NothingSelected />}</main>
    </div>
  );
}
