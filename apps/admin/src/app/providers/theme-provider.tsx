import { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import { LocalizationProvider } from '@mui/lab';

type Props = {
  children?: ReactNode;
};
export function ThemeProvider({ children }: Props) {
  const theme = useMemo(() => createTheme(), []);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} locale={'ru'}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </LocalizationProvider>
  );
}
