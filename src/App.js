import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Watched from './components/Watched.js'
import NavigationBar from './components/NavigationBar.js'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'
import {LoggedinContext} from './contexts/LoggedinContext'

class App extends React.Component{
  constructor(props) {
    super(props)

    this.toggleLoggedIn = () => {
      this.setState({isLoggedIn: true})
    }    

    this.toggleLoggedOut = () => {
      this.setState({isLoggedIn: false})
    }

    this.state = {
      isLoggedIn: false,
      toggleLoggedIn: this.toggleLoggedIn,
      toggleLoggedOut: this.toggleLoggedOut
    }
  }

  checkSession = async () => {
    await fetch('http://localhost:8080/api/checkLogin', {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({isLoggedIn: true})
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
      this.setState({isLoggedIn: false})
    })
  }

  componentDidMount() {
    this.checkSession()
  }

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
        <LoggedinContext.Provider value={this.state}>
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
        </LoggedinContext.Provider>
      </div>
    )
  }
}


export default App;
