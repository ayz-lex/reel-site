import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Watched from './components/Watched.js'
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

    const Profile = () => {
      return (
        <div>
          <Watched />
        </div>
      )     
    }
    
    return (
      <div>
        <Router>
          <div>
            <NavigationBar />
            <Switch>
              <Route path="/movie/:movie_id" component={MovieComp}/>
              <Route path="/profile" component={Profile} />
              <Route exact path="/" component={Holder}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}


export default App;
