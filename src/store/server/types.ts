import { User } from "../types";

export interface ServerState {
  users: User[];
}

export const ADD_USER = "ADD_USER";

interface AddUser {
  type: typeof ADD_USER;
  payload: User;
}
export type ServerActionTypes = AddUser;
