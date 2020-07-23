import { User, Thread, ThreadType, ChatLogType } from "../store/types";

export const getUserMock = (): User => ({
  id: 1,
  nickname: "Test User",
  color: "maroon",
});

export const getUsersMock = (): User[] => [
  { ...getUserMock(), id: 1, nickname: "User 1" },
  { ...getUserMock(), id: 2, nickname: "User 2" },
  { ...getUserMock(), id: 3, nickname: "User 3" },
  { ...getUserMock(), id: 4, nickname: "User 4" },
  { ...getUserMock(), id: 5, nickname: "User 5" },
];

export const DEFAULT_THREAD_ID_TO_GO = 212;

export const getThreadMock = (): Thread => ({
  id: 1,
  type: ThreadType.DIRECT_THREAD,
  name: "Test Chat",
  userId1: 1,
  userId2: 2,
  messages: [],
  unseenMessages: 0,
  readonly: false,
});

export const getThreadsMock = (): Thread[] => [
  {
    ...getThreadMock(),
    id: DEFAULT_THREAD_ID_TO_GO,
    name: "Welcome",
    type: ThreadType.GROUP_THREAD,
    category: "Information",
    readonly: false,
    messages: [
      {
        id: 4,
        logType: ChatLogType.CHAT_CREATED,
        timestamp: 1546404102000,
      },
      {
        id: 6,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "plum",
        },
        message: "Hello",
        timestamp: 1546576902000,
      },
      {
        id: 10,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "plum",
        },
        message: "Hi, this is a test message",
        timestamp: 1594157479668,
      },
      {
        id: 14,
        logType: ChatLogType.USER_JOINED,
        timestamp: 1594157470668,
        payload: {
          user: {
            id: 2,
            nickname: "User 2",
            color: "brown",
          },
        },
      },
      {
        id: 20,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "I know",
        timestamp: 1594157480668,
      },
      {
        id: 30,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "this is a test chat",
        timestamp: 1594157490668,
      },
      {
        id: 36,
        logType: ChatLogType.USER_JOINED,
        timestamp: 1594157490668,
        payload: {
          user: {
            id: 1,
            nickname: "User 1",
            color: "green",
          },
        },
      },
      {
        id: 40,
        logType: false,
        user: {
          id: 1,
          nickname: "User 1",
          color: "green",
        },
        message: "Hi again",
        timestamp: 1594157500668,
      },
      {
        id: 50,
        logType: false,
        user: {
          id: 5,
          nickname: "User 5",
          color: "indigo",
        },
        message: "Let's play something",
        timestamp: 1594157600668,
      },
      {
        id: 53,
        logType: false,
        user: {
          id: 1,
          nickname: "User 1",
          color: "green",
        },
        message: "Let's do it!",
        timestamp: 1594157600669,
      },
      {
        id: 54,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "testing, testing...",
        timestamp: 1594157600670,
      },
      {
        id: 60,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "again",
        timestamp: 1594157700668,
      },
      {
        id: 70,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "blue",
        },
        message: "I wish I had time to add better fonts",
        timestamp: 1594257702367,
      },
    ],
  },
  {
    ...getThreadMock(),
    id: 4,
    name: "Chat 4",
    type: ThreadType.GROUP_THREAD,
    category: "Off-topic",
    unseenMessages: 5,
    messages: [
      {
        id: 4,
        logType: ChatLogType.CHAT_CREATED,
        timestamp: 1546404102000,
      },
      {
        id: 6,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "plum",
        },
        message: "Hello",
        timestamp: 1546576902000,
      },
      {
        id: 10,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "plum",
        },
        message: "Hi, this is a test message",
        timestamp: 1594157479668,
      },
      {
        id: 14,
        logType: ChatLogType.USER_JOINED,
        timestamp: 1594157470668,
        payload: {
          user: {
            id: 2,
            nickname: "User 2",
            color: "brown",
          },
        },
      },
      {
        id: 20,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "I know",
        timestamp: 1594157480668,
      },
      {
        id: 30,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "this is a test chat",
        timestamp: 1594157490668,
      },
      {
        id: 54,
        logType: false,
        user: {
          id: 2,
          nickname: "User 2",
          color: "brown",
        },
        message: "testing, testing...",
        timestamp: 1594157600670,
      },
      {
        id: 70,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "blue",
        },
        message: "I wish I had time to add better fonts",
        timestamp: 1594257702367,
      },
    ],
  },
  {
    ...getThreadMock(),
    id: 5,
    name: "Readonly",
    type: ThreadType.GROUP_THREAD,
    category: "Off-topic",
    readonly: true,
    messages: [
      {
        id: 4,
        logType: ChatLogType.CHAT_CREATED,
        timestamp: 1546404102000,
      },
      {
        id: 6,
        logType: false,
        user: {
          id: 3,
          nickname: "User 3",
          color: "plum",
        },
        message: "Hi",
        timestamp: 1546576902000,
      },
    ],
  },
];

export const getCategoriesMock = (): string[] => [
  "Information",
  "Help",
  "Chat",
  "Off-topic",
];
