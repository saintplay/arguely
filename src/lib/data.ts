import { User, Thread, ThreadType } from "../store/types";

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

export const getThreadMock = (): Thread => ({
  id: 1,
  type: ThreadType.DIRECT_THREAD,
  name: "Chat Prueba",
  messages: [
    {
      id: 4,
      logType: "CHAT_CREATED",
      timestamp: 1514868102000,
    },
    {
      id: 6,
      logType: false,
      userId: 3,
      message: "Hola",
      nickname: "User 3",
      avatar: "http://lorempixel.com/320/320/animals/3",
      timestamp: 1515040902000,
    },
    {
      id: 10,
      logType: false,
      userId: 3,
      nickname: "User 3",
      avatar: "http://lorempixel.com/320/320/animals/3",
      message: "Hola, este es un mensaje de prueba",
      timestamp: 1562621479668,
    },
    {
      id: 14,
      logType: "USER_JOINED",
      timestamp: 1514868102000,
      payload: {
        userId: 2,
        nickname: "User 2",
      },
    },
    {
      id: 20,
      logType: false,
      userId: 2,
      nickname: "User 2",
      avatar: "http://lorempixel.com/320/320/animals/2",
      message: "Hola como estas",
      timestamp: 1562621480668,
    },
    {
      id: 30,
      logType: false,
      userId: 2,
      nickname: "User 2",
      avatar: "http://lorempixel.com/320/320/animals/2",
      message: "jugamos?",
      timestamp: 1562621490668,
    },
    {
      id: 36,
      logType: "USER_JOINED",
      timestamp: 1514868102000,
      payload: {
        userId: 1,
        nickname: "Usernamewithlongname",
      },
    },
    {
      id: 40,
      logType: false,
      userId: 1,
      nickname: "User 1",
      avatar: "http://lorempixel.com/320/320/animals/1",
      message: "Hola de nuevo",
      timestamp: 1562621500668,
    },
    {
      id: 50,
      logType: false,
      userId: 1,
      nickname: "User 5",
      avatar: "http://lorempixel.com/320/320/animals/5",
      message: "acabo de actualizar, se demoró varias horas, que pesado",
      timestamp: 1562621600668,
    },
    {
      id: 53,
      logType: false,
      userId: 1,
      nickname: "User 1",
      avatar: "http://lorempixel.com/320/320/animals/1",
      message: "y nada más",
      timestamp: 1562621600669,
    },
    {
      id: 54,
      logType: false,
      userId: 1,
      nickname: "User 1",
      avatar: "http://lorempixel.com/320/320/animals/1",
      message: "aparte ya",
      timestamp: 1562621600670,
    },
    {
      id: 60,
      logType: false,
      userId: 2,
      nickname: "User 2",
      avatar: "http://lorempixel.com/320/320/animals/2",
      message: "probando, probando",
      timestamp: 1562621700668,
    },
    {
      id: 70,
      logType: false,
      userId: 3,
      nickname: "User 3",
      avatar: "http://lorempixel.com/320/320/animals/3",
      message: "yo tambien",
      timestamp: 1562721702367,
    },
  ],
});

export const getThreadsMock = (): Thread[] => [
  { ...getThreadMock(), id: 1, name: "Chat 1" },
  { ...getThreadMock(), id: 2, name: "Chat 2" },
  {
    ...getThreadMock(),
    id: 3,
    name: "Chat 3",
    type: ThreadType.GROUP_THREAD,
    category: "Anuncios",
    members: [],
  },
  {
    ...getThreadMock(),
    id: 4,
    name: "Chat 4",
    type: ThreadType.GROUP_THREAD,
    category: "Entretenimiento",
    members: [],
  },
  {
    ...getThreadMock(),
    id: 5,
    name: "Chat 5",
    type: ThreadType.GROUP_THREAD,
    category: "Entretenimiento",
    members: [],
  },
];

export const getCategoriesMock = (): string[] => [
  "Anuncios",
  "Ayuda",
  "Chat",
  "Entretenimiento",
];
