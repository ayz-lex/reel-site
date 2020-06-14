import React from 'react'
import NavigationBar from './NavigationBar'
import {Link} from 'react-router-dom'

class Watched extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movieArray: [], found: false, keyword: props.keyword, fetching: true}
  }

  componentDidMount () {
    this.fetchSearch()
  }

  fetchSearch = async () => {
    let response = await fetch('http://localhost:8080/api/watched/', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
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
            {this.state.movieArray.map(movie => {
              return <MovieBox {...movie} />
            })} 
          </div>
        ) : (
        <div> not found</div>
        )
      )
    )
  }
}

const MovieBox = (props) => {
  const title = props.title
  const id = props.id
  return (
    <div>
      {title}
      <Link to={`/movie/${id}`} > link to {title} </Link>
    </div>
  )
}

export default Watched