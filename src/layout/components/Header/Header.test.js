import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../../../common/constants/theme'
import Header from './Header'

const HeaderExample = () => (
  <ThemeProvider theme={theme}>
    <Header>test content</Header>
  </ThemeProvider>
)

describe('Header that sticky to top', () => {
  afterEach(cleanup)

  it('header displays logo first', async () => {
    const { getByRole } = render(<HeaderExample/>)
    const logo = getByRole('logo')
    expect(logo).toBeInTheDocument()
    expect(logo.previousSibling).toBeNull()
  })

  it('header displays content after logo', async () => {
    const { getByText, getByRole } = render(<HeaderExample/>)
    const content = getByText('test content')
    expect(content).toBeInTheDocument()
    expect(content.nextSibling).toBeNull()
    expect(content.previousSibling).toBe(getByRole('logo'))
  })

  it('Header has position fixed that makes it sticky', async () => {
    const { getByRole } = render(<HeaderExample/>)
    const styles = window.getComputedStyle(getByRole('header'));
    expect(styles.position).toBe('fixed')
    expect(styles.top).toBe('0px')
    expect(styles.right).toBe('0px')
  })

})
