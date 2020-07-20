import { User } from "../types";
import { ServerActionTypes, ADD_USER } from "./types";

export function addUser(newUser: User): ServerActionTypes {
  return {
    type: ADD_USER,
    payload: newUser,
  };
}
