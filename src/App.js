import React, {useState} from 'react';
import './App.css';
import Movie from './components/Movie.js'
import Watched from './components/Watched.js'
import Main from './components/Main.js'
import TextField from '@material-ui/core/TextField'
import NavigationBar from './components/NavigationBar.js'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'
import {LoggedinContext} from './contexts/LoggedinContext'
import {makeStyles} from '@material-ui/core/styles'

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

    const MainComp = () => {
      return <div>
        <Main />
      </div>
    }

    const MovieComp = () => {
      let {movie_id} = useParams()
      return (
        <div>
          <Movie movie_id={movie_id} />
        </div>
      )
    }

    const ProfileComp = () => {
      return (
        <div>
          <Watched />
        </div>
      )     
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }))

    const LoginComp = () => {
      const toggleLoggedIn = this.toggleLoggedIn
      const toggleLoggedOut = this.toggleLoggedOut
    
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
    
      const usernameChangeHandler = e => {
        setUsername(e.target.value)
      }
      const passwordChangeHandler = e => {
        setPassword(e.target.value)
      }
    
      const loginSubmitHandler = async e => {
        e.preventDefault()
    
        await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          withCredentials: 'true',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            username: username, 
            password: password
          })
        }).then(res => {
          if (res.status === 200) {
            alert('Login Succeeded')
            toggleLoggedIn()
          } else {
            const error = new Error(res.error)
            throw error
          }
        }).catch(err => {
          console.error(err)
          alert('Error logging in')
          toggleLoggedOut()
        })
      }

      const classes = useStyles()
    
      return (  
        <div>
          <form className={classes.root} onSubmit = {loginSubmitHandler}>
            <div>
              <TextField
                type = 'text' 
                name = 'username' 
                variant='outlined'
                label='Enter Username'
                onChange = {usernameChangeHandler}
                required
              />
            </div>
            <div>
              <TextField 
                type = 'text' 
                name = 'password'
                variant='outlined'
                label='Enter Password'
                onChange = {passwordChangeHandler}
                required
              />
            </div>
            <button>Login</button>
          </form>
        </div>
      )
    }

    const SignupComp = () => {
      const toggleLoggedIn = this.toggleLoggedIn
      const toggleLoggedOut = this.toggleLoggedOut

      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const usernameChangeHandler = e => {
        setUsername(e.target.value)
      }
      const passwordChangeHandler = e => {
        setPassword(e.target.value)
      }

      const registerSubmitHandler = async e => {
        e.preventDefault()
        await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          withCredentials: 'true',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            username: username, 
            password: password
          })
        }).then(res => {
          if (res.status === 200) {
            alert('Register Succeeded')
            toggleLoggedIn()
          } else {
            const error = new Error(res.error)
            throw error
          }
        }).catch(err => {
          alert('Register Failed')
          toggleLoggedOut()
        })
      }

      const classes = useStyles()

      return (
        <div>
          <form className={classes.root} onSubmit = {registerSubmitHandler}>
            <div>
              <TextField
                type='text'
                name="username_register"
                label="Enter Username"
                variant="outlined"
                onChange={usernameChangeHandler}
                required
              />
            </div>
            <div>
              <TextField 
                type='text' 
                name='password_register'
                label="Enter Password"
                variant="outlined"
                onChange={passwordChangeHandler}
                required
              />
            </div>
            <button>Register</button>
          </form>
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
                <Route path="/profile" component={ProfileComp} />
                <Route path="/login" component={LoginComp} />
                <Route path="/signup" component={SignupComp} />
                <Route exact path="/" component={MainComp}/>
              </Switch>
            </div>
          </Router>
        </LoggedinContext.Provider>
      </div>
    )
  }
}


export default App;
