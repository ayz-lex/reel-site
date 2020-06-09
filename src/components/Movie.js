import React from 'react'
import './Movie.css'
import {Dropdown, DropdownButton} from 'react-bootstrap'

class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {movies: [
      {
        name: 'name',
        popularity: 'popularity',
        genre: 'genre',
        year: 'year',
        description: 'description'
      }, 
      {
        name: 'name2',
        popularity: 'popularity2',
        genre: 'genre2',
        year: 'year2',
        description: 'description2'
      },
      {
        name: 'name3',
        popularity: 'popularity3',
        genre: 'genre3',
        year: 'year3',
        description: 'description3'
      }
    ]}
  }

  async getStream() {
    

  }

  render() {
    return (
      <div id="movieSection">
        <h1>Movies</h1>
        {this.state.movies.map(movie => (
          <React.Fragment>
            <Individual {...movie} />
          </React.Fragment>
        ))}
      </div>
    )
  }
}

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

export default Movie