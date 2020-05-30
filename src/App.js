import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import AuthenticationForm from './components/AuthenticationForm.js'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {movies: [
      {
        name: 'name',
        popularity: 'popularity',
        genre: 'genre',
        year: 'year',
        description: 'description'
      }, 
      {
        name: 'name2',
        popularity: 'popularity2',
        genre: 'genre2',
        year: 'year2',
        description: 'description2'
      },
      {
        name: 'name3',
        popularity: 'popularity3',
        genre: 'genre3',
        year: 'year3',
        description: 'description3'
      }
    ]}
  }
  
  render() {
    return (
      <div>
        <NavBar />
        <MovieSection movies={this.state.movies}/>
      </div>
    )
  }

  /*
  async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/movie')
    const data = await response.json();
    this.setState({newMovie: data})
  }
  */
}

function NavBar() {
  return (
    <div>
      <AuthenticationForm />
    </div>
  )
}

function MovieSection(props) {
  return (
    <div>
      {props.movies.map(movie => (
        <React.Fragment>
          <Movie {...movie} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default App;
