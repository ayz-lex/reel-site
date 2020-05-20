import React from 'react'
import axios from 'axios'

class PostForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      age: '',
      occupation: '',
      movie1: '',
      movie2: '',
      movie3: ''
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('http://localhost:8080/api/register', this.state)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const {username, password, age, occupation, movie1, movie2, movie3} = this.state

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
          <div>
            <input 
              type = 'number' 
              name = 'age'
              value = {age}
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'occupation'
              value = {occupation}
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie1'
              value = {movie1}
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie2'
              value = {movie2}
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie3'
              value = {movie3}
              onChange = {this.changeHandler}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default PostForm