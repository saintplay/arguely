import { BroadcastChannel } from "broadcast-channel";

import { BroadcastMessage } from "./types";
import { CHANNEL_NAME } from "../../../lib/constants";

export const channel: BroadcastChannel<BroadcastMessage> = new BroadcastChannel(
  CHANNEL_NAME
);
