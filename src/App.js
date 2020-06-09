import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Search from './components/Search.js'
import NavigationBar from './components/NavigationBar.js'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'


class App extends React.Component{
  constructor(props) {
    super(props)
  }
  
  render() {
    const Holder = () => {
      return <div> hello </div>
    }

    const MovieComp = () => {
      let {movie_name} = useParams()
      return <Movie name={movie_name} />
    }

    const ResultList = () => {
      let {keyword} = useParams()
      return <Search keyword={keyword} />
    }
    
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/movie/:movie_name">
            <MovieComp />
          </Route>
          <Route path="/search/:keyword">
            <ResultList />
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
