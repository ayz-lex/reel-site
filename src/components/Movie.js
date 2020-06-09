import React from 'react'
import './Movie.css'

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {name: props.name}
  }

  componentDidMount = async () => {
    let url = `http://localhost:8080/api/movie/${this.state.name}`
    let response = await fetch(url)
    let data = await response.json()
    this.setState({
      title: data.title,
      vote_average: data.vote_average, 
      vote_count: data.vote_count, 
      poster_path: data.poster_path,
      overview: data.overview,
      release_date: data.release_date,
      original_language: data.original_language
    })
  }

  render() {
    return (
      <div>
        {this.state.title}
      </div>
    )
  }
}
/*
function Individual(props) {
  return (
    <div id="movie">
      <div id="watched_button">
        <DropdownButton
          drop='right'  
          title='Watched'          
        >
          <Dropdown.Item>Rate the Movie</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item button="5">5</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item button="4">4</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item button="3">3</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item button="2">2</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item button="1">1</Dropdown.Item>
        </DropdownButton>
      </div>
      <div id="title">
        {props.name}
      </div>
      <div className="movie_attributes">
        {props.popularity}
      </div>
      <div className="movie_attributes">
        {props.genre}
      </div>
      <div className="movie_attributes">
        {props.year}
      </div>
      <p>
        {props.description}
      </p>
    </div>
  )
}
*/
export default Movie