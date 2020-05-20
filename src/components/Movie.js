import React from 'react'

class Movie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "movie name",
      popularity: 0,
      genre: "",
      year: 2000
    }
    //use this.setState in order to change a certain component of state
    //
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.name}
        </h1>
        <p>
          popularity
          {this.state.popularity}
        </p>
      </div>
    )
  }
}

export default Movie