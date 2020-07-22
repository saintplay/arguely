import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import styled, { APP_THEMES } from "../../theme";

import AppModal from "../AppModal";
import AppInput from "../AppInput";
import AppButton from "../AppButton";
import AppHr from "../AppHr";
import TextAccent1Container from "../StyledContainer/TextAccent1Container";
import TextDimmed1Container from "../StyledContainer/TextDimmed1Container";

import { RootState } from "../../store";
import { updateUser } from "../../store/server/actions";
import { changeCurrentUser } from "../../store/user/actions";

import { sendAddOrUpdateUserMessage } from "../../lib/services/broadcast/messages";
import { APP_HEADER_HEIGHT } from "../../lib/ui";

// TODO Proper validation
const MAX_NICKNAME_LENGTH = 64;

function AppTopBar({
  onToggleLeftBar,
  onChangeTheme,
}: InferProps<typeof AppTopBar.propTypes>) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [settingsModal, setSettingsModal] = useState(false);
  const [dirtyNickname, setDirtyNickname] = useState("");

  const onOpenSettingsModal = () => {
    setDirtyNickname(currentUser.nickname);
    setSettingsModal(true);
  };

  const onCloseSettingsModal = () => {
    setSettingsModal(false);
    setDirtyNickname("");
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

  const renderSeparator = (alternative?: boolean) => {
    return (
      <div className="py-4">
        <AppHr alternative={alternative} className="border-t-semi" />
      </div>
    );
  };

  return (
    <AppTopBarWrapper
      className="flex items-center"
      style={{ height: APP_HEADER_HEIGHT }}
    >
      <div
        className="select-none cursor-pointer px-2"
        onClick={onToggleLeftBar}
      >
        Toggle LeftBar
      </div>
      <div onClick={() => onOpenSettingsModal()}>{currentUser.nickname}</div>

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
