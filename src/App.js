import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Search from './components/Search.js'
import NavigationBar from './components/NavigationBar.js'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    const Holder = () => {
      return <div> hello </div>
    }

    const apiHelper = async (id, type) => {
      let response = await fetch(`http://localhost:8080/api/${type}/${id}`)
      let movie
      if (response.status === 200) {
        let data = await response.json()
        data = {data: data, found: true}
        movie = data
      } else {
        alert('Not found')
        movie = {found: false}
      }
      this.setState({movie: movie})
    }

    const MovieComp = () => {
      let {movie_id} = useParams()
      apiHelper(movie_id, 'movie')
      return <Movie {...this.state.movie} />
    }

    const SearchComp = () => {
      let {keyword} = useParams()
      apiHelper(keyword, 'search')
      return <Search {...this.state.movie} />
    }
    
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/movie/:movie_id">
            <MovieComp />
          </Route>
          <Route path="/search/:keyword">
            <SearchComp />
          </Route>
          <Route path="/">
            <Holder />
          </Route>
        </Switch>
      </Router>
    )
  }
}


export default App;
