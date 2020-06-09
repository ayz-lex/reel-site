import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movie: {}}
    this.initializer(props.keyword)
  }

  initializer = async (keyword) => {
    let url = `http://localhost:8080/api/movie/${keyword}`
    let response = await fetch(url)
    let data = await response.json()
    this.setState({movie: data})
  }

  render = () => {
    return (
      <div>hello</div>
    )
  }
  
}
export default Search