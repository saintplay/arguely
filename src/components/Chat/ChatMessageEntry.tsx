import React, { FunctionComponent } from "react";
import classNames from "classnames";

import {
  ChatEntry,
  ChatMessage,
  ChatLog,
  ChatLogType,
} from "../../store/types";

import AppButton from "../AppButton";
import AppHr from "../AppHr";
import MainContentWrapper from "../StyledContainer/MainContentWrapper";
import TextDimmed1Container from "../StyledContainer/TextDimmed1Container";
import TextAccent1Container from "../StyledContainer/TextAccent1Container";

import { timestampToReadableStr } from "../../lib/utils";

const USER_AVATAR_SIZE = 32;

interface ChatMessageEntryProps {
  entry: ChatEntry;
  isOwnMessage?: boolean;
  showHeader?: boolean;
  onClickUser?: Function;
  onDeleteEntry?: Function;
}
const ChatMessageEntry: FunctionComponent<ChatMessageEntryProps> = ({
  entry,
  isOwnMessage = false,
  showHeader = true,
  onClickUser = () => null,
  onDeleteEntry = () => null,
}) => {
  const renderChatMessage = (chatEntry: ChatMessage) => (
    <div className={classNames("flex justify-between", { "pt-3": showHeader })}>
      {showHeader ? (
        <div
          style={{
            width: USER_AVATAR_SIZE,
            minWidth: USER_AVATAR_SIZE,
            height: USER_AVATAR_SIZE,
          }}
          onClick={() => onClickUser(entry.id)}
        >
          {/* <img
              className="rounded-circle mr-2"
              src={entry.data.avatar}
              width={`${USER_AVATAR_SIZE}px`}
              style={{ minWidth: USER_AVATAR_SIZE }}
              alt={entry.data.nickname}
            /> */}
          av
        </div>
      ) : (
        <div
          style={{
            width: USER_AVATAR_SIZE,
            minWidth: USER_AVATAR_SIZE,
          }}
        >
          &nbsp;
        </div>
      )}
      <div className="flex-grow">
        {showHeader && (
          <div className="flex items-center">
            <TextAccent1Container
              className="font-bold cursor-pointer pr-2"
              onClick={() => onClickUser(chatEntry.user.id)}
            >
              {chatEntry.user.nickname}
            </TextAccent1Container>
            <TextDimmed1Container className="text-xs">
              {timestampToReadableStr(entry.timestamp)}
            </TextDimmed1Container>
          </div>
        )}
        <div>{chatEntry.message}</div>
      </div>
      <div>
        {isOwnMessage && (
          <AppButton onClick={() => onDeleteEntry(entry)}>E</AppButton>
        )}
      </div>
    </div>
  );

  const messageLogToStr = (chatEntry: ChatLog) => {
    switch (chatEntry.logType) {
      case ChatLogType.CHAT_CREATED:
        return <span>El chat ha sido creado</span>;
      case ChatLogType.USER_JOINED:
        return (
          <span>
            {`El usuario ${chatEntry.payload.user.nickname} se ha unido al grupo`}
          </span>
        );
    }
  };

  const renderLogMessage = () => (
    <div className="relative flex items-center my-3" style={{ height: 40 }}>
      <AppHr className="flex-grow border-t-semi" />
      <div className="absolute inset-0 flex justify-center">
        <MainContentWrapper className="text-center px-3">
          <TextDimmed1Container className="text-xs">
            {timestampToReadableStr(entry.timestamp)}
          </TextDimmed1Container>
          <div className="text-xs opacity-75">
            {messageLogToStr(entry as ChatLog)}
          </div>
        </MainContentWrapper>
      </div>
    </div>
  );

  const getActualMessage = () => {
    if (entry.logType) return renderLogMessage();
    return renderChatMessage(entry);
  };

  return getActualMessage();
};

export default ChatMessageEntry;
