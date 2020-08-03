import React, {useState} from 'react'
import {
  GridList,
  GridListTile
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles'



function Watched() {

  const [movieArray, setMovieArray] = useState([])
  const [fetching, setFetching] = useState(true)

  const fetchSearch = async () => {
    const response = await fetch('http://localhost:8080/api/watched', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    const data = await response.json()

    const movieList = await Promise.all(data.map(async movie => {
      const response = await fetch(`http://localhost:8080/api/movie/${movie}`)

      const movieData = await response.json()

      return {
        img: `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`,
        title: movieData.title
      }
    }))

    setMovieArray(movieList)
    setFetching(false)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));

  const classes = useStyles()
    
  return (
    fetching ? (
      <React.Fragment>{fetchSearch()}</React.Fragment>
    ) : (
      <div>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {movieArray.map((tile) => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  )
}


export default Watched