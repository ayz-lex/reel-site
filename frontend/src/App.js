import React, {useState} from 'react';

/** website logo */
import logo from './logo.jpg'

/** custom components */
import Watched from './components/Watched.js'
import Main from './components/Main.js'
import NavigationBar from './components/NavigationBar.js'

/** authentication context, acts as global state */
import {LoggedinContext} from './contexts/LoggedinContext'

/** MUI components */
import {
  TextField,
  Box,
  Button,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {makeStyles} from '@material-ui/core/styles'

/** react-router components */
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom'

require('dotenv').config({path: '../.env'})

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
      toggleLoggedOut: this.toggleLoggedOut,
      fetching: true,
    }
  }

  checkSession = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND}:8080/api/checkLogin`, {
      method: 'GET',
      withCredentials: 'true',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          isLoggedIn: true,
          fetching: false,
        })
      } else {
        const error = new Error(res.error)
        throw error
      }
    }).catch(err => {
      console.error(err)
      this.setState({
        isLoggedIn: false,
        fetching: false,
      })
    })
  }

  componentDidMount() {
    this.checkSession()
  }

  render() {
    return (
      this.state.fetching ? (
        <React.Fragment></React.Fragment>
      ) : (
        <React.Fragment>
          <Box display="flex" flexDirection="row" justifyContent="Center">
            <img 
              src={logo} 
              alt="Logo" 
              width="10%"
              height="auto"
            />
          </Box>
          <LoggedinContext.Provider value={this.state}>
            <Router>
              <NavigationBar />
                <Switch>
                  <Route path="/profile">
                    {this.state.isLoggedIn ? <Watched /> : <Main />}
                  </Route>
                  <Route path="/login">
                    {this.state.isLoggedIn ? <Redirect to="/" /> : <LoginComp toggleLoggedIn={this.state.toggleLoggedIn}/>}
                  </Route> 
                  <Route path="/signup">
                    {this.state.isLoggedIn ? <Redirect to="/" /> : <SignupComp toggleLoggedIn={this.state.toggleLoggedIn}/>}
                  </Route>
                  <Route exact path="/" component={Main}/>
                  <Route path="/" component={Comp404} />
                </Switch>
            </Router>
          </LoggedinContext.Provider>
        </React.Fragment>
      )
    )
  }
}

const LoginComp = (props) => {
  const toggleLoggedIn = props.toggleLoggedIn

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState(false)
  const [errorStatement, setErrorStatement] = useState('')

  const usernameChangeHandler = e => {
    setUsername(e.target.value)
  }
  const passwordChangeHandler = e => {
    setPassword(e.target.value)
  }

  const loginSubmitHandler = e => {
    e.preventDefault()
    fetch(`http://${process.env.REACT_APP_BACKEND}:8080/api/login`, {
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
        toggleLoggedIn()
      } else {
        return res.json()
      }
    }).then(jsonObj => {
      const error = new Error(jsonObj.error)
      throw error
    }).catch(err => {
      setError(true)
      setErrorStatement(err.message)
      console.error(err)
    })
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
    },
  }))

  const classes = useStyles()

  return (  
    <React.Fragment>
      <Box className={classes.root}>
        {error ? (
          <Alert 
            onClose={() => {setError(false)}}
            variant="outlined" 
            severity="error"
          >
            {errorStatement}
          </Alert>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <form className={classes.form}>
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
              type = 'password' 
              name = 'password'
              variant='outlined'
              label='Enter Password'
              onChange = {passwordChangeHandler}
              required
            />
          </div>
        </form>
      </Box>
      <Box className={classes.root}>
        <Button className={classes.button} variant="contained" onClick={loginSubmitHandler}>Login</Button>
      </Box>
    </React.Fragment>
  )
}

const SignupComp = (props) => {
  const toggleLoggedIn = props.toggleLoggedIn

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const usernameChangeHandler = e => {
    setUsername(e.target.value)
  }
  const passwordChangeHandler = e => {
    setPassword(e.target.value)
  }

  const registerSubmitHandler = e => {
    e.preventDefault()

    if (username.length >= 255) {
      setError(true)
      setErrorMessage('Username is too long')
    } else {
      fetch(`http://${process.env.REACT_APP_BACKEND}:8080/api/register`, {
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
          toggleLoggedIn()
        } else {
          return res.json()
        }
      }).then(jsonObj => {
        const error = new Error(jsonObj.error)
        throw error
      }).catch(err => {
        console.error(err)
        setError(true)
        setErrorMessage(err.message)
      })
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
    },
  }))

  const classes = useStyles()

  return (
    <React.Fragment>
      <Box className={classes.root}>
        {error ? (
          <Alert 
            onClose={() => {setError(false)}}
            variant="outlined" 
            severity="error"
          >
            {errorMessage}
          </Alert>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <form className={classes.form} >
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
              type='password' 
              name='password_register'
              label="Enter Password"
              variant="outlined"
              onChange={passwordChangeHandler}
              required
            />
          </div>
        </form>
      </Box>
      <Box className={classes.root}>
        <Button className={classes.button} variant="contained" onClick={registerSubmitHandler}>Register</Button>
      </Box>
    </React.Fragment>
  )
}

const Comp404 = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold',
    }
  }))

  const classes = useStyles()

  return (
    <Typography className={classes.root} variant='h7'>
      404 Page Not Found
    </Typography>
  )
}

export default App;
