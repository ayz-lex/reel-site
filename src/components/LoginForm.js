import React from 'react'
import axios from 'axios'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('http://localhost:8080/api/login', this.state)
      .then(res => {  
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {username, password} = this.state

    return (
      <div>
        <form onSubmit = {this.submitHandler}>
          <div>
            <input
              type = 'text' 
              name = 'username' 
              value = {username}
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'password'
              value = {password}
              onChange = {this.changeHandler}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm