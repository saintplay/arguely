import { User } from "../types";

export interface UserState {
  currentUser: User;
}

export const CHANGE_CURRENT_USER = "CHANGE_CURRENT_USER";

interface ChangeCurrentUser {
  type: typeof CHANGE_CURRENT_USER;
  payload: User;
}

export type UserActionTypes = ChangeCurrentUser;
