import { ServerState, ServerActionTypes, ADD_USER } from "./types";
import { getUsersMock } from "../../lib/data";

const initState: ServerState = {
  users: getUsersMock(),
};

export function serverReducer(
  state = initState,
  action: ServerActionTypes
): ServerState {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    default:
      return state;
  }
}
