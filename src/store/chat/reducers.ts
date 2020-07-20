import {
  ChatState,
  ChatActionTypes,
  CHANGE_ACTIVE_THREAD,
  ADD_MESSAGE,
} from "./types";

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
    case ADD_MESSAGE: {
      if (!state.activeThread) return state;

      return {
        ...state,
        activeThread: {
          ...state.activeThread,
          messages: [...state.activeThread.messages, action.payload],
        },
      };
    }
    default:
      return state;
  }
}
