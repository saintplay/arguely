export interface LayoutState {
  opened: boolean;
  theme: string;
}

export const HIDE_LEFT_BAR = "HIDE_LEFT_BAR";
export const TOGGLE_LEFT_BAR = "TOGGLE_LEFT_BAR";
export const CHANGE_THEME = "CHANGE_THEME";

interface ToggleLeftBar {
  type: typeof TOGGLE_LEFT_BAR;
}
interface HideLeftBar {
  type: typeof HIDE_LEFT_BAR;
}
interface ChangeTheme {
  type: typeof CHANGE_THEME;
  payload: string;
}

export type LayoutActionTypes = ToggleLeftBar | HideLeftBar | ChangeTheme;
