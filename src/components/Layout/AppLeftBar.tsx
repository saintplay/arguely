import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled, { LEFT_BAR_BREAKPOINT } from "../../theme";

import { RootState } from "../../store";
import { ThreadType } from "../../store/types";
import { changeActiveThread } from "../../store/server/actions";
import { threadsByCategorySelector } from "../../store/selectors";

import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppInput from "../AppInput";

export const AppLeftBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const opened = useSelector((state: RootState) => state.layout.opened);
  const threads = useSelector((state: RootState) => state.server.threads);
  const users = useSelector((state: RootState) => state.server.users);
  const threadsByCategory = useSelector(threadsByCategorySelector);

  const [searchModal, setSearchModal] = useState(true);
  const [searchText, setSearchText] = useState("");

  const onThreadClick = (threadId: number) => {
    dispatch(changeActiveThread(threadId));
  };

  const directThreads = threads.filter(
    (t) => t.type === ThreadType.DIRECT_THREAD
  );

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
              {thread.name}
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
      >
        <div className="flex">
          <AppInput
            value={searchText}
            onChange={() => setSearchText(searchText)}
          />
          <AppButton onClick={() => setSearchModal(false)}>Close me</AppButton>
        </div>
        <div className="p-4">Hola Mundo</div>
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
