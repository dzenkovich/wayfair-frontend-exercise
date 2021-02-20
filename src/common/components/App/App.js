import React from 'react'
import './App.css'
import Header from '../../../layout/components/Header/Header'
import UserDropdownContainer from '../../../layout/containers/UserDropdownContainer'
import theme from '../../constants/theme'
import { ThemeProvider } from '@material-ui/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <UserDropdownContainer/>
      </Header>
    </ThemeProvider>
  );
}

export default App;
