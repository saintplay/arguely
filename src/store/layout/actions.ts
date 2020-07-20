import { LayoutActionTypes, CHANGE_THEME, TOGGLE_LEFT_BAR } from "./types";

export function toggleLeftBar(): LayoutActionTypes {
  return {
    type: TOGGLE_LEFT_BAR,
  };
}

export function changeTheme(newTheme: string): LayoutActionTypes {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  };
}
