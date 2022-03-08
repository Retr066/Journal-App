import { typesActionUI } from "../types/types";

export const startLoading = () => ({
  type: typesActionUI.uiStartLoading,
});
export const finishLoading = () => ({
  type: typesActionUI.uiFinishLoading,
});
