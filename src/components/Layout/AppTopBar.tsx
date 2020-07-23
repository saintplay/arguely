import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import flatten from "lodash.flatten";

import styled from "../../theme";

import AppModal from "../AppModal";
import AppInput from "../AppInput";
import AppButton from "../AppButton";
import AppHr from "../AppHr";
import UnseenNotification from "../Chat/UnseenNotification";
import TextAccent2Container from "../StyledContainer/TextAccent2Container";

import { RootState } from "../../store";
import { changeActiveThread, addPreThread } from "../../store/server/actions";
import { threadsByCategorySelector } from "../../store/selectors";

import { APP_HEADER_HEIGHT } from "../../lib/ui";
import { getThreadsByCategory } from "../../lib/utils";

import {
  ThreadGroup,
  ThreadType,
  Thread,
  User,
  ThreadPreDirect,
  ThreadByCategory,
} from "../../store/types";
import { hideLeftBar } from "../../store/layout/actions";

const SEARCH_DELAY_MILLISECONDS = 150;

const MIN_SEARCH_BOX_HEIGHT = 200;

interface SearchResult {
  threads: ThreadByCategory[];
  users: User[];
}

function AppTopBar({
  onToggleLeftBar,
  onChangeTheme,
}: InferProps<typeof AppTopBar.propTypes>) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const threads = useSelector((state: RootState) => state.server.threads);
  const categories = useSelector((state: RootState) => state.server.categories);
  const users = useSelector((state: RootState) => state.server.users);
  const threadsByCategory = useSelector(threadsByCategorySelector);

  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [threadsFounded, setThreadsFounded] = useState<Thread[]>([]);
  const [usersFounded, setUsersFounded] = useState<User[]>([]);
  const [categoriesFounded, setCategoriesFounded] = useState<string[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const notMeUsers = users.filter((u) => u.id !== currentUser.id);

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

  const onChangeSearchText = (newText: string) => {
    setSearchText(newText);
    delayedSearch(newText.trim());
  };

  const onHideLeftBar = () => {
    dispatch(hideLeftBar());
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

    if (!actualReturn.threads.length && !actualReturn.users.length) {
      return (
        <div className="italic text-center tx-sm py-2 opacity-75">
          No results
        </div>
      );
    }

    return (
      <div>
        {actualReturn.threads.map((actualThreads) => (
          <div key={actualThreads.category}>
            {renderSeparator()}
            <TextAccent2Container className="font-bold opacity-90">
              {actualThreads.category}
            </TextAccent2Container>
            {actualThreads.threads.map((thread) => (
              <div
                key={thread.id}
                className="flex justify-between text-sm cursor-pointer select-none py-1"
                onClick={() => onThreadClick(thread.id)}
              >
                <div className="flex">
                  <div>{thread.name}</div>
                  <UnseenNotification unseenMessages={thread.unseenMessages} />
                </div>
                <div className="italic text-xs">{thread.category}</div>
              </div>
            ))}
          </div>
        ))}
        {(actualReturn.users.length || null) && (
          <div>
            {renderSeparator()}
            <TextAccent2Container className="font-bold opacity-90">
              Users
            </TextAccent2Container>
            {actualReturn.users.map(
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
        )}
      </div>
    );
  };

  const renderSeparator = (alternative?: boolean) => {
    return (
      <div className="py-4">
        <AppHr alternative={alternative} className="border-t-semi" />
      </div>
    );
  };

  return (
    <AppTopBarWrapper
      className="flex justify-center items-center"
      style={{ height: APP_HEADER_HEIGHT }}
    >
      <div
        className="select-none cursor-pointer px-2"
        onClick={onToggleLeftBar}
      >
        Toggle LeftBar
      </div>

      <AppButton onClick={() => onOpenSearchModal()}>Search</AppButton>

      <AppModal
        isOpen={searchModal}
        className="rounded-md"
        onBackgroundClick={() => onCloseSearchModal()}
        onEscapeKeydown={() => onCloseSearchModal()}
      >
        <div style={{ minHeight: MIN_SEARCH_BOX_HEIGHT }}>
          <div className="flex">
            <div className="flex-grow">
              <AppInput
                ref={searchInputRef}
                value={searchText}
                borderAlternative
                placeholder="Search for users and groups"
                onChange={(e) => onChangeSearchText(e.target.value)}
              />
            </div>
            <AppButton onClick={() => onCloseSearchModal()}>c</AppButton>
          </div>
          <div className="px-4 pb-4">{renderSearchResults()}</div>
        </div>
      </AppModal>
    </AppTopBarWrapper>
  );
}
AppTopBar.propTypes = {
  onToggleLeftBar: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
};
AppTopBar.defaultProps = {
  onToggleLeftBar: () => {},
  onChangeTheme: () => {},
};

const AppTopBarWrapper = styled.div`
  color: ${(props) => props.theme.colors.text2};
  background-color: ${(props) => props.theme.colors.content3};
`;

export default AppTopBar;
