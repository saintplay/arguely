import { Thread } from "../types";
import { ChatActionTypes, CHANGE_ACTIVE_THREAD } from "./types";

export function changeActiveThread(newThread: Thread): ChatActionTypes {
  return {
    type: CHANGE_ACTIVE_THREAD,
    payload: newThread,
  };
}
