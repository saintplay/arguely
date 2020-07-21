import { createSelector } from "reselect";

import { RootState } from ".";
import { getThreadsByCategory } from "../lib/utils";

export const activeThreadSelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.activeThreadId,
  (state: RootState) => state.server.activePreThread,
  (threads, activeThreadId, activePreThread) => {
    if (activePreThread) return activePreThread;
    return threads.find((t) => t.id === activeThreadId) || null;
  }
);

export const threadsByCategorySelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.categories,
  (threads, categories) => getThreadsByCategory(threads, categories)
);

export const userNicknameByIdSelector = (userId: number) =>
  createSelector(
    (state: RootState) => state.server.users,
    (users) => {
      const foundedUser = users.find((u) => u.id === userId);
      return foundedUser ? foundedUser.nickname : "";
    }
  );
