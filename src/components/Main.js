import React from 'react'
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Movie from './Movie'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'


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
      fetching: true, 
      watched: [], 
      page: 1, 
      curMovie: [],
    }
  }

  componentDidUpdate = () => {
    this.fetchMovies()
  }

  fetchMovies = async () => {
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

      const newMovies = this.state.movies.concat(movies)

      this.setState({
        movies: newMovies, 
        numMovies: this.state.numMovies + numberOfAddedMovies, 
        page: this.state.page + 1, 
        fetching: false,
        curMovie: [newMovies[0]]
      })
    }
  }

  fetchWatched = async () => {
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
    this.setState({fetching: false, watched: data})
  }

  getWatched = (isLoggedIn) => {
    if (isLoggedIn) {
      this.fetchWatched()
    } else {
      this.setState({fetching: false})
    }
  }

  remover = (id) => {
    let newMovies = this.state.movies.filter(movie => {
      return movie.id !== id
    })
    this.setState({
      movies: newMovies, 
      numMovies: --this.state.numMovies,
      curMovie: [newMovies[0]],
    })
  }

  render = () => {
    const {classes} = this.props
    return (
      <LoggedinContext.Consumer>
        {({isLoggedIn}) => (
          <Container className={classes.root}>
            {this.state.fetching ? (
              <div> 
                fetching 
                {this.getWatched(isLoggedIn)}
              </div>
            ) : (
              this.state.curMovie.map(movie => {
                return <Movie movie_id={movie.id} />
              })
            )}
          </Container>
        )}
      </LoggedinContext.Consumer>
    )
  }
}

export default withStyles(styles)(Main)