import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled, { LEFT_BAR_BREAKPOINT, APP_THEMES } from "../../theme";

import { RootState } from "../../store";
import {
  ThreadType,
  ThreadGroup,
  ThreadPreDirect,
  User,
  ChatLogType,
  ThreadDirect,
} from "../../store/types";
import {
  addThread,
  changeActiveThread,
  addPreThread,
  updateUser,
} from "../../store/server/actions";
import { hideLeftBar, changeTheme } from "../../store/layout/actions";
import { threadsByCategorySelector } from "../../store/selectors";

import {
  sendAddThreadMessage,
  sendAddOrUpdateUserMessage,
} from "../../lib/services/broadcast/messages";

import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppInput from "../AppInput";
import AppIcon from "../AppIcon";
import AppHr from "../AppHr";
import DirectThreadName from "../Chat/DirectThreadName";
import UnseenNotication from "../Chat/UnseenNotification";
import TextAccent1Container from "../StyledContainer/TextAccent1Container";
import TextAccent2Container from "../StyledContainer/TextAccent2Container";
import TextDimmed1Container from "../StyledContainer/TextDimmed1Container";
import { changeCurrentUser } from "../../store/user/actions";

// TODO Proper validation
const MAX_GROUP_NAME_LENGTH = 64;
const MAX_NICKNAME_LENGTH = 64;

