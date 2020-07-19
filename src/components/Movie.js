import React from 'react'
//import './Movie.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
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
      <div> Fetching </div>
    ) : (      
      this.state.found ? (
        <MovieCard {...this.state.movie}/>
      ) : (
      <Typography> Movie Not Found </Typography>
      )
    )
  }
}

const MovieCard = (props) => {
  const classes = useStyles()

  const getGenre = () => {
    return props.genres.reduce((acc, cur) => {
      if (acc === "") {
        return cur.name
      } else {
        return `${acc} | ${cur.name} `
      }
    }, "")
  }

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={props.title}
        subheader={`${getGenre()} – ${props.runtime} minutes`}
      />
      <CardMedia 
        image={`https://image.tmdb.org/t/p/w400/${props.poster_path}`}
        title='image'
        className={classes.media}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="watched">
          <DoneIcon />
        </IconButton>
        <IconButton aria-label="skip">
          <NavigateNextIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Movie