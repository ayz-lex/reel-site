import React from 'react'
import './Movie.css'
import NavigationBar from './NavigationBar'

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {movie: {}, found: false, id: props.id, fetching: true}
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

  render() {
    return this.state.fetching ? (
      <div> fetching </div>
    ) : (
      this.state.found ? (
        <div> 
          <NavigationBar />
          {this.state.movie.title} 
        </div>
      ) : (
      <div> not found</div>
      )
    )
  }
}

export default Movie