import { unstable_createMuiStrictModeTheme, ThemeOptions } from '@mui/material'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#70C5FF'
    },
    secondary: {
      main: '#D0ECFF'
    },
    info: {
      main: '#673ab7'
    }
  }
}

export const THEME = unstable_createMuiStrictModeTheme(themeOptions)
