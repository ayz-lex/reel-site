import React, {useState, useEffect} from 'react'
import {
  GridList,
  GridListTile,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles'

function Watched() {

  const [movieArray, setMovieArray] = useState([])
  const [fetching, setFetching] = useState(true)

  const fetchSearch = async () => {
    if (fetching) {
      const response = await fetch('http://localhost:8080/api/getWatchedData', {
        method: 'GET',
        withCredentials: 'true',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      const data = await response.json()

      setMovieArray(data)
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchSearch().then()
  })

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 500,
      maxHeight: 600,
      borderColor: theme.palette.grey[800],
    },
    appBar: {
      marginBottom: 2,
      backgroundColor: theme.palette.grey[100],
      maxWidth: 500,
      boxShadow: 'none',
    },
    title: {
      color: theme.palette.grey[800],
      flexGrow: 1,
    },
    gridList: {
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 500,
      maxHeight: 500,
      backgroundColor: theme.palette.background.paper,
    },
    tile: {
      '&:hover img': {
        opacity: 0.3
      },
      '&:hover h1': {
        opacity: 1
      }
    },
    imgTitle: {
      transition: '.5s ease',
      opacity: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontSize: '16px',
      color: 'black',
      fontWeight: 'bold'
    },
    img: {
      opacity: 1,
      display: 'block',
      transition: '.5s ease',
      backfaceVisibility: 'hidden',
    }
  }));

  const classes = useStyles()

  return (
    fetching ? (
      <React.Fragment></React.Fragment>
    ) : (
        <div className={classes.root}>
          <AppBar position="static" color="primary" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Watched   |   {movieArray.length} Movies
              </Typography>
            </Toolbar>
          </AppBar>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {movieArray.map((tile) => (
              <GridListTile className={classes.tile} key={tile.img} cols={tile.cols || 1}>
                <img className={classes.img} src={tile.img} alt={tile.title} />
                <Typography variant='h1' className={classes.imgTitle}>{tile.title}</Typography>
              </GridListTile>
            ))}
          </GridList>
        </div>
    )
  )
}


export default Watched