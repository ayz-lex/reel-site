import React from 'react'
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Movie from './Movie'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movies: [], numMovies: 0, fetching: true, watched: [], page: 1}
  }

  componentDidUpdate = () => {
    this.fetchMovies()
  }

  async fetchMovies() {
    //do error checking later
    if (this.state.numMovies < 10) {
      let numberOfAddedMovies = 0
      let response = await fetch(`http://localhost:8080/api/recommendations/${this.state.page}`)
      let data = await response.json()
      //do this because watched array will be comparatively small
      const watched = this.state.watched
      let movies = data.filter(movie => {
        if (watched.find(watchedMovie => {
          return watchedMovie.id === movie.id
        }) === undefined) {
          numberOfAddedMovies++
          return true
        }
        return false
      })
      this.state.movies = this.state.movies.concat(movies)
      this.state.numMovies += numberOfAddedMovies
      this.state.page += 1
      this.setState({fetching: false})
    }
  }

  async fetchWatched() {
    let response = await fetch('http://localhost:8080/api/watched', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    let data = await response.json()
    this.state.watched = data
  }

  getWatched(isLoggedIn) {
    if (isLoggedIn) {
      this.fetchWatched()
    }
    this.setState({fetching: false})
  }

  remover = (id) => {
    let newMovies = this.state.movies.filter(movie => {
      return movie.id !== id
    })
    this.state.movies = newMovies
    this.setState({numMovies: --this.state.numMovies})
  }

  render() {
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn}) => (
          <div>
            {this.state.fetching ? (
              <div> 
                fetching 
                {this.getWatched(isLoggedIn)}
              </div>
            ) : (
              this.state.movies.map(movie => {
                return <Movie movie_id={movie.id} remover={this.remover}/>
              })
            )}
          </div>
        )}
      </LoggedinContext.Consumer>
    )
  }
}

export default Main