import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

const {
  default: styled,
  ThemeProvider: _ThemeProvider,
} = (styledComponents as any) as ThemedStyledComponentsModule<Theme>;

export const LEFT_BAR_BREAKPOINT = 480;

export type Theme = {
  colors: {
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    text1: string;
    textaccent1: string;
    text2: string;
    textaccent2: string;
  };
};

export const DISCORD_THEME: Theme = {
  colors: {
    content1: "#4f545c",
    content2: "#36393f",
    content3: "#2f3136",
    content4: "#202225",
    text1: "#dcddde",
    textaccent1: "#ffffff",
    text2: "#dcddde",
    textaccent2: "#ffffff",
  },
};

export const SLACK_THEME: Theme = {
  colors: {
    content1: "#ffffff",
    content2: "rgb(63, 14, 64)",
    content3: "rgb(63, 14, 64)",
    content4: "rgb(53, 13, 54)",
    text1: "rgb(29, 28, 29)",
    textaccent1: "rgb(29, 28, 29)",
    text2: "rgb(207, 195, 207)",
    textaccent2: "#ffffff",
  },
};

export const SKYPE_THEME: Theme = {
  colors: {
    content1: "#4f545c",
    content2: "#36393f",
    content3: "#2f3136",
    content4: "#202225",
    text1: "#dcddde",
    textaccent1: "#ffffff",
    text2: "#dcddde",
    textaccent2: "#ffffff",
  },
};

export const APP_THEMES = {
  DISCORD: "DISCORD",
  SLACK: "SLACK",
  SKYPE: "SKYPE",
};
export const DEFAULT_THEME = APP_THEMES.DISCORD;

export const ThemeProvider = _ThemeProvider;
export default styled;
