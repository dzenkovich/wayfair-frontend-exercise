import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, MenuItem, MenuList } from '@material-ui/core'
import { ArrowDownward } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { goTo } from '../../../common/utilities'

const useStyles = makeStyles((theme) => ({
  bar: {
    justifyContent: 'space-between',
  },
}))

const Menu = ({ shrinked, data }) => {
  const classes = useStyles()
  const { title, url, icon, children } = data
  const hasChildren = children && children.length
  const [expanded, setExpanded] = useState(false)
  const toggleExpand = () => setExpanded(!expanded)

  return (
    <>
      <MenuItem onClick={() => goTo(url)}>
        <Icon role="icon" itemType={icon}/>
        {title}
        {hasChildren && <ArrowDownward role="icon-expand" onClick={toggleExpand}/>}
      </MenuItem>
      {
        (expanded && hasChildren) && <MenuList>
          {children.map(item => <Menu shrinked={shrinked} data={item}/>)}
        </MenuList>
      }
    </>
  )
}

Menu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default React.memo(Menu)
