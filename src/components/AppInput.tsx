import React, { forwardRef } from "react";

const AppInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...restProps }, ref) => {
  return (
    <div>
      <input ref={ref} {...restProps} />
    </div>
  );
});

export default AppInput;
