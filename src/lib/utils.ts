import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import isThisYear from "date-fns/isThisYear";
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

export const timestampToReadableStr = (timestamp: number) => {
  if (!timestamp) return null;

  if (isToday(timestamp)) return format(timestamp, "hh:mm a");
  if (isThisWeek(timestamp)) return format(timestamp, "dddd hh:mm a");
  if (isThisYear(timestamp)) return format(timestamp, "mmm dd hh:mm a");
  return format(timestamp, "dd/mm/yyyy hh:mm a");
};
