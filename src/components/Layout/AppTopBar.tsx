import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import AppModal from "../AppModal";
import AppInput from "../AppInput";
import AppButton from "../AppButton";

import styled, { APP_THEMES } from "../../theme";

import { RootState } from "../../store";
import { updateUser } from "../../store/server/actions";
import { changeCurrentUser } from "../../store/user/actions";

import { sendAddOrUpdateUserMessage } from "../../lib/services/broadcast/messages";

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

  return (
    <AppTopBarWrapper className="flex">
      <div
        className="select-none cursor-pointer px-2"
        onClick={onToggleLeftBar}
      >
        Toggle LeftBar
      </div>
      <div onClick={() => onOpenSettingsModal()}>{currentUser.nickname}</div>

      <AppModal
        isOpen={settingsModal}
        onBackgroundClick={() => onCloseSettingsModal()}
        onEscapeKeydown={() => onCloseSettingsModal()}
      >
        <div className="flex">
          <AppInput
            value={dirtyNickname}
            onChange={(e) => setDirtyNickname(e.target.value)}
          />
          <AppButton onClick={() => onCloseSettingsModal()}>Close me</AppButton>
        </div>
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
        <AppButton onClick={() => onSaveDirtyNickname()}>Guardar</AppButton>
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
