import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import styled, {
  ThemeProvider,
  LEFT_BAR_BREAKPOINT,
  APP_THEMES,
  DISCORD_THEME,
  SLACK_THEME,
  SKYPE_THEME,
} from "./theme";

import { RootState } from "./store";
import { addUser, updateUser, addThreadMessage } from "./store/server/actions";
import { toggleLeftBar, changeTheme } from "./store/layout/actions";

import AppTopBar from "./components/Layout/AppTopBar";
import { AppLeftBar } from "./components/Layout/AppLeftBar";

import ActiveChat from "./views/ActiveChat";

import { channel } from "./lib/services/broadcast";
import {
  BroadcastMessageType,
  BroadcastMessage,
} from "./lib/services/broadcast/types";
import {
  sendEnterSeverMessage,
  sendAddOrUpdateUserMessage,
} from "./lib/services/broadcast/messages";

const activeThreadSelector = createSelector(
  (state: RootState) => state.server.threads,
  (state: RootState) => state.server.activeThreadId,
  (threads, activeThreadId) =>
    threads.find((t) => t.id === activeThreadId) || null
);

function App() {
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.layout.theme);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const activeThread = useSelector(activeThreadSelector);

  const [entered, setEntered] = useState(false);

  const theme = useMemo(() => {
    switch (themeName) {
      case APP_THEMES.SKYPE:
        return SKYPE_THEME;
      case APP_THEMES.SLACK:
        return SLACK_THEME;
      case APP_THEMES.DISCORD:
      default:
        return DISCORD_THEME;
    }
  }, [themeName]);

  const onChannelMessage = (message: BroadcastMessage) => {
    switch (message.type) {
      case BroadcastMessageType.ENTER_SERVER: {
        dispatch(addUser(message.user));
        // Comunicate back current user to new new user
        sendAddOrUpdateUserMessage(currentUser);
        break;
      }
      case BroadcastMessageType.ADD_OR_UPDATE_USER: {
        dispatch(updateUser(message.user));
        break;
      }
      case BroadcastMessageType.ADD_CHAT_ENTRY: {
        dispatch(addThreadMessage(message.threadId, message.entry));
        break;
      }
    }
  };

  useEffect(
    () => {
      channel.onmessage = (message) => onChannelMessage(message);

      if (entered) return;

      dispatch(addUser(currentUser));
      sendEnterSeverMessage(currentUser);
      setEntered(true);
    },
    // Disable this rule, to include dependencies manually
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [activeThread]
  );

  // Close channel only once
  useEffect(
    () => () => {
      channel.close();
    },
    []
  );

  const getMainContent = () => {
    if (!activeThread) {
      return <div>No se seleccionó nigún Chat</div>;
    }
    return <ActiveChat activeThread={activeThread} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <RootWrapper className="grid h-screen">
        <AppTopBar
          onToggleLeftBar={() => dispatch(toggleLeftBar())}
          onChangeTheme={(themeName) => dispatch(changeTheme(themeName))}
        />
        <WorkspaceWrapper className="grid relative">
          <AppLeftBar />
          <ContentWrapper>{getMainContent()}</ContentWrapper>
        </WorkspaceWrapper>
      </RootWrapper>
    </ThemeProvider>
  );
}

const RootWrapper = styled.div`
  grid-template-rows: min-content auto;
`;

const WorkspaceWrapper = styled.div`
  grid-template-columns: min-content auto;
  grid-template-rows: auto;
  background-color: ${(props) => props.theme.colors.content1};

  @media (max-width: ${LEFT_BAR_BREAKPOINT}px) {
    grid-template-columns: auto;
  }
`;

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.colors.text1};
`;

export default App;
