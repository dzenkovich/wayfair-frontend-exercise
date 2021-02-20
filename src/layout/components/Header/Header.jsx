import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Typography, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bar: {
    justifyContent: 'space-between'
  },
  logo: {
    maxHeight: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textTransform: 'uppercase'
  },
}));

const Header = ({ title, children }) => {
  const classes = useStyles();

  return (
    <AppBar role="header" color="inherit">
      <Toolbar className={classes.bar}>
        <img src="/wayfair-partner-home-logo.svg" className={classes.logo} role="logo" alt="logo"/>
        <div className={classes.content}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {
  title: '',
}

export default React.memo(Header)
