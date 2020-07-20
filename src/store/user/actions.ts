import { User } from "../types";
import { UserActionTypes, CHANGE_CURRENT_USER } from "./types";

export function changeCurrentUser(newUser: User): UserActionTypes {
  return {
    type: CHANGE_CURRENT_USER,
    payload: newUser,
  };
}
