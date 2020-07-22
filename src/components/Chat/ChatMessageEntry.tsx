import React, { FunctionComponent } from "react";

import { ChatEntry, ChatMessage } from "../../store/types";
import AppButton from "../AppButton";

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
    <div>
      <div className="flex items-start">
        {showHeader ? (
          <div onClick={() => onClickUser(entry.id)}>
            {/* <img
              className="rounded-circle mr-2"
              src={entry.data.avatar}
              width={`${USER_AVATAR_SIZE}px`}
              style={{ minWidth: USER_AVATAR_SIZE }}
              alt={entry.data.nickname}
            /> */}
          </div>
        ) : (
          <div
            className="inline-block mr-2"
            style={{
              width: USER_AVATAR_SIZE,
              minWidth: USER_AVATAR_SIZE,
              height: USER_AVATAR_SIZE,
            }}
          ></div>
        )}
        <div className="flex-grow" style={{ minHeight: USER_AVATAR_SIZE }}>
          {showHeader && (
            <div onClick={() => onClickUser(chatEntry.user.id)}>
              <div
                className="inline-block text-xs text-green"
                style={{ width: 180 }}
              >
                {chatEntry.user.nickname}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <div
            // className={classNames(
            //   "inline-block bg-dark-gray text-xs",
            //   "rounded-r-lg rounded-bl-lg p-2"
            // )}
            >
              {chatEntry.message}
            </div>
            {isOwnMessage && (
              <AppButton onClick={() => onDeleteEntry(entry)}>
                Eliminar
              </AppButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogMessage = () => (
    <div>
      <div className="flex justify-center">
        {/* <div className={classNames("text-xs text-center opacity-75")}> */}
        <div>
          <div className="text-green">
            {/* {timestampToReadableStr(entry.data.timestamp)} */}
          </div>
          <div className="text-white">
            {/* {messageLogToStr(entry.data.message, entry.data.payload)} */}
          </div>
        </div>
      </div>
    </div>
  );

  const getActualMessage = () => {
    if (entry.logType) return renderLogMessage();
    return renderChatMessage(entry);
  };

  return (
    <div>
      <div>
        <div
        // className={classNames(
        //   "text-xs text-center opacity-75 py-2",
        //   timestampVisible ? "text-green" : "text-transparent"
        // )}
        >
          {/* {timestampVisible
            ? timestampToReadableStr(entry.data.timestamp)
            : "-"} */}
        </div>
      </div>
      <div>{getActualMessage()}</div>
    </div>
  );
};

export default ChatMessageEntry;
