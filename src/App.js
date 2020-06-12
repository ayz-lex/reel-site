import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Search from './components/Search.js'
import NavigationBar from './components/NavigationBar.js'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'


class App extends React.Component{
  render() {
    const Holder = () => {
      return <div>hel</div>
    }

    const MovieComp = () => {
      let {movie_id} = useParams()
      return (
        <div>
          <Movie movie_id={movie_id} />
        </div>
      )
    }

    const SearchComp = () => {
      let {keyword} = useParams()
      return (
        <div>
          <Search keyword={keyword} />
        </div>
      )     
    }
    
    return (
      <Router>
        <Switch>
          <Route path="/movie/:movie_id" component={MovieComp}/>
          <Route path="/search/:keyword" component={SearchComp}/>
          <Route path="/" component={Holder}/>
        </Switch>
      </Router>
    )
  }
}


export default App;
