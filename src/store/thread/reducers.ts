import { ThreadState, ThreadActionTypes, ADD_THREAD } from "./types";
import { getThreadsMock } from "../../lib/data";

const initialState: ThreadState = {
  threads: getThreadsMock(),
};

export function threadReducer(
  state = initialState,
  action: ThreadActionTypes
): ThreadState {
  switch (action.type) {
    case ADD_THREAD: {
      return {
        ...state,
        threads: [...state.threads, action.payload],
      };
    }
    default:
      return state;
  }
}
