import React from "react";
import { useSelector } from "react-redux";
import PropTypes, { InferProps } from "prop-types";

import styled, { APP_THEMES } from "../theme";
import { RootState } from "../store";

import { USER_AVATAR_SIZE } from "../lib/ui";
import { IconSize } from "../lib/types";

import { ReactComponent as DiscordUserIcon } from "../icons/discorduser.svg";
import { ReactComponent as SlackUserIcon } from "../icons/slackuser.svg";

function AppAvatar({ color }: InferProps<typeof AppAvatar.propTypes>) {
  const themeName = useSelector((state: RootState) => state.layout.theme);

  return (
    <div
      className="flex justify-center items-center rounded-md"
      style={{
        width: USER_AVATAR_SIZE,
        height: USER_AVATAR_SIZE,
        backgroundColor: color,
      }}
    >
      {themeName === APP_THEMES.DISCORD ? (
        <DiscordUserIcon
          width={IconSize.xl}
          height={IconSize.xl}
          fill="white"
        />
      ) : (
        <SlackUserIcon width={IconSize.lg} height={IconSize.lg} fill="white" />
      )}
    </div>
  );
}
AppAvatar.propTypes = {
  color: PropTypes.string.isRequired,
};

export default AppAvatar;
