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
import {LoggedinContext} from '../contexts/LoggedinContext.js'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    backgroundColor: '#f9f9f9',
  },
  media: {
    maxWidth: 400,
    height: 'auto',
    paddingBottom: '56.25%',
    filter: 'grayscale(40%)'
  },
  pos: {
    marginBottom: 12,
  },
})

class Movie extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {
      movie: {}, 
      found: false, 
      id: props.movie_id, 
      remover: props.remover, 
      fetching: true
    }
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

  render() {
    return this.state.fetching ? (
      <React.Fragment></React.Fragment>
    ) : (      
      this.state.found ? (
        <MovieCard {...{
          movie: this.state.movie, 
          remover: this.state.remover
        }}/>
      ) : (
      <Typography> Movie Not Found </Typography>
      )
    )
  }
}

const MovieCard = (props) => {

  const classes = useStyles()

  const getGenre = () => {
    return props.movie.genres.reduce((acc, cur) => {
      if (acc === "") {
        return cur.name
      } else {
        return `${acc} | ${cur.name} `
      }
    }, "")
  }

  const skipMovie = e => {
    e.preventDefault()
    props.remover(props.movie.id)
  }

  const remove = e => {
    e.preventDefault()
    props.remover(props.movie.id)
  }

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={props.movie.title}
        subheader={`${getGenre()} – ${Math.floor(props.movie.runtime / 60)}h ${props.movie.runtime % 60}min`}
      />
      <CardMedia 
        image={`https://image.tmdb.org/t/p/w400/${props.movie.poster_path}`}
        title='image'
        className={classes.media}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LoggedinContext.Consumer>
          {({isLoggedIn}) => (
            isLoggedIn ? (
              <Tooltip title="Add to Watched">
                <IconButton 
                  aria-label="watched"
                  onClick={remove}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login for Functionality">
                <IconButton 
                  aria-label="watched"
                  onClick={skipMovie}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
            )
          )}
        </LoggedinContext.Consumer>
      </CardActions>
    </Card>
  )
}

export default Movie