import React from 'react'

class Movie extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.popularity}
        {this.props.genre}
        {this.props.year}
        {this.props.description}
      </div>
    )
  }
}

export default Movie