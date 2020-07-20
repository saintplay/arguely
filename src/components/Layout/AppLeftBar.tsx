import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "../../theme";
import { RootState } from "../../store";
import { Thread } from "../../store/types";

import { LEFT_BAR_BREAKPOINT } from "../../theme";
import { CHANGE_ACTIVE_THREAD } from "../../store/chat/types";

export const AppLeftBar = () => {
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.layout.opened);
  const threads = useSelector((state: RootState) => state.thread.threads);

  const onThreadClick = (thread: Thread) => {
    dispatch({ type: CHANGE_ACTIVE_THREAD, payload: thread });
  };

  return (
    <AppLeftBarWrapper className="grid" opened={opened}>
      <div className="flex flex-col" style={{ width: 240 }}>
        <div style={{ flex: 1 }}>
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="text-center cursor-pointer py-2"
              onClick={() => onThreadClick(thread)}
            >
              {thread.name}
            </div>
          ))}
        </div>
      </div>
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
