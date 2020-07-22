import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import flatten from "lodash.flatten";

import styled, { LEFT_BAR_BREAKPOINT } from "../../theme";

import { RootState } from "../../store";
import {
  ThreadType,
  Thread,
  ThreadGroup,
  ThreadPreDirect,
  User,
  ThreadByCategory,
  ChatLogType,
  ThreadDirect,
} from "../../store/types";
import {
  addThread,
  changeActiveThread,
  addPreThread,
} from "../../store/server/actions";
import { hideLeftBar } from "../../store/layout/actions";
import { threadsByCategorySelector } from "../../store/selectors";

import { getThreadsByCategory } from "../../lib/utils";

import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppInput from "../AppInput";
import { sendAddThreadMessage } from "../../lib/services/broadcast/messages";
import DirectThreadName from "../Chat/DirectThreadName";
import UnseenNotication from "../Chat/UnseenNotification";

const SEARCH_DELAY_MILLISECONDS = 150;

// TODO Proper validation
const MAX_GROUP_NAME_LENGTH = 64;

interface SearchResult {
  threads: ThreadByCategory[];
  users: User[];
}

export const AppLeftBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const opened = useSelector((state: RootState) => state.layout.opened);
  const threads = useSelector((state: RootState) => state.server.threads);
  const categories = useSelector((state: RootState) => state.server.categories);
  const users = useSelector((state: RootState) => state.server.users);
  const threadsByCategory = useSelector(threadsByCategorySelector);

  const [searchModal, setSearchModal] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  const [threadsFounded, setThreadsFounded] = useState<Thread[]>([]);
  const [usersFounded, setUsersFounded] = useState<User[]>([]);
  const [categoriesFounded, setCategoriesFounded] = useState<string[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // We focus asynchronusly because how node_modules/styled-react-modal works
  useEffect(() => {
    if (searchModal) {
      const timeoutNumber = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
      return () => clearInterval(timeoutNumber);
    }
  }, [searchModal]);

  const delayedSearch = useCallback(
    debounce(
      (newText: string) => searchGlobally(newText),
      SEARCH_DELAY_MILLISECONDS
    ),
    []
  );

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

  const searchGlobally = (text: string) => {
    const regex = new RegExp(text, "i");
    setThreadsFounded(threads.filter((t) => regex.test(t.name)));
    setUsersFounded(notMeUsers.filter((u) => regex.test(u.nickname)));
    setCategoriesFounded(categories.filter((c) => regex.test(c)));
  };

  const onOpenSearchModal = () => {
    setSearchModal(true);
  };

  const onCloseSearchModal = () => {
    setSearchModal(false);
    setSearchText("");
    onHideLeftBar();
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

  const onChangeSearchText = (newText: string) => {
    setSearchText(newText);
    delayedSearch(newText.trim());
  };

  const renderSearchResults = () => {
    const categoryThreads = flatten(
      categoriesFounded.map((c) => {
        const threadByCategory = threadsByCategory.find(
          (a) => a.category === c
        );
        return threadByCategory ? threadByCategory.threads : [];
      })
    );

    const actualThreadsFounded = [...categoryThreads, ...threadsFounded];
    const groupThreads: ThreadGroup[] = actualThreadsFounded.filter(
      (t): t is ThreadGroup => t.type === ThreadType.GROUP_THREAD
    );
    const actualReturn: SearchResult = searchText
      ? {
          threads: getThreadsByCategory(groupThreads, categories),
          users: usersFounded,
        }
      : { threads: threadsByCategory, users: [] };

    return (
      <div>
        {actualReturn.threads.map((actualThreads) => (
          <div key={actualThreads.category}>
            <div className="font-bold">{actualThreads.category}</div>
            {actualThreads.threads.map((thread) => (
              <div
                key={thread.id}
                className="flex justify-between cursor-pointer py-2"
                onClick={() => onThreadClick(thread.id)}
              >
                <div className="flex">
                  <div>{thread.name}</div>
                  <UnseenNotication unseenMessages={thread.unseenMessages} />
                </div>
                <div>{thread.category}</div>
              </div>
            ))}
          </div>
        ))}
        {actualReturn.users.map(
          (user) =>
            currentUser.id !== user.id && (
              <div
                key={user.id}
                className="text-center cursor-pointer py-2"
                onClick={() => onUserPreThreadClick(user)}
              >
                {user.nickname}
              </div>
            )
        )}
      </div>
    );
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

    if (searchModal) {
      onCloseSearchModal();
    }
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

    if (searchModal) {
      onCloseSearchModal();
    }
    onHideLeftBar();
  };

  const onHideLeftBar = () => {
    dispatch(hideLeftBar());
  };

  return (
    <AppLeftBarWrapper className="realtive grid" opened={opened}>
      {opened && (
        <div
          className="absolute inset-y-0 left-0 z-10 w-screen"
          onClick={() => onHideLeftBar()}
        >
          &nbsp;
        </div>
      )}
      <div className="relative flex flex-col z-20" style={{ width: 240 }}>
        <div style={{ flex: 1 }}>
          <AppButton onClick={() => onOpenSearchModal()}>Search</AppButton>

          {threadsByCategory.map((groupByCategory) => (
            <div key={groupByCategory.category}>
              <div className="flex justify-between">
                <div className="font-bold">{groupByCategory.category}</div>
                <AppButton
                  onClick={() =>
                    onOpenCreateGroupModal(groupByCategory.category)
                  }
                >
                  Add
                </AppButton>
              </div>
              {groupByCategory.threads.map((thread) => (
                <div
                  key={thread.id}
                  className="flex justify-between cursor-pointer py-2"
                  onClick={() => onThreadClick(thread.id)}
                >
                  <div>{thread.name}</div>
                  <UnseenNotication unseenMessages={thread.unseenMessages} />
                </div>
              ))}
            </div>
          ))}

          <div className="font-bold">Directos</div>
          {directThreads.map((thread) => (
            <div
              key={thread.id}
              className="flex justify-between cursor-pointer py-2"
              onClick={() => onThreadClick(thread.id)}
            >
              <DirectThreadName
                currentUserId={currentUser.id}
                thread={thread as ThreadDirect}
              />
              <UnseenNotication unseenMessages={thread.unseenMessages} />
            </div>
          ))}

          <div className="font-bold">Otros Usuarios</div>
          {actualUsers.map(
            (user) =>
              currentUser.id !== user.id && (
                <div
                  key={user.id}
                  className="text-center cursor-pointer py-2"
                  onClick={() => onUserPreThreadClick(user)}
                >
                  {user.nickname}
                </div>
              )
          )}
        </div>
      </div>

      <AppModal
        isOpen={searchModal}
        onBackgroundClick={() => onCloseSearchModal()}
        onEscapeKeydown={() => onCloseSearchModal()}
      >
        <div className="flex">
          <AppInput
            ref={searchInputRef}
            value={searchText}
            onChange={(e) => onChangeSearchText(e.target.value)}
          />
          <AppButton onClick={() => onCloseSearchModal()}>Close me</AppButton>
        </div>
        <div className="p-4">{renderSearchResults()}</div>
      </AppModal>

      <AppModal
        isOpen={createGroupModal}
        onBackgroundClick={() => onCloseCreateGroupModal()}
        onEscapeKeydown={() => onCloseCreateGroupModal()}
      >
        <div className="flex">
          <AppInput
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <AppButton onClick={() => onCloseCreateGroupModal()}>
            Close me
          </AppButton>
        </div>
        <div>{selectedCategory}</div>
        <AppButton onClick={() => onCreateThreadGroup()}>Guardar</AppButton>
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
