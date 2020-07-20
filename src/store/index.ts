import { combineReducers } from "@reduxjs/toolkit";

import { chatReducer } from "./chat/reducers";
import { layoutReducer } from "./layout/reducers";
import { serverReducer } from "./server/reducers";
import { userReducer } from "./user/reducers";

export const rootReducer = combineReducers({
  chat: chatReducer,
  layout: layoutReducer,
  server: serverReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
