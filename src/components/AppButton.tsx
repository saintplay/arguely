import React from "react";
import PropTypes, { InferProps } from "prop-types";

function AppButton({
  children,
  onClick,
}: InferProps<typeof AppButton.propTypes>) {
  return (
    <div className="select-none cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
AppButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};
AppButton.defaultProps = {
  children: "",
  onClick: () => {},
};

export default AppButton;
