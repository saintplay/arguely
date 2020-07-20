import {
  ServerState,
  ServerActionTypes,
  ADD_USER,
  ADD_THREAD,
  UPDATE_USER,
} from "./types";
import {
  getUsersMock,
  getThreadsMock,
  getCategoriesMock,
} from "../../lib/data";

const initState: ServerState = {
  users: getUsersMock(),
  threads: getThreadsMock(),
  categories: getCategoriesMock(),
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
    case ADD_THREAD: {
      return {
        ...state,
        threads: [...state.threads, action.payload],
      };
    }
    case UPDATE_USER: {
      const userIndex = state.users.findIndex(
        (u) => u.id === action.payload.id
      );

      if (userIndex !== -1) {
        const users = [...state.users];
        users[userIndex] = action.payload;
        return {
          ...state,
          users,
        };
      }
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    default:
      return state;
  }
}
