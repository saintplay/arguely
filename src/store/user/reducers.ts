import { UserState, UserActionTypes, CHANGE_CURRENT_USER } from "./types";

const initialState: UserState = {
  currentUser: {
    id: Date.now(),
    nickname: "Hola mundo",
    color: "red",
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
