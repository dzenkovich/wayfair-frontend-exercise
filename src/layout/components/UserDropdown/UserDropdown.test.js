import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../../../common/constants/theme'
import UserDropdown from './UserDropdown'

const user = {
  firstName: 'Denis',
  lastName: 'Zenkovich',
}

const UserLoggedOffExample = () => (
  <ThemeProvider theme={theme}>
    <UserDropdown user={null}></UserDropdown>
  </ThemeProvider>
)

const UserLoggedInExample = () => (
  <ThemeProvider theme={theme}>
    <UserDropdown user={user}></UserDropdown>
  </ThemeProvider>
)


describe('User name dropdown navigation', () => {
  afterEach(cleanup)

  it('Logged off state shows login link', async () => {
    const { getByRole, queryByRole } = render(<UserLoggedOffExample/>)
    expect(getByRole('login')).toBeVisible()
    expect(queryByRole('user')).not.toBeInTheDocument()
  })

  it('Logged in state shows username and icon', async () => {
    const { getByRole, queryByRole, getByTitle } = render(<UserLoggedInExample/>)
    expect(queryByRole('login')).not.toBeInTheDocument()
    const userLink = getByRole('user');
    expect(userLink).toHaveTextContent(user.firstName)
    expect(getByTitle(user.firstName)).toBeVisible()
  })

  it('Dropdown displayed when clicked on user name in logged in state', async () => {
    const { getByRole } = render(<UserLoggedInExample/>)
    fireEvent.click(getByRole('user'))
    expect(getByRole('user-menu')).toBeVisible()
  })

  it('Clicking "Account Settings" changes url hash to "#account-settings"', async () => {
    const { getByRole, getByText } = render(<UserLoggedInExample/>)
    fireEvent.click(getByRole('user'))
    expect(getByRole('user-menu')).toBeVisible()
    fireEvent.click(getByText('Account Settings'))
    expect(window.location.hash).toEqual('#account-settings')
  })

  it('Clicking "User Management" changes url hash to "#user-management"', async () => {
    const { getByRole, getByText } = render(<UserLoggedInExample/>)
    fireEvent.click(getByRole('user'))
    expect(getByRole('user-menu')).toBeVisible()
    fireEvent.click(getByText('User Management'))
    expect(window.location.hash).toEqual('#user-management')
  })

})
