import { combineReducers } from "@reduxjs/toolkit";

import { chatReducer } from "./chat/reducers";
import { layoutReducer } from "./layout/reducers";
import { threadReducer } from "./thread/reducers";

export const rootReducer = combineReducers({
  chat: chatReducer,
  layout: layoutReducer,
  thread: threadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
