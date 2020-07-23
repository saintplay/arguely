import React, { forwardRef } from "react";

import styled from "../theme";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  borderAlternative?: boolean;
  after?: any;
  before?: any;
  transparent?: any;
}
const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      borderAlternative,
      after = null,
      before = null,
      transparent = false,
      ...restProps
    },
    ref
  ) => {
    return (
      <InputWrapper
        borderAlternative={borderAlternative}
        transparent={transparent}
        className="flex items-center border rounded-md px-3 py-2"
      >
        {before}
        <InnerInput
          ref={ref}
          transparent={transparent}
          {...restProps}
          className="border-none w-full"
        />
        {after}
      </InputWrapper>
    );
  }
);

const InputWrapper = styled.div<{
  borderAlternative?: boolean;
  transparent: boolean;
}>`
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.inputbackground};
  border-color: ${(props) =>
    props.borderAlternative
      ? props.theme.colors.inputborder2
      : props.theme.colors.inputborder1};
`;

const InnerInput = styled.input<{ transparent: boolean }>`
  color: ${(props) => props.theme.colors.text1};
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.inputbackground};
`;

export default AppInput;
