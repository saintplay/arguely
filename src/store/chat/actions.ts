import { Thread, ChatEntry } from "../types";
import { ChatActionTypes, CHANGE_ACTIVE_THREAD, ADD_MESSAGE } from "./types";

export function changeActiveThread(newThread: Thread): ChatActionTypes {
  return {
    type: CHANGE_ACTIVE_THREAD,
    payload: newThread,
  };
}

export function addMessage(newMessage: ChatEntry): ChatActionTypes {
  return {
    type: ADD_MESSAGE,
    payload: newMessage,
  };
}
