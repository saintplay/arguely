import {
  ServerState,
  ServerActionTypes,
  ADD_USER,
  ADD_THREAD,
  UPDATE_USER,
  ADD_THREAD_MESSAGE,
  CHANGE_ACTIVE_THREAD,
  DELETE_THREAD_MESSAGE,
  ADD_PRE_THREAD,
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
  activeThreadId: null,
  activePreThread: null,
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
    case ADD_PRE_THREAD: {
      return {
        ...state,
        activeThreadId: null,
        activePreThread: action.payload,
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
    case CHANGE_ACTIVE_THREAD: {
      return {
        ...state,
        activeThreadId: action.payload,
        activePreThread: null,
      };
    }
    case ADD_THREAD_MESSAGE: {
      const threadIndex = state.threads.findIndex(
        (t) => t.id === action.payload.threadId
      );

      if (threadIndex === -1) return state;

      const threads = [...state.threads];
      threads[threadIndex] = {
        ...threads[threadIndex],
        messages: [...threads[threadIndex].messages, action.payload.entry],
      };

      return {
        ...state,
        threads,
      };
    }
    case DELETE_THREAD_MESSAGE: {
      const threadIndex = state.threads.findIndex(
        (t) => t.id === action.payload.threadId
      );

      if (threadIndex === -1) return state;

      const entryIndex = state.threads[threadIndex].messages.findIndex(
        (m) => m.id === action.payload.entryId
      );

      if (entryIndex === -1) return state;

      const threads = [...state.threads];
      threads[threadIndex] = {
        ...threads[threadIndex],
        messages: threads[threadIndex].messages.filter(
          (m) => m.id !== action.payload.entryId
        ),
      };

      return {
        ...state,
        threads,
      };
    }
    default:
      return state;
  }
}
