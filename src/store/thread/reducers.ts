import { ThreadState, ThreadActionTypes, ADD_THREAD } from "./types";
import { getThreadMock } from "../../lib/data";

const initialState: ThreadState = {
  threads: [
    { ...getThreadMock(), id: 1, name: "Chat 1" },
    { ...getThreadMock(), id: 2, name: "Chat 2" },
    { ...getThreadMock(), id: 3, name: "Chat 3" },
    { ...getThreadMock(), id: 4, name: "Chat 4" },
    { ...getThreadMock(), id: 5, name: "Chat 5" },
  ],
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
