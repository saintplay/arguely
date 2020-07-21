import { createSelector } from "reselect";

import { RootState } from ".";
import { ThreadType, ThreadGroup } from "./types";

export const activeThreadSelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.activeThreadId,
  (threads, activeThreadId) =>
    threads.find((t) => t.id === activeThreadId) || null
);

export const threadsByCategorySelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.categories,
  (threads, categories) => {
    const groupThreads: ThreadGroup[] = threads.filter(
      (t): t is ThreadGroup => t.type === ThreadType.GROUP_THREAD
    );
    return categories
      .map((category) => ({
        category,
        threads: groupThreads.filter((t) => t.category === category),
      }))
      .filter((a) => a.threads.length);
  }
);
