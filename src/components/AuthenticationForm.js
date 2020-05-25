import React from 'react'
import axios from 'axios'

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  registerSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/register', this.state, 'register failed')
  }

  loginSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/login', {username: this.state.username, password: this.state.password}, 'login failed')
  }

  submitHandler = async (e, route, data, errorMessage) => {
    e.preventDefault()
    await axios.post(route, data)
      .then(res => {  
        this.setState({loggedIn: res === 'OK'})
        if (res !== 'OK') {
          alert(errorMessage)
        }
      })
      .catch(err => {
        console.error(err)
      })
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

  logout = () => {
    return (
      <div>
        <button>Logout</button>
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
    if (this.state.loggedIn) {
      return (
        <div>
          {this.logout()}
        </div>
      )
    } else {
      return (
        <div>
          {this.login()}
          {this.register()}
        </div>
      )
    }
  }
}

export default AuthenticationForm