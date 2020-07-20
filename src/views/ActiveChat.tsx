import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { ChatEntry } from "../store/types";

function ActiveChat() {
  const activeThread = useSelector(
    (state: RootState) => state.chat.activeThread
  );

  if (!activeThread) {
    return <div>No se seleccionó nigún Chat</div>;
  }

  const renderMessage = (entry: ChatEntry) => {
    if (entry.logType) {
      return <div>{entry.logType}</div>;
    } else {
      return <div>{entry.message}</div>;
    }
  };

  return (
    <div>
      <div>{activeThread.name}</div>
      <div>
        {activeThread.messages.map((entry) => (
          <div key={entry.id}>{renderMessage(entry)}</div>
        ))}
      </div>
    </div>
  );
}

export default ActiveChat;
