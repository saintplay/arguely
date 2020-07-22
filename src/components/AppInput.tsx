import React, { forwardRef } from "react";

import styled from "../theme";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  borderAlternative?: boolean;
}
const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ borderAlternative, ...restProps }, ref) => {
    return (
      <InputWrapper
        borderAlternative={borderAlternative}
        className="border rounded-md px-3 py-2"
      >
        <InnerInput ref={ref} {...restProps} className="border-none w-full" />
      </InputWrapper>
    );
  }
);

const InputWrapper = styled.div<{ borderAlternative?: boolean }>`
  background-color: ${(props) => props.theme.colors.inputbackground};
  border-color: ${(props) =>
    props.borderAlternative
      ? props.theme.colors.inputborder2
      : props.theme.colors.inputborder1};
`;

const InnerInput = styled.input`
  color: ${(props) => props.theme.colors.text1};
  background-color: ${(props) => props.theme.colors.inputbackground};
`;

export default AppInput;
