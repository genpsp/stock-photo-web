import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    ui: Palette['primary']
  }
  interface PaletteOptions {
    ui?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ui: true
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E4A66',
    },
    ui: {
      main: '#FFF',
    },
  },
})

export default theme
