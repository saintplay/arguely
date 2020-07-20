import { Thread } from "../types";

export interface ChatState {
  activeThread: Thread | null;
}

export const CHANGE_ACTIVE_THREAD = "CHANGE_ACTIVE_THREAD";

interface ChangeActiveChat {
  type: typeof CHANGE_ACTIVE_THREAD;
  payload: Thread;
}

export type ChatActionTypes = ChangeActiveChat;
