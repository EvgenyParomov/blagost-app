import { SxProps, Theme } from "@mui/material";
declare type Sx = SxProps<Theme>;

declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}

  interface BreakpointOverrides {}
}
