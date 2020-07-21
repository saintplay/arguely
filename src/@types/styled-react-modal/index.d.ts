declare module "styled-react-modal" {
  import { Theme } from "../../theme";
  import { FunctionComponent } from "react";
  const {
    default: styled,
  } = (styledComponents as any) as ThemedStyledComponentsModule<Theme>;

  const ModalProvider: FunctionComponent<{}>;
  const Modal: FunctionComponent<{
    isOpen: boolean;
    onBackgroundClick?: function;
  }>;
}
