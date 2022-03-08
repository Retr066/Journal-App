import { actionProps } from "../interfaces/action.interface";
import { UserProps } from "../interfaces/user.interface";
import { typesActionAuth } from "../types/types";

export const authReducer = (state: UserProps = {}, action: actionProps) => {
  switch (action.type) {
    case typesActionAuth.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case typesActionAuth.logout:
      return {};

    default:
      return state;
  }
};
