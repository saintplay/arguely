import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import flatten from "lodash.flatten";

import styled, { LEFT_BAR_BREAKPOINT } from "../../theme";

import { RootState } from "../../store";
import {
  ThreadType,
  Thread,
  ThreadGroup,
  User,
  ThreadByCategory,
} from "../../store/types";
import { changeActiveThread } from "../../store/server/actions";
import { threadsByCategorySelector } from "../../store/selectors";

import { getThreadsByCategory } from "../../lib/utils";

import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppInput from "../AppInput";

const SEARCH_DELAY_MILLISECONDS = 150;

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

  const [searchModal, setSearchModal] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [threadsFounded, setThreadsFounded] = useState<Thread[]>([]);
  const [usersFounded, setUsersFounded] = useState<User[]>([]);
  const [categoriesFounded, setCategoriesFounded] = useState<string[]>([]);

  const delayedSearch = useCallback(
    debounce(
      (newText: string) => searchGlobally(newText),
      SEARCH_DELAY_MILLISECONDS
    ),
    []
  );

  const onThreadClick = (threadId: number) => {
    setSearchModal(false);
    setSearchText("");
    dispatch(changeActiveThread(threadId));
  };

  const directThreads = threads.filter(
    (t) => t.type === ThreadType.DIRECT_THREAD
  );

  const onChangeSearchText = (newText: string) => {
    setSearchText(newText);
    delayedSearch(newText.trim());
  };

  const searchGlobally = (text: string) => {
    const regex = new RegExp(text, "i");
    setThreadsFounded(threads.filter((t) => regex.test(t.name)));
    setUsersFounded(users.filter((u) => regex.test(u.nickname)));
    setCategoriesFounded(categories.filter((c) => regex.test(c)));
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
                <div>{thread.name}</div>
                <div>{thread.category}</div>
              </div>
            ))}
          </div>
        ))}
        {actualReturn.users.map(
          (user) =>
            currentUser.id !== user.id && (
              <div key={user.id} className="text-center cursor-pointer py-2">
                {user.nickname}
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <AppLeftBarWrapper className="grid" opened={opened}>
      <div className="flex flex-col" style={{ width: 240 }}>
        <div style={{ flex: 1 }}>
          <AppButton onClick={() => setSearchModal(true)}>Buscar</AppButton>

          {threadsByCategory.map((actualThreads) => (
            <div key={actualThreads.category}>
              <div className="font-bold">{actualThreads.category}</div>
              {actualThreads.threads.map((thread) => (
                <div
                  key={thread.id}
                  className="text-center cursor-pointer py-2"
                  onClick={() => onThreadClick(thread.id)}
                >
                  {thread.name}
                </div>
              ))}
            </div>
          ))}

          <div className="font-bold">Directos</div>
          {directThreads.map((thread) => (
            <div
              key={thread.id}
              className="text-center cursor-pointer py-2"
              onClick={() => onThreadClick(thread.id)}
            >
              <div>{thread.name}</div>
            </div>
          ))}

          <div className="font-bold">Otros Usuarios</div>
          {users.map(
            (user) =>
              currentUser.id !== user.id && (
                <div key={user.id} className="text-center cursor-pointer py-2">
                  {user.nickname}
                </div>
              )
          )}
        </div>
      </div>

      <AppModal
        isOpen={searchModal}
        onBackgroundClick={() => setSearchModal(false)}
        onEscapeKeydown={() => setSearchModal(false)}
      >
        <div className="flex">
          <AppInput
            value={searchText}
            onChange={(e) => onChangeSearchText(e.target.value)}
          />
          <AppButton onClick={() => setSearchModal(false)}>Close me</AppButton>
        </div>
        <div className="p-4">{renderSearchResults()}</div>
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
