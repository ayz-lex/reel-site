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
    this.setState(response.data !== 'NO' ? {loggedIn: true} : {loggedIn: false})
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  registerSubmitHandler = async e => {
    let response = await this.submitHandler(e, 'http://localhost:8080/api/register', {
      username: this.state.username_register,
      password: this.state.password_register,
      age: this.state.age,
      occupation: this.state.occupation,
      movie1: this.state.movie1,
      movie2: this.state.movie2,
      movie3: this.state.movie3
    })
    if (response.status === 200) {
      alert('Register Succeeded')
    } else {
      alert('Register Failed')
    }
    this.state = {}
    this.setState({loggedIn: response.data !== 'NO'})
  }

  loginSubmitHandler = async e => {
    let response = await this.submitHandler(e, 'http://localhost:8080/api/login', {
      username: this.state.username, 
      password: this.state.password
    })
    if (response.status === 200) {
      alert('Login Succeeded')
    } else {
      alert('Login Failed')
    }
    this.state = {}
    this.setState({loggedIn: response.data !== 'NO'})
  }

  submitHandler = async (e, route, data) => {
    e.preventDefault()
    let response = await axios.post(route, data)
    return response
  }

  logoutHandler = async e => {
    let response = await axios.get('http://localhost:8080/api/logout')
    console.log(response.data)
    this.setState({loggedIn: false})
  }

  searchHandler = async e => {
    let url = `http://localhost:8080/api/movie/${this.state.searched_movie}`
    let response = await axios.get(url)
    alert(response.data === 'Not Found' ? 'movie not found' : 'movie found')
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