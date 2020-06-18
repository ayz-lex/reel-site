import React from 'react'
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Movie from './Movie'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movies: [], numMovies: 0, fetching: true, watched: [], page: 1}
  }

  async fetchMovies() {
    //do error checking later
    let numberOfAddedMovies = 0
    let addedMovies = []
    let curPage = this.state.page
    while (this.state.movies + numberOfAddedMovies < 10) {
      let response = await fetch(`http://localhost:8080/api/recommendations/${curPage}`)
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
      addedMovies = addedMovies.concat(movies)
      curPage++
    }
    this.setState({
      numMovies: this.state.numMovies + numberOfAddedMovies, 
      movies: this.state.movies.concat(addedMovies), 
      page: curPage, 
      fetching: false
    })
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
    this.setState({watched: data})
  }

  getMovies(isLoggedIn) {
    if (isLoggedIn) {
      this.fetchWatched()
    }
    this.fetchMovies()
  }

  remover = (id) => {
    let newMovies = this.state.movies.filter(movie => {
      return movie.id !== id
    })
    this.setState({movies: newMovies, numMovies: this.state.numMovies - 1})
  }

  render() {

    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn}) => (
          <div>
            {this.state.fetching ? (
              <div> 
                fetching 
                {this.getMovies(isLoggedIn)}
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