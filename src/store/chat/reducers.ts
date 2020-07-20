import { ChatState, ChatActionTypes, CHANGE_ACTIVE_THREAD } from "./types";

const initialState: ChatState = {
  activeThread: null,
};

export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case CHANGE_ACTIVE_THREAD: {
      return {
        ...state,
        activeThread: action.payload,
      };
    }
    default:
      return state;
  }
}
