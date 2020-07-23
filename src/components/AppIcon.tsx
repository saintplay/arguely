import React, { FunctionComponent } from "react";
import classNames from "classnames";

import styled from "../theme";

import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as HashtagIcon } from "../icons/hashtag.svg";
import { ReactComponent as MoreIcon } from "../icons/more.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as SendIcon } from "../icons/send.svg";
import { ReactComponent as SettingIcon } from "../icons/setting.svg";
import { ReactComponent as SidebarIcon } from "../icons/sidebar.svg";
import { ReactComponent as TrashIcon } from "../icons/trash.svg";

import { IconSize } from "../lib/types";

interface StringMap {
  [key: string]: string;
}

const getInnerIcon = (children: string) => {
  switch (children) {
    case "close":
      return styled(CloseIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "hashtag":
      return styled(HashtagIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "more":
      return styled(MoreIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "search":
      return styled(SearchIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "send":
      return styled(SendIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "setting":
      return styled(SettingIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "sidebar":
      return styled(SidebarIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
    case "trash":
    default:
      return styled(TrashIcon)`
        fill: ${(props) =>
          props.fill
            ? (props.theme.colors as StringMap)[props.fill]
            : props.theme.colors.text1};
      `;
  }
};

interface AppIconProps extends React.SVGAttributes<SVGElement> {
  size?: IconSize;
  fill?: string;
  className?: string;
  children: string;
}

const AppIcon: FunctionComponent<AppIconProps> = ({
  size = IconSize.default,
  children,
  fill = "text1",
  className = "",
  ...restProps
}) => {
  const actualSize = size.toString();

  const ActualIcon = getInnerIcon(children);

  return (
    <ActualIcon
      width={actualSize}
      height={actualSize}
      fill={fill}
      className={classNames("inline", "leading-none", className)}
      {...restProps}
    >
      {children}
    </ActualIcon>
  );
};

export default AppIcon;
