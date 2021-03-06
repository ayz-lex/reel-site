import React from 'react'
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Movie from './Movie'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'

require('dotenv').config({path: '../../.env'})

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [], 
      numMovies: 0, 
      Initialfetching: true, 
      fetching: false,
      watched: [], 
      page: 1, 
      curMovie: 0,
    }
  }

  fetchMovies = async (oldMovies, watched) => {
    let newMovies = oldMovies
    let numMovies = oldMovies.length
    let page = this.state.page

    while (numMovies < 10) {
      const response = await fetch(`https://thereel.xyz/api/recommendations/${page}`, {
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      const movies = data.filter(movie => {
        if (watched.find(watchedMovie => {
          return watchedMovie === movie
        }) === undefined) {
          numMovies += 1
          return true
        }
        return false
      })

      newMovies = newMovies.concat(movies)
      page += 1
    }

    return {
      movies: newMovies,
      numMovies: numMovies,
      page: page
    }
  }

  loggedInFetch = async () => {
    const response = await fetch('https://thereel.xyz/api/watched', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const data = await response.json()

    const fetched = await this.fetchMovies(this.state.movies, data)

    this.setState({
      watched: data,
      movies: fetched.movies,
      numMovies: fetched.numMovies,
      page: fetched.page,
      Initialfetching: false,
      curMovie: fetched.movies[0]
    })
  }

  loggedOutFetch = async () => {
    const fetched = await this.fetchMovies(this.state.movies, [])
    this.setState({
      movies: fetched.movies,
      numMovies: fetched.numMovies,
      page: fetched.page,
      fetching: false,
      curMovie: fetched.movies[0],
      Initialfetching: false,
    })
  }

  getWatched = (isLoggedIn) => {
    if (isLoggedIn) {
      this.loggedInFetch()
    } else {
      this.loggedOutFetch()
    }
  }

  addToWatched = async id => {
    await fetch('https://thereel.xyz/api/setWatched', {
      method: 'POST',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: id,
      })
    }).then(res => {
      if (res.status !== 200) {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
    })
  }

  remover = (id) => {

    this.addToWatched(id)

    const watched = this.state.watched.concat([id])

    const newMovies = this.state.movies.filter(movie => {
      return movie !== id
    })

    const data = this.fetchMovies(newMovies, watched)

    data.then(result => {
      this.setState({
        watched: watched,
        movies: result.movies, 
        numMovies: result.numMovies,
        page: result.page,
        curMovie: result.movies[0],
        fetching: true,
      })
    })
  }

  removerLogout = (id) => {
    const newMovies = this.state.movies.filter(movie => {
      return movie !== id
    })

    const data = this.fetchMovies(newMovies, [])

    data.then(result => {
      this.setState({
        movies: result.movies, 
        numMovies: result.numMovies,
        page: result.page,
        curMovie: result.movies[0],
        fetching: true,
      })
    })

  }

  refetch = () => {
    this.setState({fetching: false})
  }

  render = () => {
    const {classes} = this.props
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn}) => (
          <Container className={classes.root}>
            {this.state.Initialfetching ? (
              this.getWatched(isLoggedIn)
            ) : (
              this.state.fetching ? (
                this.refetch()
              ) : (
                isLoggedIn ? (
                  <Movie 
                    movie_id={this.state.curMovie}
                    remover={this.remover}
                  />
                ) : (
                  <Movie
                    movie_id={this.state.curMovie}
                    remover={this.removerLogout}
                  />
                )
              )
            )}
          </Container>
        )}
      </LoggedinContext.Consumer>
    )
  }
}

export default withStyles(styles)(Main)