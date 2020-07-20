import { User, Thread, ChatEntry } from "../types";

export interface ServerState {
  users: User[];
  threads: Thread[];
  categories: string[];
  activeThreadId: number | null;
}

export const ADD_THREAD = "ADD_THREAD";
export const CHANGE_ACTIVE_THREAD = "CHANGE_ACTIVE_THREAD";
export const ADD_THREAD_MESSAGE = "ADD_THREAD_MESSAGE";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";

interface AddUser {
  type: typeof ADD_USER;
  payload: User;
}

interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: User;
}

interface AddThread {
  type: typeof ADD_THREAD;
  payload: Thread;
}

interface ChangeActiveChat {
  type: typeof CHANGE_ACTIVE_THREAD;
  payload: number;
}

interface AddThreadMessage {
  type: typeof ADD_THREAD_MESSAGE;
  payload: {
    threadId: Number;
    entry: ChatEntry;
  };
}

export type ServerActionTypes =
  | AddUser
  | AddThread
  | UpdateUser
  | AddThreadMessage
  | ChangeActiveChat;
