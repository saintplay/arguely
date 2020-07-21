export type User = {
  id: number;
  nickname: string;
  color: string;
};

export enum ThreadType {
  DIRECT_THREAD = "DIRECT_THREAD",
  PRE_DIRECT_THREAD = "PRE_DIRECT_THREAD",
  GROUP_THREAD = "GROUP_THREAD",
}

export enum ChatLogType {
  CHAT_CREATED = "CHAT_CREATED",
  USER_JOINED = "USER_JOINED",
}

interface ChatBase {
  id: number;
  timestamp: number;
  logType: ChatLogType | boolean;
}

interface ChatMessage extends ChatBase {
  logType: false;
  user: User;
  message: string;
}

interface ChatLogBase extends ChatBase {
  logType: ChatLogType;
}

interface ChatLogCreated extends ChatLogBase {
  logType: typeof ChatLogType.CHAT_CREATED;
}
interface ChatLogUserJoined extends ChatLogBase {
  logType: typeof ChatLogType.USER_JOINED;
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
  unseenMessages: number;
  readonly: boolean;
}

export interface ThreadDirect extends ThreadBase {
  type: typeof ThreadType.DIRECT_THREAD;
  userId1: number;
  userId2: number;
}

export interface ThreadPreDirect extends ThreadBase {
  type: typeof ThreadType.PRE_DIRECT_THREAD;
  userId: number;
}

export interface ThreadGroup extends ThreadBase {
  type: typeof ThreadType.GROUP_THREAD;
  category: string;
}

export type Thread = ThreadDirect | ThreadGroup | ThreadPreDirect;

export type ThreadByCategory = {
  category: string;
  threads: ThreadGroup[];
};