export const AppLeftBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const opened = useSelector((state: RootState) => state.layout.opened);
  const threads = useSelector((state: RootState) => state.server.threads);
  const users = useSelector((state: RootState) => state.server.users);
  const threadsByCategory = useSelector(threadsByCategorySelector);

  const [settingsModal, setSettingsModal] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [dirtyNickname, setDirtyNickname] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");

  const directThreads: ThreadDirect[] = threads.filter(
    (t): t is ThreadDirect => t.type === ThreadType.DIRECT_THREAD
  );

  const notMeUsers = users.filter((u) => u.id !== currentUser.id);

  const actualUsers = notMeUsers.filter(
    (u) =>
      directThreads.findIndex(
        (d) => d.userId1 === u.id || d.userId2 === u.id
      ) === -1
  );

  const onOpenSettingsModal = () => {
    setDirtyNickname(currentUser.nickname);
    setSettingsModal(true);
  };

  const onCloseSettingsModal = () => {
    setSettingsModal(false);
    setDirtyNickname("");
  };

  const onOpenCreateGroupModal = (category: string) => {
    setSelectedCategory(category);
    setCreateGroupModal(true);
  };

  const onCloseCreateGroupModal = () => {
    setCreateGroupModal(false);
    setNewGroupName("");
    onHideLeftBar();
  };

  const onSaveDirtyNickname = () => {
    const trimmedNickname = dirtyNickname.trim();

    if (trimmedNickname === "") return;

    const actualNickname = trimmedNickname.substring(0, MAX_NICKNAME_LENGTH);

    if (actualNickname !== currentUser.nickname) {
      const updatedUser = { ...currentUser, nickname: actualNickname };
      dispatch(changeCurrentUser(updatedUser));
      dispatch(updateUser(updatedUser));

      sendAddOrUpdateUserMessage(updatedUser);
    }
    onCloseSettingsModal();
  };

  const onCreateThreadGroup = () => {
    if (!selectedCategory) return onCloseCreateGroupModal();

    const trimmedName = newGroupName.trim();

    if (trimmedName === "") return;

    const actualGroupName = trimmedName.substring(0, MAX_GROUP_NAME_LENGTH);
    const newGroupThread: ThreadGroup = {
      id: Date.now(),
      type: ThreadType.GROUP_THREAD,
      name: actualGroupName,
      category: selectedCategory,
      messages: [
        {
          id: 1,
          logType: ChatLogType.CHAT_CREATED,
          timestamp: Date.now(),
        },
      ],
      unseenMessages: 0,
      readonly: false,
    };

    dispatch(addThread(newGroupThread));
    dispatch(changeActiveThread(newGroupThread.id));
    sendAddThreadMessage(newGroupThread);
    onCloseCreateGroupModal();
  };

  const onThreadClick = (threadId: number) => {
    dispatch(changeActiveThread(threadId));
    onHideLeftBar();
  };

  const onUserPreThreadClick = (user: User) => {
    const newPreThread: ThreadPreDirect = {
      id: Date.now(),
      type: ThreadType.PRE_DIRECT_THREAD,
      name: user.nickname,
      messages: [],
      userId: user.id,
      unseenMessages: 0,
      readonly: false,
    };
    dispatch(addPreThread(newPreThread));

    onHideLeftBar();
  };

  const onHideLeftBar = () => {
    dispatch(hideLeftBar());
  };

  const onChangeTheme = (theme: string) => {
    dispatch(changeTheme(theme));
  };

  const renderSeparator = (alternative?: boolean) => {
    return (
      <div className="py-4">
        <AppHr alternative={alternative} className="border-t-semi" />
      </div>
    );
  };

  return (
    <AppLeftBarWrapper className="realtive z-10 grid" opened={opened}>
      {opened && (
        <div
          className="absolute inset-y-0 left-0 z-10 w-screen"
          onClick={() => onHideLeftBar()}
        >
          &nbsp;
        </div>
      )}
      <div className="relative flex flex-col z-20" style={{ width: 240 }}>
        <div className="flex-grow px-3 py-2">
          <div onClick={() => onOpenSettingsModal()}>
            {currentUser.nickname}
          </div>
          {threadsByCategory.map((groupByCategory) => (
            <div key={groupByCategory.category}>
              <TextAccent2Container
                className="font-bold flex justify-between opacity-90 cursor-pointer select-none pb-2"
                onClick={() => onOpenCreateGroupModal(groupByCategory.category)}
              >
                <div>{groupByCategory.category}</div>
                <div className="cursor-pointer">
                  <AppIcon fill="textaccent2">more</AppIcon>
                </div>
              </TextAccent2Container>
              {groupByCategory.threads.map((thread) => (
                <div
                  key={thread.id}
                  className="flex justify-between text-sm cursor-pointer select-none py-1"
                  onClick={() => onThreadClick(thread.id)}
                >
                  <div className="flex items-center">
                    <AppIcon fill="text2">hashtag</AppIcon>
                    {thread.unseenMessages ? (
                      <TextAccent2Container className="font-bold pl-2">
                        {thread.name}
                      </TextAccent2Container>
                    ) : (
                      <div className="pl-2">{thread.name}</div>
                    )}
                  </div>
                  <UnseenNotication unseenMessages={thread.unseenMessages} />
                </div>
              ))}

              {renderSeparator(true)}
            </div>
          ))}

          {(directThreads.length || null) && (
            <>
              <TextAccent2Container className="font-bold opacity-90 pb-2">
                Private Messages
              </TextAccent2Container>
              {directThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="flex justify-between cursor-pointer py-1"
                  onClick={() => onThreadClick(thread.id)}
                >
                  <div className="text-sm">
                    <DirectThreadName
                      currentUserId={currentUser.id}
                      thread={thread as ThreadDirect}
                    />
                  </div>
                  <UnseenNotication unseenMessages={thread.unseenMessages} />
                </div>
              ))}

              {renderSeparator(true)}
            </>
          )}

          <TextAccent2Container className="font-bold opacity-90 pb-2">
            Other Users
          </TextAccent2Container>
          {actualUsers.map(
            (user) =>
              currentUser.id !== user.id && (
                <div
                  key={user.id}
                  className="text-sm select-none cursor-pointer py-1"
                  onClick={() => onUserPreThreadClick(user)}
                >
                  {user.nickname}
                </div>
              )
          )}
        </div>
      </div>

      <AppModal
        isOpen={settingsModal}
        className="rounded-md"
        onBackgroundClick={() => onCloseSettingsModal()}
        onEscapeKeydown={() => onCloseSettingsModal()}
      >
        <div className="px-3 py-2">
          <TextAccent1Container className="font-bold text-lg">
            Settings
          </TextAccent1Container>

          {renderSeparator()}

          <TextDimmed1Container className="text-sm pb-1">
            Nickname
          </TextDimmed1Container>
          <AppInput
            value={dirtyNickname}
            borderAlternative
            placeholder="Enter a nickname"
            onChange={(e) => setDirtyNickname(e.target.value)}
          />

          {renderSeparator()}

          <div
            className="select-none cursor-pointer px-2"
            onClick={() => onChangeTheme(APP_THEMES.DISCORD)}
          >
            Change to Discord Theme
          </div>
          <div
            className="select-none cursor-pointer px-2"
            onClick={() => onChangeTheme(APP_THEMES.SLACK)}
          >
            Change to Discord Slack
          </div>

          {renderSeparator()}

          <div className="flex justify-end py-3">
            <AppButton onClick={() => onCloseSettingsModal()}>Cancel</AppButton>
            <AppButton onClick={() => onSaveDirtyNickname()}>Save</AppButton>
          </div>
        </div>
      </AppModal>

      <AppModal
        isOpen={createGroupModal}
        className="rounded-md"
        onBackgroundClick={() => onCloseCreateGroupModal()}
        onEscapeKeydown={() => onCloseCreateGroupModal()}
      >
        <div className="px-3 py-2">
          <TextAccent1Container className="font-bold text-lg">
            Create Group Chat
          </TextAccent1Container>
          <TextDimmed1Container className="italic text-xs">
            in {selectedCategory}
          </TextDimmed1Container>

          {renderSeparator()}

          <TextDimmed1Container className="text-sm pb-1">
            Chat Name
          </TextDimmed1Container>
          <AppInput
            value={newGroupName}
            borderAlternative
            placeholder="Enter a name"
            onChange={(e) => setNewGroupName(e.target.value)}
          />

          {renderSeparator()}

          <div className="flex justify-end py-3">
            <AppButton onClick={() => onCloseCreateGroupModal()}>
              Cancel
            </AppButton>
            <AppButton onClick={() => onCreateThreadGroup()}>Save</AppButton>
          </div>
        </div>
      </AppModal>
    </AppLeftBarWrapper>
  );
};

const AppLeftBarWrapper = styled.div<{ opened: boolean }>`
  grid-template-columns: auto;
  grid-template-rows: auto;

  color: ${(props) => props.theme.colors.text2};
  background-color: ${(props) => props.theme.colors.content4};

  @media (max-width: ${LEFT_BAR_BREAKPOINT}px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: transform 0.15s ease-in-out;
    transform: ${(props) =>
      props.opened ? "translateX(0)" : "translateX(-100%)"};
  }
`;
