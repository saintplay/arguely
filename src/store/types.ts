export enum ThreadType {
  DIRECT_THREAD = "DIRECT_THREAD",
  GROUP_THREAD = "GROUP_THREAD",
}

const CHAT_LOG_CREATED = "CHAT_CREATED";
const CHAT_LOG_USER_JOINED = "USER_JOINED";

interface ChatBase {
  id: number;
  timestamp: number;
}

interface ChatMessage extends ChatBase {
  userId: number;
  nickname: string;
  avatar: string;
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
    userId: number;
    nickname: string;
  };
}

type ChatLog = ChatLogCreated | ChatLogUserJoined;
type Chat = ChatMessage | ChatLog;

interface ThreadBase {
  id: number;
  type: ThreadType;
  name: string;
  messages: Chat[];
}

interface ThreadMember {
  id: number;
  nickname: string;
  avatar: string;
}

interface ThreadDirect extends ThreadBase {
  type: typeof ThreadType.DIRECT_THREAD;
}

interface ThreadGroup extends ThreadBase {
  type: typeof ThreadType.GROUP_THREAD;
  members: ThreadMember[];
}

export type Thread = ThreadDirect | ThreadGroup;
