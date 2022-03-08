import { actionUIProps } from "../interfaces/action.interface";
import { uiProps } from "../interfaces/ui.interface";
import { typesActionUI } from "../types/types";

export const uiReducer = (
  state: uiProps = {
    loading: false,
    msgError: null,
  },
  action: actionUIProps
) => {
  switch (action.type) {
    case typesActionUI.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case typesActionUI.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
