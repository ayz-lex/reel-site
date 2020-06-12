import React from 'react'
import NavigationBar from './NavigationBar'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movieArray: [], found: false, keyword: props.keyword, fetching: true}
  }

  componentDidMount () {
    this.fetchSearch()
  }

  fetchSearch = async () => {
    let response = await fetch(`http://localhost:8080/api/search/${this.state.keyword}`)
    if (response.status === 200) {
      let data = await response.json()
      this.setState({movieArray: data, found: true, fetching: false})
    } else {
      this.setState({fetching: false})
    }
  }

  render = () => {
    return (
      this.state.fetching ? (
        <div> 
          fetching 
        </div>
      ) : (
        this.state.found ? (
          <div> 
            <NavigationBar />       
            {this.state.movieArray[0].title}
          </div>
        ) : (
        <div> not found</div>
        )
      )
    )
  }
}
export default Search