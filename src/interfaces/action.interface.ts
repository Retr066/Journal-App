import {
  typesActionAuth,
  typesActionNotes,
  typesActionUI,
} from "../types/types";
import { NoteProps } from "./note.interface";
import { uiProps } from "./ui.interface";
import { UserReducerProps } from "./user.interface";

export interface actionProps {
  payload: UserReducerProps;
  type: typesActionAuth;
}
export interface actionUIProps {
  payload: uiProps;
  type: typesActionUI;
}
export interface actionNoteProps {
  payload: payloadProps;
  type: typesActionNotes;
}

type payloadProps = NoteProps | NoteProps[];
