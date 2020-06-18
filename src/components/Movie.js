import React from 'react'
import './Movie.css'

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {movie: {}, found: false, id: props.movie_id, remover: props.remover, fetching: true}
  }

  componentDidMount () {
    this.fetchMovie()
  }

  fetchMovie = async () => {
    let response = await fetch(`http://localhost:8080/api/movie/${this.state.id}`)
    if (response.status === 200) {
      let data = await response.json()
      this.setState({movie: data, found: true, fetching: false})
    } else {
      this.setState({fetching: false})
    }
  }

  watchedHandler = async e => {
    e.preventDefault()
    console.log('here')
    await fetch('http://localhost:8080/api/setWatched', {
      method: 'POST',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.movie.id
      })
    })
    this.state.remover(this.state.movie.id)
  }

  render() {
    return this.state.fetching ? (
      <div> fetching </div>
    ) : (
      this.state.found ? (
        <div> 
          <div id="movie">
            <h1 id="title">
              {this.state.movie.title}
            </h1>
            <button id="watched_button" onClick={this.watchedHandler}>Watched?</button>
          </div>
        </div>
      ) : (
      <div> not found</div>
      )
    )
  }
}

export default Movie