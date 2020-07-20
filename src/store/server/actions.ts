import { User, Thread } from "../types";
import { ServerActionTypes, ADD_USER, ADD_THREAD } from "./types";

export function addUser(newUser: User): ServerActionTypes {
  return {
    type: ADD_USER,
    payload: newUser,
  };
}

export function addThread(newThread: Thread): ServerActionTypes {
  return {
    type: ADD_THREAD,
    payload: newThread,
  };
}
