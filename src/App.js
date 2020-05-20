import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import PostForm from './components/PostForm.js'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {movies: [{name: 'jesus'}]}
  }
  
  render() {
    return (
      <div>
        <nav>
          <ul>
            {this.checkAuthentication()}
          </ul>
        </nav>
        <PostForm />
        <h1> hello, it is {new Date().toLocaleDateString()} </h1>
        <p></p>
        <Movie />
      </div>
    )
  }

  checkAuthentication() {
    if (this.loggedIn) {
      return (
        <div> 
          <li><a href="/home">home</a></li>
          <li><a href="/logout">logout</a></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><a href="/home">home</a></li>
          <li><a href="/register">register</a></li>
          <li><a href="/login">login</a></li>
        </div>
      )
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/movie')
    const data = await response.json();
    this.setState({newMovie: data})
  }

}

export default App;
