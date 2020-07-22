import React, { FunctionComponent } from "react";

import {
  ChatEntry,
  ChatMessage,
  ChatLog,
  ChatLogType,
} from "../../store/types";
import AppButton from "../AppButton";
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
    <div className="flex justify-between">
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
            <div
              className="font-bold cursor-pointer pr-2"
              onClick={() => onClickUser(chatEntry.user.id)}
            >
              {chatEntry.user.nickname}
            </div>
            <div className="text-xs">
              {timestampToReadableStr(entry.timestamp)}
            </div>
          </div>
        )}
        <div>{chatEntry.message}</div>
      </div>
      <div>
        {isOwnMessage && (
          <AppButton onClick={() => onDeleteEntry(entry)}>Eliminar</AppButton>
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
    <div>
      <div className="flex justify-center">
        {/* <div className={classNames("text-xs text-center opacity-75")}> */}
        <div>
          <div className="text-green">
            {timestampToReadableStr(entry.timestamp)}
          </div>
          <div className="text-white">{messageLogToStr(entry as ChatLog)}</div>
        </div>
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
