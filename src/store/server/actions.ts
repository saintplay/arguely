import { User, Thread } from "../types";
import { ServerActionTypes, ADD_USER, ADD_THREAD, UPDATE_USER } from "./types";

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

export function updateUser(updatedUser: User): ServerActionTypes {
  return {
    type: UPDATE_USER,
    payload: updatedUser,
  };
}
