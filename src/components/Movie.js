import React from 'react'
import './Movie.css'
import {Dropdown, DropdownButton} from 'react-bootstrap'

class Movie extends React.Component {
  render() {
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
          {this.props.name}
        </div>
        <div className="movie_attributes">
          {this.props.popularity}
        </div>
        <div className="movie_attributes">
          {this.props.genre}
        </div>
        <div className="movie_attributes">
          {this.props.year}
        </div>
        <p>
          {this.props.description}
        </p>
      </div>
    )
  }
}

export default Movie