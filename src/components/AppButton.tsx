import React from "react";
import PropTypes, { InferProps } from "prop-types";
import styled from "../theme";

function AppButton({
  children,
  onClick,
}: InferProps<typeof AppButton.propTypes>) {
  return (
    <ButtonWrapper
      className="select-none cursor-pointer rounded-md px-3 py-2"
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  color: ${(props) => props.theme.colors.buttoncolor};
  background-color: ${(props) => props.theme.colors.buttonbackground};
`;

export default AppButton;
