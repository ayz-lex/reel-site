import React from 'react'

/** MUI components */
import {
  Breadcrumbs,
  Chip,
  Box
} from '@material-ui/core'
import {emphasize, withStyles, makeStyles } from '@material-ui/core/styles'

/** authentication context, acts as global state */
import {LoggedinContext} from '../contexts/LoggedinContext'

require('dotenv').config()

class NavigationBar extends React.Component {

  render() {
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn, toggleLoggedOut}) => (
          <NavBar isLoggedIn={isLoggedIn} toggleLoggedOut={toggleLoggedOut} />
        )}
      </LoggedinContext.Consumer>
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
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '15px',
      marginBottom: '20px'
    }
  }))
  
  const classes = useStyles()

  return (
    props.isLoggedIn ? (
      <Box className={classes.root}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb 
            component="a"
            href="/"
            label="Home"
            onClick
          />
          <StyledBreadcrumb 
            component="a"
            href="/profile"
            label="Profile"
            onClick
          />
          <LogoutButton toggleLoggedOut={props.toggleLoggedOut} />
        </Breadcrumbs>
      </Box>
    ) : (
      <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
        <StyledBreadcrumb 
          component="a"
          href="/"
          label="Home"
          onClick
        />
        <StyledBreadcrumb 
          component="a"
          href="/login"
          label="Login"
          onClick
        />
        <StyledBreadcrumb 
          component="a"
          href="/signup"
          label="Signup"
          onClick
        />
      </Breadcrumbs>
    )
  )
}

const LogoutButton = (props) => {
  
  const toggleLoggedOut = props.toggleLoggedOut

  const logoutHandler = async e => {
    e.preventDefault()
    await fetch(`${process.env.HOST}:8080/api/logout`, {
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