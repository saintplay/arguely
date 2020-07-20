import sample from "lodash.sample";
import { UserState, UserActionTypes, CHANGE_CURRENT_USER } from "./types";
import { adjectives, animals, colors } from "../../lib/dictionaries";

const initialState: UserState = {
  currentUser: {
    id: Date.now(),
    nickname: `${sample(adjectives)}-${sample(animals)}`,
    color: sample(colors) as string,
  },
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case CHANGE_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
}
