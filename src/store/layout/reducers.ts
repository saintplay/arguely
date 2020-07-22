import get from "lodash.get";

import {
  LayoutState,
  LayoutActionTypes,
  TOGGLE_LEFT_BAR,
  CHANGE_THEME,
  HIDE_LEFT_BAR,
} from "./types";
import { DEFAULT_THEME, APP_THEMES } from "../../theme";

const initialState: LayoutState = {
  opened: false,
  theme: DEFAULT_THEME,
};

export function layoutReducer(
  state = initialState,
  action: LayoutActionTypes
): LayoutState {
  switch (action.type) {
    case TOGGLE_LEFT_BAR: {
      return {
        ...state,
        opened: !state.opened,
      };
    }
    case HIDE_LEFT_BAR: {
      return {
        ...state,
        opened: false,
      };
    }
    case CHANGE_THEME: {
      return {
        ...state,
        theme: get(APP_THEMES, action.payload, DEFAULT_THEME),
      };
    }
    default:
      return state;
  }
}
