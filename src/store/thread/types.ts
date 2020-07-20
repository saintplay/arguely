import { Thread } from "../types";

export interface ThreadState {
  threads: Thread[];
}

export const ADD_THREAD = "ADD_THREAD";

interface AddThread {
  type: typeof ADD_THREAD;
  payload: Thread;
}

export type ThreadActionTypes = AddThread;
