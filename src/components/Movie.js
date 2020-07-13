import React from 'react'
//import './Movie.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {movie: {}, found: false, id: props.movie_id, remover: props.remover, fetching: true}
  }

  componentDidMount () {
    this.fetchMovie()
  }

  fetchMovie = async () => {
    let response = await fetch(`http://localhost:8080/api/movie/${this.state.id}`)
    if (response.status === 200) {
      let data = await response.json()
      this.setState({movie: data, found: true, fetching: false})
    } else {
      this.setState({fetching: false})
    }
  }

  watchedHandler = async e => {
    e.preventDefault()
    await fetch('http://localhost:8080/api/setWatched', {
      method: 'POST',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.movie.id
      })
    })
    this.state.remover(this.state.movie.id)
  }

  render() {
    return this.state.fetching ? (
      <div> fetching </div>
    ) : (      
      this.state.found ? (
        <MovieCard />
        /*
        <div> 
          <div id="movie">
            <h1 id="title">
              {this.state.movie.title}
            </h1>
            <button id="watched_button" onClick={this.watchedHandler}>Watched?</button>
          </div>
        </div>
        */
      ) : (
      <div> not found</div>
      )
    )
  }
}

const MovieCard = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color = "textSecondary" gutterBottom>
          title
        </Typography>
        <Typography variant="h5" component="h2">
          movietitle
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          small text
        </Typography>
        <Typography variant="body2" component="p">
          description
          <br />
          post break
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Movie