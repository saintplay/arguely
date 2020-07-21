import { User, ChatEntry, Thread } from "../../../store/types";

export enum BroadcastMessageType {
  ENTER_SERVER = "ENTER_SERVER",
  ADD_OR_UPDATE_USER = "ADD_OR_UPDATE_USER",
  LEAVE_SERVER = "LEAVE_SERVER",
  ADD_THREAD = "ADD_THREAD",
  ADD_CHAT_ENTRY = "ADD_CHAT_ENTRY",
}
interface BroadcastMessageBase {
  type: BroadcastMessageType;
}
interface BroadcastMessageEnterServer extends BroadcastMessageBase {
  type: BroadcastMessageType.ENTER_SERVER;
  user: User;
}
interface BroadcastMessageAddOrUpdateUser extends BroadcastMessageBase {
  type: BroadcastMessageType.ADD_OR_UPDATE_USER;
  user: User;
}
interface BroadcastMessageLeaveServer extends BroadcastMessageBase {
  type: BroadcastMessageType.LEAVE_SERVER;
}
interface BroadcastMessageAddThread extends BroadcastMessageBase {
  type: BroadcastMessageType.ADD_THREAD;
  thread: Thread;
}
interface BroadcastMessageAddChatEntry extends BroadcastMessageBase {
  type: BroadcastMessageType.ADD_CHAT_ENTRY;
  entry: ChatEntry;
  threadId: number;
}

export type BroadcastMessage =
  | BroadcastMessageEnterServer
  | BroadcastMessageLeaveServer
  | BroadcastMessageAddOrUpdateUser
  | BroadcastMessageAddThread
  | BroadcastMessageAddChatEntry;
