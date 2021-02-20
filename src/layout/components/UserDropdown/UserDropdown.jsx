import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons'
import { URLS } from '../../../common/constants'
import { goTo } from '../../../common/utilities'

const useStyles = makeStyles(theme => ({
  userIcon: {
    marginLeft: theme.spacing(2),
  },
}))

const UserDropdown = ({ user, login, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return user ?
    <>
      <Button color="inherit" role="user" onClick={openMenu}>
        {user.firstName}
        <AccountCircleOutlined title={user.firstName} className={classes.userIcon}/>
      </Button>
      <Menu role="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
      >
        <MenuItem onClick={() => goTo(URLS.accountSettings)}>Account Settings</MenuItem>
        <MenuItem onClick={() => goTo(URLS.userManagement)}>User Management</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
    :
    <Button color="inherit" onClick={login} role="login">Login</Button>
}

UserDropdown.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default React.memo(UserDropdown)
