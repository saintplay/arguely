import { channel } from ".";
import { BroadcastMessageType } from "./types";
import { User, ChatEntry, Thread } from "../../../store/types";

export function sendEnterSeverMessage(user: User) {
  channel.postMessage({
    type: BroadcastMessageType.ENTER_SERVER,
    user,
  });
}

export function sendAddOrUpdateUserMessage(user: User) {
  channel.postMessage({
    type: BroadcastMessageType.ADD_OR_UPDATE_USER,
    user,
  });
}

export function sendAddThreadMessage(newThread: Thread) {
  channel.postMessage({
    type: BroadcastMessageType.ADD_THREAD,
    thread: newThread,
  });
}

export function sendAddChatEntryMessage(threadId: number, entry: ChatEntry) {
  channel.postMessage({
    type: BroadcastMessageType.ADD_CHAT_ENTRY,
    threadId,
    entry,
  });
}
