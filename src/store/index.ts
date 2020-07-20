import { combineReducers } from "@reduxjs/toolkit";

import { chatReducer } from "./chat/reducers";
import { layoutReducer } from "./layout/reducers";
import { threadReducer } from "./thread/reducers";
import { serverReducer } from "./server/reducers";

export const rootReducer = combineReducers({
  chat: chatReducer,
  layout: layoutReducer,
  thread: threadReducer,
  server: serverReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
