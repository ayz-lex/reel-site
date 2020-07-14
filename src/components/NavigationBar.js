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
            /*
            <ul>
              {isLoggedIn ? (
                <div>
                <li><a href="/">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li>
                  <LogoutButton toggleLoggedOut={toggleLoggedOut}/>
                </li>
              </div>
              ) : (
                <div>
                  <li><a href="/">Home</a></li>
                  <li class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">Login</a>
                    <div class="dropdown-content">
                      <LoginButton toggleLoggedIn={toggleLoggedIn} toggleLoggedOut={toggleLoggedOut} />
                    </div>
                  </li>
                  <li class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">Register</a>
                    <div class="dropdown-content">
                      <RegisterButton toggleLoggedIn={toggleLoggedIn} toggleLoggedOut={toggleLoggedOut} />
                    </div>
                  </li>
                </div>
              )}
            </ul>
            */
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
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb 
          component="a"
          href="/"
          label="Home"
      />
      {props.isLoggedIn ? (
        <React.Fragment>
          <StyledBreadcrumb 
            component="a"
            href="/profile"
            label="Profile"
          />
          <LogoutButton toggledLoggedOut={props.toggleLoggedOut} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <LoginButton toggleLoggedIn={props.toggleLoggedIn} toggleLoggedOut={props.toggleLoggedOut} />
          <RegisterButton toggleLoggedIn={props.toggleLoggedIn} toggleLoggedOut={props.toggleLoggedOut} />
        </React.Fragment>
      )}
    </Breadcrumbs>
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

const LoginButton = (props) => {
  const toggleLoggedIn = props.toggleLoggedIn
  const toggleLoggedOut = props.toggleLoggedOut

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameChangeHandler = e => {
    setUsername(e.target.value)
  }
  const passwordChangeHandler = e => {
    setPassword(e.target.value)
  }

  const loginSubmitHandler = async e => {
    e.preventDefault()

    await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username, 
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        alert('Login Succeeded')
        toggleLoggedIn()
      } else {
        const error = new Error(res.error)
        throw error
        toggleLoggedOut()
      }
    }).catch(err => {
      console.error(err)
      alert('Error logging in')
      toggleLoggedOut()
    })
  }

  return (  
    <div>
      <form onSubmit = {loginSubmitHandler}>
        <div>
          <input
            type = 'text' 
            name = 'username' 
            onChange = {usernameChangeHandler}
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'password'
            onChange = {passwordChangeHandler}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

const RegisterButton = (props) => {
  const toggleLoggedIn = props.toggleLoggedIn
  const toggleLoggedOut = props.toggleLoggedOut

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameChangeHandler = e => {
    setUsername(e.target.value)
  }
  const passwordChangeHandler = e => {
    setPassword(e.target.value)
  }

  const registerSubmitHandler = async e => {
    e.preventDefault()
    await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username, 
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        alert('Register Succeeded')
        toggleLoggedIn()
      } else {
        const error = new Error(res.error)
        throw error
        toggleLoggedOut()
      }
    }).catch(err => {
      alert('Register Failed')
      toggleLoggedOut()
    })
  }

  return (
    <div>
      <form onSubmit = {registerSubmitHandler}>
        <div>
          <input
            type = 'text' 
            name = 'username_register' 
            onChange = {usernameChangeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'password_register'
            onChange = {passwordChangeHandler}
            required
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  )
}

export default NavigationBar