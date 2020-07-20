import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled, {
  ThemeProvider,
  LEFT_BAR_BREAKPOINT,
  APP_THEMES,
  DISCORD_THEME,
  SLACK_THEME,
  SKYPE_THEME,
} from "./theme";

import { RootState } from "./store";
import { addUser, updateUser } from "./store/server/actions";
import { toggleLeftBar, changeTheme } from "./store/layout/actions";

import AppTopBar from "./components/Layout/AppTopBar";
import { AppLeftBar } from "./components/Layout/AppLeftBar";

import ActiveChat from "./views/ActiveChat";

import { channel } from "./lib/services/broadcast";
import { BroadcastMessageType } from "./lib/services/broadcast/types";
import {
  sendEnterSeverMessage,
  sendAddOrUpdateUserMessage,
} from "./lib/services/broadcast/messages";

function App() {
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.layout.theme);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const activeThread = useSelector(
    (state: RootState) => state.chat.activeThread
  );

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

  useEffect(() => {
    channel.onmessage = (message) => {
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
      }
    };
    dispatch(addUser(currentUser));
    sendEnterSeverMessage(currentUser);

    return () => {
      channel.close();
    };
  }, [currentUser, dispatch]);

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
