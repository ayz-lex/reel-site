import React from 'react'
import axios from 'axios'
import './NavigationBar.css'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.checkSession()
  }

  checkSession = async () => {
    let response = await axios.get('http://localhost:8080/api/checkLogin')
    this.setState({loggedIn: response.data === 'OK'})
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  registerSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/register', {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      occupation: this.state.occupation,
      movie1: this.state.movie1,
      movie2: this.state.movie2,
      movie3: this.state.movie3
    }, 'register failed')
  }

  loginSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/login', {
      username: this.state.username, 
      password: this.state.password
    }, 'login failed')
  }

  submitHandler = async (e, route, data, errorMessage) => {
    e.preventDefault()
    console.log(this.state)
    let response = await axios.post(route, data)
    this.setState({loggedIn: response.data === 'OK'})
    alert(response.data === 'OK' ? 'success' : errorMessage)
  }

  logoutHandler = async e => {
    this.setState({loggedIn: false})
    await axios.get('http://localhost:8080/api/logout')
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
              name = 'username' 
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'password'
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
            <form>
              <input type="text" id="input" name="input"/>
              <input type="submit"/>
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavigationBar