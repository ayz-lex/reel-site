import React from 'react'
import './Movie.css'

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {movie: props, found: props.found}
  }

  render() {
    return (
      <div> {this.state.movie.title} </div>
    )
  }
}

export default Movie