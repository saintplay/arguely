export type User = {
  id: number;
  nickname: string;
  color: string;
};

export enum ThreadType {
  DIRECT_THREAD = "DIRECT_THREAD",
  GROUP_THREAD = "GROUP_THREAD",
}

const CHAT_LOG_CREATED = "CHAT_CREATED";
const CHAT_LOG_USER_JOINED = "USER_JOINED";

interface ChatBase {
  id: number;
  timestamp: number;
  logType: string | boolean;
}

interface ChatMessage extends ChatBase {
  logType: false;
  user: User;
  message: string;
}

interface ChatLogBase extends ChatBase {
  logType: string;
}

interface ChatLogCreated extends ChatLogBase {
  logType: typeof CHAT_LOG_CREATED;
}
interface ChatLogUserJoined extends ChatLogBase {
  logType: typeof CHAT_LOG_USER_JOINED;
  payload: {
    user: User;
  };
}

type ChatLog = ChatLogCreated | ChatLogUserJoined;
export type ChatEntry = ChatMessage | ChatLog;

interface ThreadBase {
  id: number;
  type: ThreadType;
  name: string;
  messages: ChatEntry[];
}

export interface ThreadDirect extends ThreadBase {
  type: typeof ThreadType.DIRECT_THREAD;
}

export interface ThreadGroup extends ThreadBase {
  type: typeof ThreadType.GROUP_THREAD;
  category: string;
}

export type Thread = ThreadDirect | ThreadGroup;

export type ThreadByCategory = {
  category: string;
  threads: ThreadGroup[];
};
