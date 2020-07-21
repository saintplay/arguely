import uniqBy from "lodash.uniqby";

import {
  ThreadByCategory,
  Thread,
  ThreadType,
  ThreadGroup,
} from "../store/types";

export const getThreadsByCategory = (
  threads: Thread[],
  categories: string[]
): ThreadByCategory[] => {
  const groupThreads: ThreadGroup[] = uniqBy(threads, (t) => t.id).filter(
    (t): t is ThreadGroup => t.type === ThreadType.GROUP_THREAD
  );
  return categories
    .map((category) => ({
      category,
      threads: groupThreads.filter((t) => t.category === category),
    }))
    .filter((a) => a.threads.length);
};
