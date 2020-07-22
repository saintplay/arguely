import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "../theme";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import DirectThreadName from "../components/Chat/DirectThreadName";
import MainContentWrapper from "../components/StyledContainer/MainContentWrapper";
import TextAccent1Container from "../components/StyledContainer/TextAccent1Container";
import ChatMessageEntry from "../components/Chat/ChatMessageEntry";

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

const MAX_TIMESTAMP_DIFFERENCE = 10 * 60 * 1000;

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

  const shouldEntryHaveHeader = (index: number) => {
    if (index === 0) return true;
    const entry = activeThread.messages[index];
    const lastEntry = activeThread.messages[index - 1];

    if (
      !entry.logType &&
      !lastEntry.logType &&
      entry.user.id === lastEntry.user.id
    ) {
      if (entry.timestamp - lastEntry.timestamp < MAX_TIMESTAMP_DIFFERENCE) {
        return false;
      }
    }
    return true;
  };

  const onDeleteEntry = (entry: ChatEntry) => {
    dispatch(deleteThreadMessage(activeThread.id, entry.id));
  };

  return (
    <div>
      <ChatHeaderWrapper
        className="flex items-center border-b px-3"
        style={{ height: CHAT_HEADER_HEIGHT }}
      >
        {activeThread.type === ThreadType.DIRECT_THREAD ? (
          <DirectThreadName
            currentUserId={currentUser.id}
            thread={activeThread}
          />
        ) : (
          <TextAccent1Container className="font-bold">
            {activeThread.name}
          </TextAccent1Container>
        )}
      </ChatHeaderWrapper>

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
          {activeThread.messages.map((entry, index) => (
            <div key={entry.id}>
              <ChatMessageEntry
                entry={entry}
                showHeader={shouldEntryHaveHeader(index)}
                isOwnMessage={
                  !entry.logType && entry.user.id === currentUser.id
                }
                onDeleteEntry={onDeleteEntry}
              />
            </div>
          ))}
        </div>
      </div>
      <MainContentWrapper
        className="flex items-center px-2"
        onKeyDown={(e) => e.key === "Enter" && startEnteringMessage()}
        style={{ height: CHAT_FOOTER_HEIGHT }}
      >
        <div className="flex-grow">
          <AppInput
            ref={chatInputRef}
            disabled={activeThread.readonly}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="px-2">
          <AppButton onClick={() => startEnteringMessage()}>S</AppButton>
        </div>
      </MainContentWrapper>
    </div>
  );
};

const ChatHeaderWrapper = styled.div`
  border-bottom-color: ${(props) => props.theme.colors.border1};
`;

export default ActiveChat;
