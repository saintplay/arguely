import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import DirectThreadName from "../components/Chat/DirectThreadName";

import { RootState } from "../store";
import { ChatEntry, Thread, ThreadType, ThreadDirect } from "../store/types";
import {
  addThreadMessage,
  deleteThreadMessage,
  addThread,
  changeActiveThread,
} from "../store/server/actions";

import {
  sendAddChatEntryMessage,
  sendAddThreadMessage,
} from "../lib/services/broadcast/messages";

import {
  CHAT_HEADER_HEIGHT,
  CHAT_FOOTER_HEIGHT,
  APP_HEADER_HEIGHT,
} from "../lib/ui";

// TODO Proper validation
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

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [activeThread]);

  const updateScroll = () => {
    if (!chatWrapperRef.current) return;
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  };

  const startEnteringMessage = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage === "") return;

    const actualMessage = trimmedMessage.substring(0, MAX_CHAT_MESSAGE_LENGTH);

    const newMessage: ChatEntry = {
      id: Date.now(),
      logType: false,
      message: actualMessage,
      user: currentUser,
      timestamp: Date.now(),
    };

    if (activeThread.type === ThreadType.PRE_DIRECT_THREAD) {
      const userId = currentUser.id;
      const newDirectThread: ThreadDirect = {
        ...activeThread,
        name: `${userId}-${activeThread.userId}`,
        id: Date.now(),
        type: ThreadType.DIRECT_THREAD,
        userId1: userId,
        userId2: activeThread.userId,
        messages: [newMessage],
      };

      dispatch(addThread(newDirectThread));
      dispatch(changeActiveThread(newDirectThread.id));
      sendAddThreadMessage(newDirectThread);
    } else {
      dispatch(addThreadMessage(activeThread.id, newMessage));
      sendAddChatEntryMessage(activeThread.id, newMessage);
    }

    updateScroll();
    setMessage("");
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  const onDeleteEntry = (entry: ChatEntry) => {
    dispatch(deleteThreadMessage(activeThread.id, entry.id));
  };

  const renderMessage = (entry: ChatEntry) => {
    if (entry.logType) {
      return <div>{entry.logType}</div>;
    } else {
      return (
        <div className="flex justify-between py-2">
          <div>{entry.message}</div>
          {entry.user.id === currentUser.id && (
            <AppButton onClick={() => onDeleteEntry(entry)}>Eliminar</AppButton>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ height: CHAT_HEADER_HEIGHT }}>
        {activeThread.type === ThreadType.DIRECT_THREAD ? (
          <DirectThreadName
            currentUserId={currentUser.id}
            thread={activeThread}
          />
        ) : (
          <div>{activeThread.name}</div>
        )}
      </div>

      <div
        style={{
          height: `calc(100vh - ${
            APP_HEADER_HEIGHT + CHAT_HEADER_HEIGHT + CHAT_FOOTER_HEIGHT
          }px)`,
        }}
      >
        <div>
          {activeThread.messages.map((entry) => (
            <div key={entry.id}>{renderMessage(entry)}</div>
          ))}
        </div>
      </div>
      <div
        className="flex items-center"
        onKeyDown={(e) => e.key === "Enter" && startEnteringMessage()}
        style={{ height: CHAT_FOOTER_HEIGHT, backgroundColor: "tomato" }}
      >
        <AppInput
          ref={chatInputRef}
          disabled={activeThread.readonly}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <AppButton onClick={() => startEnteringMessage()}>Enviar</AppButton>
      </div>
    </div>
  );
};

export default ActiveChat;
