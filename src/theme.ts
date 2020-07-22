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
    textdimmed1: string;
    text2: string;
    textaccent2: string;
    border1: string;
    border2: string;
    inputbackground: string;
    inputborder: string;
  };
};

export const DISCORD_THEME: Theme = {
  colors: {
    content1: "rgb(54, 57, 63)",
    content2: "#36393f",
    content3: "#202225",
    content4: "#2f3136",
    text1: "#dcddde",
    textaccent1: "#ffffff",
    textdimmed1: "rgb(114, 118, 125)",
    text2: "#dcddde",
    textaccent2: "#ffffff",
    border1: "rgb(102, 102, 102)",
    border2: "rgb(64, 64, 64)",
    inputbackground: "rgb(64, 68, 75)",
    inputborder: "rgb(64, 68, 75)",
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
    textdimmed1: "rgb(97, 96, 97)",
    text2: "rgb(207, 195, 207)",
    textaccent2: "#ffffff",
    border1: "rgb(221, 221, 221)",
    border2: "rgb(82,38,83)",
    inputbackground: "#ffffff",
    inputborder: "rgb(29, 28, 29)",
  },
};

export const APP_THEMES = {
  DISCORD: "DISCORD",
  SLACK: "SLACK",
};
export const DEFAULT_THEME = APP_THEMES.DISCORD;

export const ThemeProvider = _ThemeProvider;
export default styled;
