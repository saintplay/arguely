import { User, Thread, ChatEntry } from "../types";

export interface ServerState {
  users: User[];
  threads: Thread[];
  categories: string[];
  activeThreadId: number | null;
  activePreThread: Thread | null;
}

export const ADD_THREAD = "ADD_THREAD";
export const ADD_PRE_THREAD = "ADD_PRE_THREAD";
export const CHANGE_ACTIVE_THREAD = "CHANGE_ACTIVE_THREAD";
export const ADD_THREAD_UNSEEN = "ADD_THREAD_UNSEEN";
export const ADD_THREAD_MESSAGE = "ADD_THREAD_MESSAGE";
export const DELETE_THREAD_MESSAGE = "DELETE_THREAD_MESSAGE";
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

interface AddPreThread {
  type: typeof ADD_PRE_THREAD;
  payload: Thread;
}

interface ChangeActiveChat {
  type: typeof CHANGE_ACTIVE_THREAD;
  payload: number;
}

interface AddThreadUnseen {
  type: typeof ADD_THREAD_UNSEEN;
  payload: {
    threadId: number;
  };
}

interface AddThreadMessage {
  type: typeof ADD_THREAD_MESSAGE;
  payload: {
    threadId: number;
    entry: ChatEntry;
  };
}

interface DeleteThreadMessage {
  type: typeof DELETE_THREAD_MESSAGE;
  payload: {
    threadId: number;
    entryId: number;
  };
}

export type ServerActionTypes =
  | AddUser
  | AddThread
  | AddPreThread
  | UpdateUser
  | AddThreadUnseen
  | AddThreadMessage
  | DeleteThreadMessage
  | ChangeActiveChat;
