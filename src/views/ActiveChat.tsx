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
import ChatMessageEntry from "../components/Chat/ChatMessageEntry";

// TODO Proper validation
const MAX_CHAT_MESSAGE_LENGTH = 500;

interface ActiveChatProps {
  activeThread: Thread;
}
const ActiveChat: FunctionComponent<ActiveChatProps> = ({ activeThread }) => {
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.layout.opened);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [message, setMessage] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateScroll();
  }, [activeThread.messages.length]);

  useEffect(() => {
    if (!opened && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [activeThread, opened]);

  const updateScroll = () => {
    if (chatWrapperRef.current) {
      console.log(chatWrapperRef.current.scrollHeight);
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
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
        ref={chatWrapperRef}
        style={{
          height: `calc(100vh - ${
            APP_HEADER_HEIGHT + CHAT_HEADER_HEIGHT + CHAT_FOOTER_HEIGHT
          }px)`,
        }}
        className="px-3 overflow-y-scroll"
      >
        <div>
          {activeThread.messages.map((entry) => (
            <div key={entry.id}>
              <ChatMessageEntry
                entry={entry}
                isOwnMessage={
                  !entry.logType && entry.user.id === currentUser.id
                }
                onDeleteEntry={onDeleteEntry}
              />
            </div>
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
        <AppButton onClick={() => startEnteringMessage()}>Send</AppButton>
      </div>
    </div>
  );
};

export default ActiveChat;
