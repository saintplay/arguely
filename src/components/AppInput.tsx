import React from "react";

const AppInput = ({
  ...restProps
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <input {...restProps} />
    </div>
  );
};

export default AppInput;
