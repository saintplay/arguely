import Modal from "styled-react-modal";
import PropTypes from "prop-types";

const APP_MODAL_DEFAULT_WIDTH = 460;

const AppModal = Modal.styled`
  width: ${(props: any) => props.width}px;
  max-width: calc(100vw - 20px);
  background-color: ${(props: any) => props.theme.colors.content1};
  color: ${(props: any) => props.theme.colors.text1};
`;
AppModal.prop = {
  width: PropTypes.number.isRequired,
};
AppModal.defaultProps = {
  width: APP_MODAL_DEFAULT_WIDTH,
};

export default AppModal;
