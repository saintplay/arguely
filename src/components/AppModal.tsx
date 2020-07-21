import Modal from "styled-react-modal";

export default Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) => props.theme.colors.content1};
  color: ${(props: any) => props.theme.colors.text1};
`;
