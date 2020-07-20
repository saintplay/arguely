import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ChatEntry, Thread } from "../store/types";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { addMessage } from "../store/chat/actions";
import { RootState } from "../store";
import { sendAddChatEntryMessage } from "../lib/services/broadcast/messages";

const MAX_CHAT_MESSAGE_LENGTH = 500;

interface ActiveChatProps {
  activeThread: Thread;
}
const ActiveChat: FunctionComponent<ActiveChatProps> = ({ activeThread }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [message, setMessage] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateScroll();
  }, []);

  const updateScroll = () => {
    if (!chatWrapperRef.current) return;
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  };

  const startEnteringMessage = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage === "") return;

    const actualMessage = message.substring(0, MAX_CHAT_MESSAGE_LENGTH);

    const newMessage: ChatEntry = {
      id: Date.now(),
      logType: false,
      message: actualMessage,
      user: currentUser,
      timestamp: Date.now(),
    };
    dispatch(addMessage(newMessage));
    sendAddChatEntryMessage(activeThread.id, newMessage);

    updateScroll();
    setMessage("");
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

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
      <div
        className="flex"
        onKeyDown={(e) => e.key === "Enter" && startEnteringMessage()}
      >
        <AppInput
          ref={chatInputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <AppButton onClick={() => startEnteringMessage()}>Enviar</AppButton>
      </div>
    </div>
  );
};

export default ActiveChat;
