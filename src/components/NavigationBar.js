import React from 'react'
import './NavigationBar.css'
import {LoggedinContext} from '../../contexts/LoggedinContext'
import {BrowserRouter as Router, Redirect, Route, Switch, useParams} from 'react-router-dom'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {loggedIn: false}
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

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
    this.setState({loggedIn: false})
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
                <li><button id="logout_button" onClick={this.logoutHandler}>Logout</button></li>
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

const LoginButton = (props) => {
  
  toggleLoggedIn = props.toggleLoggedIn

  const loginSubmitHandler = async e => {
    e.preventDefault()
    await this.submitHandler(e, 'http://localhost:8080/api/login', {
      username: this.state.username, 
      password: this.state.password
    }).then(res => {
      if (res.status === 200) {
        alert('Login Succeeded')
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
            onChange = {this.changeHandler}
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'password'
            onChange = {this.changeHandler}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

const RegisterButton = (props) => {
  toggleLoggedIn = props.toggleLoggedIn

  const registerSubmitHandler = async e => {
    e.preventDefault()
    await this.submitHandler(e, 'http://localhost:8080/api/register', {
      username: this.state.username_register,
      password: this.state.password_register,
      age: this.state.age,
      occupation: this.state.occupation,
      movie1: this.state.movie1,
      movie2: this.state.movie2,
      movie3: this.state.movie3
    }).then(res => {
      if (res.status === 200) {
        alert('Register Succeeded')
        this.state = {}
        this.setState({loggedIn: true})
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      alert('Register Failed')
      this.state = {}
      this.setState({loggedIn: false})
    })
  }

  return (
    <div>
      <form onSubmit = {this.registerSubmitHandler}>
        <div>
          <input
            type = 'text' 
            name = 'username_register' 
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'password_register'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'number' 
            name = 'age'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'occupation'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'movie1'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'movie2'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <div>
          <input 
            type = 'text' 
            name = 'movie3'
            onChange = {this.changeHandler}
            required
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  )
}

export default NavigationBar