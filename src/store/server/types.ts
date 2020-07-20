import { User, Thread } from "../types";

export interface ServerState {
  users: User[];
  threads: Thread[];
  categories: string[];
}

export const ADD_THREAD = "ADD_THRAD";
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

export type ServerActionTypes = AddUser | AddThread | UpdateUser;
