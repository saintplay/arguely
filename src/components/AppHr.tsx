import styled from "../theme";

const AppHr = styled.hr<{ alternative?: boolean }>`
  border-color: ${(props) =>
    props.alternative
      ? props.theme.colors.border2
      : props.theme.colors.border1};
`;
export default AppHr;
