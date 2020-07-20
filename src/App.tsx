import React, { useMemo } from "react";
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

import AppTopBar from "./components/Layout/AppTopBar";
import { AppLeftBar } from "./components/Layout/AppLeftBar";

import ActiveChat from "./views/ActiveChat";
import { toggleLeftBar, changeTheme } from "./store/layout/actions";

function App() {
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.layout.theme);

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

  return (
    <ThemeProvider theme={theme}>
      <RootWrapper className="grid h-screen">
        <AppTopBar
          onToggleLeftBar={() => dispatch(toggleLeftBar())}
          onChangeTheme={(themeName) => dispatch(changeTheme(themeName))}
        />
        <WorkspaceWrapper className="grid relative">
          <AppLeftBar />
          <ContentWrapper>
            <ActiveChat />
          </ContentWrapper>
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
