import { createSelector } from "reselect";

import { RootState } from ".";
import { getThreadsByCategory } from "../lib/utils";

export const activeThreadSelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.activeThreadId,
  (threads, activeThreadId) =>
    threads.find((t) => t.id === activeThreadId) || null
);

export const threadsByCategorySelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.categories,
  (threads, categories) => getThreadsByCategory(threads, categories)
);
