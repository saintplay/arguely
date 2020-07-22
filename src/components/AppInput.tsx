import React, { forwardRef } from "react";

import styled from "../theme";

const AppInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...restProps }, ref) => {
  return (
    <InputWrapper className="border rounded-md px-3 py-2">
      <InnerInput ref={ref} {...restProps} className="border-none w-full" />
    </InputWrapper>
  );
});

const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.inputbackground};
  border-color: ${(props) => props.theme.colors.inputborder};
`;

const InnerInput = styled.input`
  color: ${(props) => props.theme.colors.text1};
  background-color: ${(props) => props.theme.colors.inputbackground};
`;

export default AppInput;
