import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../../../common/constants/theme'
import Menu from './Menu'

const MenuExample = (props) => (
  <ThemeProvider theme={theme}>
    <Menu {...props}/>
  </ThemeProvider>
)

const menuData = {
  "title": "Reporting",
  "url": "#reporting",
  "id": "menu-reporting",
  "icon": "reporting",
  "hasAlert": null,
  "children": []
}

const menuWithChildrenData = {
  "title": "Reporting",
  "url": null,
  "id": "menu-reporting",
  "icon": "reporting",
  "hasAlert": null,
  "children": [
    {
      "title": "Sales Dashboard",
      "url": "https://partnerswayfaircom.csnzoo.com/v/sales_dashboard/index",
      "id": "menu-sales-dashboard",
      "icon": null,
      "hasAlert": null,
      "children": []
    },
    {
      "title": "Forecast",
      "url": "https://partnerswayfaircom.csnzoo.com/v/forecast/index/",
      "id": "menu-forecast",
      "icon": null,
      "hasAlert": null,
      "children": []
    },
  ]
}

describe('Menu section that can have icon and children', () => {
  afterEach(cleanup)

  it('Menu shows the title when not shrinked', async () => {
    const { queryByText } = render(<MenuExample shrinked={false} data={menuData}/>)
    expect(queryByText("Reporting")).toBeVisible()
  })

  it('Menu shows icon when icon is provided', async () => {
    const { getByRole } = render(<MenuExample shrinked={true} data={menuData}/>)
    expect(getByRole("icon")).toBeVisible()
  })

  it('Menu does not show icon when icon is null', async () => {
    const updatedData = {
      ...menuData,
      icon: null
    }
    const { queryByRole } = render(<MenuExample shrinked={true} data={updatedData}/>)
    expect(queryByRole("icon")).not.toBeInTheDocument()
  })

  it('Menu shows only the icon when shrinked', async () => {
    const { getByRole, queryByText } = render(<MenuExample shrinked={true} data={menuData}/>)
    expect(queryByText("Reporting")).not.toBeInTheDocument()
    expect(getByRole("icon")).toBeVisible()
  })

  it('Menu shows expander icon when it has children', async () => {
    const { getByRole } = render(<MenuExample shrinked={false} data={menuWithChildrenData}/>)
    expect(getByRole("icon-expand")).toBeVisible()
  })

  it('Menu does not show expander icon when it has no children', async () => {
    const { queryByRole } = render(<MenuExample shrinked={false} data={menuData}/>)
    expect(queryByRole("icon-expand")).not.toBeInTheDocument()
  })

  it('Menu expands and shows children on icon click', async () => {
    const { getByRole, queryByText } = render(<MenuExample shrinked={false} data={menuWithChildrenData}/>)
    fireEvent.click(getByRole("icon-expand"))
    expect(queryByText("Sales Dashboard")).toBeVisible()
    expect(queryByText("Forecast")).toBeVisible()
  })

  it('Menu expands and shows children on title click if it has children', async () => {
    const { getByText, queryByText } = render(<MenuExample shrinked={false} data={menuWithChildrenData}/>)
    fireEvent.click(getByText("Reporting"))
    expect(queryByText("Sales Dashboard")).toBeVisible()
    expect(queryByText("Forecast")).toBeVisible()
  })

  it('Menu changes url if it has no children', async () => {
    const { getByText } = render(<MenuExample shrinked={false} data={menuData}/>)
    fireEvent.click(getByText("Reporting"))
    expect(window.location.hash).toEqual('#reporting')
  })

})
