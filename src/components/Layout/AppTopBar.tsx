import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { useSelector } from "react-redux";

import styled, { APP_THEMES } from "../../theme";
import { RootState } from "../../store";

function AppTopBar({
  onToggleLeftBar,
  onChangeTheme,
}: InferProps<typeof AppTopBar.propTypes>) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <AppTopBarWrapper className="flex">
      <div
        className="select-none cursor-pointer px-2"
        onClick={onToggleLeftBar}
      >
        Toggle LeftBar
      </div>
      <div>{currentUser.nickname}</div>
      <div
        className="select-none cursor-pointer px-2"
        onClick={() => onChangeTheme(APP_THEMES.DISCORD)}
      >
        Discord
      </div>
      <div
        className="select-none cursor-pointer px-2"
        onClick={() => onChangeTheme(APP_THEMES.SLACK)}
      >
        Slack
      </div>
      <div
        className="select-none cursor-pointer px-2"
        onClick={() => onChangeTheme(APP_THEMES.SKYPE)}
      >
        Skype
      </div>
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
