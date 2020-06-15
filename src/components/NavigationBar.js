import React, {useState} from 'react'
import './NavigationBar.css'
import {LoggedinContext} from '../../contexts/LoggedinContext'
import {BrowserRouter as Router, Redirect, Route, Switch, useParams} from 'react-router-dom'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {loggedIn: false}
  }

  render() {
    return (
      <div id="navigation_bar">
        <LoggedinContext.Consumer>
          {({isLoggedIn, toggleLoggedIn}) => (
            <ul>
              {isLoggedIn ? (
                <div>
                <li><a href="/">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li>
                  <LogoutButton />
                </li>
              </div>
              ) : (
                <div>
                  <li><a href="/">Home</a></li>
                  <li class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">Login</a>
                    <div class="dropdown-content">
                      <LoginButton toggleLoggedIn={toggleLoggedIn} />
                    </div>
                  </li>
                  <li class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">Register</a>
                    <div class="dropdown-content">
                      <RegisterButton toggleLoggedIn={toggleLoggedIn} />
                    </div>
                  </li>
                </div>
              )}
            </ul>
          )}
        </LoggedinContext.Consumer>
      </div>
    )
  }
}

const submitHandler = async (e, route, data) => {
  let response = await fetch(route, {
    method: 'POST',
    withCredentials: 'true',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response
}

const LogoutButton = (props) => {
  logoutHandler = async e => {
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
    //change
    this.setState({loggedIn: false})
  }
  return (
    <button id="logout_button" onClick={logoutHandler}>Logout</button>
  )
}

const LoginButton = (props) => {
  
  toggleLoggedIn = props.toggleLoggedIn
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginSubmitHandler = async e => {
    e.preventDefault()

    const usernameChangeHandler = e => {
      setUsername(e.target.value)
    }
    const passwordChangeHandler = e => {
      setPassword(e.target.value)
    }

    await submitHandler(e, 'http://localhost:8080/api/login', {
      username: username, 
      password: password
    }).then(res => {
      if (res.status === 200) {
        alert('Login Succeeded')
        //change later
        this.state = {}
        this.setState({loggedIn: true})
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
      alert('Error logging in')
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
  toggleLoggedIn = props.toggleLoggedIn
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
    await this.submitHandler(e, 'http://localhost:8080/api/register', {
      username: this.state.username_register,
      password: this.state.password_register
    }).then(res => {
      if (res.status === 200) {
        alert('Register Succeeded')
        //change later
        this.state = {}
        this.setState({loggedIn: true})
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      alert('Register Failed')
      //change later
      this.state = {}
      this.setState({loggedIn: false})
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