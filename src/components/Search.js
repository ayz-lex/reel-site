import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movie: {}, found: false}
    this.initializer(props.keyword)
  }

  initializer = async (keyword) => {
    let response = await fetch(`http://localhost:8080/api/search/${keyword}`)
    if (response.status === 200) {
      let data = await response.json()
      this.setState({movie: data, found: true})
    }
  }

  render = () => {
    return found ? (
      <div>hello</div>
    ) :
    (
      <div>not found</div>
    )
  }
  
}
export default Search