import React from 'react'
import { connect } from 'react-redux'
import UserDropdown from '../components/UserDropdown/UserDropdown'
import { login, logout } from '../actions/actions'

const UserDropdownContainer = props => <UserDropdown {...props} />

const mapStateToProps = state => ({
  user: state.layout.user,
})

const mapDispatchToProps = {
  login,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdownContainer)
