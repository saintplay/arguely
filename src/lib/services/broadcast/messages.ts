import { channel } from ".";
import { BroadcastMessageType } from "./types";
import { User } from "../../../store/types";

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
