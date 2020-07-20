import { Thread, ChatEntry } from "../types";

export interface ChatState {
  activeThread: Thread | null;
}

export const CHANGE_ACTIVE_THREAD = "CHANGE_ACTIVE_THREAD";
export const ADD_MESSAGE = "ADD_MESSAGE";

interface ChangeActiveChat {
  type: typeof CHANGE_ACTIVE_THREAD;
  payload: Thread;
}
interface AddMessage {
  type: typeof ADD_MESSAGE;
  payload: ChatEntry;
}

export type ChatActionTypes = ChangeActiveChat | AddMessage;
