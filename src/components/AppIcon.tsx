import React, { FunctionComponent } from "react";
import classNames from "classnames";

import styled from "../theme";

import { ReactComponent as SendIcon } from "../icons/send.svg";

import { IconSize } from "../lib/types";

interface StringMap {
  [key: string]: string;
}

const getInnerIcon = (children: string) => {
  switch (children) {
    case "send":
    default:
      return styled(SendIcon)`
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
