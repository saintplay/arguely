import { User } from "../../../store/types";

export enum BroadcastMessageType {
  ENTER_SERVER = "ENTER_SERVER",
  ADD_OR_UPDATE_USER = "ADD_OR_UPDATE_USER",
  LEAVE_SERVER = "LEAVE_SERVER",
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

export type BroadcastMessage =
  | BroadcastMessageEnterServer
  | BroadcastMessageLeaveServer
  | BroadcastMessageAddOrUpdateUser;
