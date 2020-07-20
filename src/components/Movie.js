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
      <div> Fetching </div>
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

  const addToWatched = async e => {
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
        id: props.movie.id,
      })
    }).then(res => {
      if (res.status !== 200) {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
    })
    props.remover(props.movie.id)
  }

  const skipMovie = e => {
    e.preventDefault()
    props.remover(props.movie.id)
  }

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={props.movie.title}
        subheader={`${getGenre()} – ${Math.floor(props.movie.runtime / 60)}:${props.movie.runtime % 60}`}
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
                  onClick={addToWatched}
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
        <Tooltip title="Skip">
          <IconButton 
            aria-label="skip"
            onClick={skipMovie}
          >
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default Movie