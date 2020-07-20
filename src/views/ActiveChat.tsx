import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

function ActiveChat() {
  const activeThread = useSelector(
    (state: RootState) => state.chat.activeThread
  );

  if (!activeThread) {
    return <div>No se seleccionó nigún Chat</div>;
  }

  return <div>{activeThread.name}</div>;
}

export default ActiveChat;
