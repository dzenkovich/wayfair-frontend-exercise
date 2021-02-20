import { createMuiTheme } from '@material-ui/core/styles'

const primaryPurple = '#7F187F';
const secondaryGreen = '#C6D636';
const danger = '#FF0000'
const info = '#0000FF'

export default createMuiTheme({
  palette: {
    primary: {
      main: primaryPurple
    },
    secondary: {
      main: secondaryGreen
    },
    danger: {
      main: danger,
    },
    info: {
      main: info,
    },
  },
})
