import React from 'react'
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Movie from './Movie'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movies: [], fetching: true, watched: []}
  }

  async fetchMovies() {
    //do error checking later
    let response = await fetch('http://localhost:8080/api/recommendations')
    let data = await response.json()
    const watched = this.state.watched
    let movies = data.filter(movie => {
      return watched.find(watchedMovie => {
        return watchedMovie.id === movie.id
      }) === undefined
    })
    this.setState({movies: movies, fetching: false})
  }

  async fetchWatched() {
    let response = await fetch('http://localhost:8080/api/watched')
    let data = await response.json()
    this.setState({watched: data})
  }

  getMovies (isLoggedIn) {
    if (isLoggedIn) {
      this.fetchWatched()
    }
    this.fetchMovies()
  }

  render() {
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn, toggleLoggedIn, toggleLoggedOut}) => (
          <div>
            {this.getMovies()}
            {this.state.fetching ? (
              <div> fetching </div>
            ) : (
              this.state.movies.map(movie => {
                return <Movie movie_id={movie.id} />
              })
            )}
          </div>
        )}
      </LoggedinContext.Consumer>
    )
  }
}

export default Main