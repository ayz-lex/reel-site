import React, {useState} from 'react'
import './NavigationBar.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Chip from '@material-ui/core/Chip'
import {emphasize, withStyles } from '@material-ui/core/styles'
import {LoggedinContext} from '../contexts/LoggedinContext'

class NavigationBar extends React.Component {

  render() {
    return (
      <div id="navigation_bar">
        <LoggedinContext.Consumer>
          {({isLoggedIn, toggleLoggedIn, toggleLoggedOut}) => (
           <NavBar isLoggedIn={isLoggedIn} toggleLoggedIn={toggleLoggedIn} toggleLoggedOut={toggleLoggedOut} />
          )}
        </LoggedinContext.Consumer>
      </div>
    )
  }
}

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip)

const NavBar = (props) => {
  return (
    props.isLoggedIn ? (
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb 
          component="a"
          href="/"
          label="Home"
        />
        <StyledBreadcrumb 
          component="a"
          href="/profile"
          label="Profile"
        />
        <LogoutButton toggledLoggedOut={props.toggleLoggedOut} />
      </Breadcrumbs>
    ) : (
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb 
          component="a"
          href="/"
          label="Home"
        />
        <StyledBreadcrumb 
          component="a"
          href="/login"
          label="Login"
        />
        <StyledBreadcrumb 
          component="a"
          href="/signup"
          label="Signup"
        />
      </Breadcrumbs>
    )
  )
}

const LogoutButton = (props) => {
  
  const toggleLoggedOut = props.toggleLoggedOut

  const logoutHandler = async e => {
    e.preventDefault()
    await fetch('http://localhost:8080/api/logout', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    toggleLoggedOut()
  }

  return (
    <StyledBreadcrumb
      label="Logout"
      onClick={logoutHandler}
    />
  )
}
export default NavigationBar