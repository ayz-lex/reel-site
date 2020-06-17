import React from 'react'
import {LoggedinContext} from './contexts/LoggedinContext'
import Movie from './Movie'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movies: [], fetching: true}
  }

  async fetchMovies(watched) {
    //do error checking later

    let response = await fetch('http://localhost:8080/api/recommendations')
    let data = await response.json()
    this.setState({movies: data, fetching: false})
  }

  fetchUnwatched() {
    
  }

  render() {
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn, toggleLoggedIn, toggleLoggedOut}) => {
          {isLoggedIn ? (
            this.fetchunWatched([])
          ) : (
            this.fetchMovies()
            this.state.fetching ? (
              <div> fetching </div>
            ) : (
              this.state.movies.map(movie => {

              })
            )
          )}
        }}
      </LoggedinContext.Consumer>
    )
  }
}

