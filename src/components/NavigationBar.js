import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './NavigationBar.css'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.checkSession()
  }

  checkSession = async () => {
    await fetch('http://localhost:8080/api/checkLogin', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({loggedIn: true})
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
      this.setState({loggedIn: false})
    })
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  registerSubmitHandler = async e => {
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

  loginSubmitHandler = async e => {
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

  submitHandler = async (e, route, data) => {
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

  logoutHandler = async e => {
    e.preventDefault()
    let response = await fetch('http://localhost:8080/api/logout', {
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

  searchHandler = async e => {
    e.preventDefault()
    this.props.history.push(`/movie/${this.state.searched_movie}`)
  }

  login = () => {
    return (
      <div>
        <form onSubmit = {this.loginSubmitHandler}>
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

  register = () => {
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
              name = 'password_password'
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

  render() {
    let tabs
    if (this.state.loggedIn) {
      tabs = (
        <div>
          <li><a href="#home">Home</a></li>
          <li><button id="logout_button" onClick={this.logoutHandler}>Logout</button></li>
        </div>
      )
    } else {
      tabs = (
        <div>
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Login</a>
            <div class="dropdown-content">
              {this.login()}
            </div></li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Register</a>
            <div class="dropdown-content">
              {this.register()}
            </div>
          </li>
        </div>
      )
    }

    return (
      <div id="navigation_bar">
        <ul>
          {tabs}
          <li>
            <form onSubmit={this.searchHandler}>
              <input 
                type="text" 
                onChange={this.changeHandler} 
                name="searched_movie"
                required
              />
              <button>Search</button>
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavigationBar