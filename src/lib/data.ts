import { User, Thread, ThreadType, ChatLogType } from "../store/types";

export const getUserMock = (): User => ({
  id: 1,
  nickname: "Usuario de Prueba",
  color: "red",
});

export const getUsersMock = (): User[] => [
  { ...getUserMock(), id: 1, nickname: "Usuario 1" },
  { ...getUserMock(), id: 2, nickname: "Usuario 2" },
  { ...getUserMock(), id: 3, nickname: "Usuario 3" },
  { ...getUserMock(), id: 4, nickname: "Usuario 4" },
  { ...getUserMock(), id: 5, nickname: "Usuario 5" },
];

export const DEFAULT_THREAD_ID_TO_GO = 212;

export const getThreadMock = (): Thread => ({
  id: 1,
  type: ThreadType.DIRECT_THREAD,
  name: "Chat Prueba",
  userId1: 1,
  userId2: 2,
  messages: [
    {
      id: 4,
      logType: ChatLogType.CHAT_CREATED,
      timestamp: 1514868102000,
    },
    {
      id: 6,
      logType: false,
      user: {
        id: 3,
        nickname: "User 3",
        color: "red",
      },
      message: "Hola",
      timestamp: 1515040902000,
    },
    {
      id: 10,
      logType: false,
      user: {
        id: 3,
        nickname: "User 3",
        color: "red",
      },
      message: "Hola, este es un mensaje de prueba",
      timestamp: 1562621479668,
    },
    {
      id: 14,
      logType: ChatLogType.USER_JOINED,
      timestamp: 1514868102000,
      payload: {
        user: {
          id: 2,
          nickname: "User 2",
          color: "red",
        },
      },
    },
    {
      id: 20,
      logType: false,
      user: {
        id: 2,
        nickname: "User 2",
        color: "red",
      },
      message: "Hola como estas",
      timestamp: 1562621480668,
    },
    {
      id: 30,
      logType: false,
      user: {
        id: 2,
        nickname: "User 2",
        color: "red",
      },
      message: "jugamos?",
      timestamp: 1562621490668,
    },
    {
      id: 36,
      logType: ChatLogType.USER_JOINED,
      timestamp: 1514868102000,
      payload: {
        user: {
          id: 1,
          nickname: "User 1",
          color: "red",
        },
      },
    },
    {
      id: 40,
      logType: false,
      user: {
        id: 1,
        nickname: "User 1",
        color: "red",
      },
      message: "Hola de nuevo",
      timestamp: 1562621500668,
    },
    {
      id: 50,
      logType: false,
      user: {
        id: 5,
        nickname: "User 5",
        color: "red",
      },
      message: "acabo de actualizar, se demoró varias horas, que pesado",
      timestamp: 1562621600668,
    },
    {
      id: 53,
      logType: false,
      user: {
        id: 1,
        nickname: "User 1",
        color: "red",
      },
      message: "y nada más",
      timestamp: 1562621600669,
    },
    {
      id: 54,
      logType: false,
      user: {
        id: 2,
        nickname: "User 2",
        color: "red",
      },
      message: "aparte ya",
      timestamp: 1562621600670,
    },
    {
      id: 60,
      logType: false,
      user: {
        id: 2,
        nickname: "User 2",
        color: "red",
      },
      message: "probando, probando",
      timestamp: 1562621700668,
    },
    {
      id: 70,
      logType: false,
      user: {
        id: 3,
        nickname: "User 3",
        color: "red",
      },
      message: "yo tambien",
      timestamp: 1562721702367,
    },
  ],
  unseenMessages: 0,
  readonly: false,
});

export const getThreadsMock = (): Thread[] => [
  // { ...getThreadMock(), id: 1, name: "Chat 1" },
  // { ...getThreadMock(), id: 2, name: "Chat 2" },
  {
    ...getThreadMock(),
    id: DEFAULT_THREAD_ID_TO_GO,
    name: "Welcome",
    type: ThreadType.GROUP_THREAD,
    category: "Information",
    readonly: true,
  },
  {
    ...getThreadMock(),
    id: 3,
    name: "Chat 3",
    type: ThreadType.GROUP_THREAD,
    category: "Off-topic",
  },
  {
    ...getThreadMock(),
    id: 4,
    name: "Chat 4",
    type: ThreadType.GROUP_THREAD,
    category: "Off-topic",
  },
  {
    ...getThreadMock(),
    id: 5,
    name: "Chat 5",
    type: ThreadType.GROUP_THREAD,
    category: "Off-topic",
  },
];

export const getCategoriesMock = (): string[] => [
  "Information",
  "Help",
  "Chat",
  "Off-topic",
];
