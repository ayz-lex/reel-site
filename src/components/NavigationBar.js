import React from 'react'
import axios from 'axios'
import {Navbar, NavDropdown, Nav, Form, FormControl, Button} from 'react-bootstrap'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.checkSession()
  }

  checkSession = async () => {
    let response = await axios.get('http://localhost:8080/api/checkLogin')
    this.setState({loggedIn: response.data === 'OK'})
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  registerSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/register', {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      occupation: this.state.occupation,
      movie1: this.state.movie1,
      movie2: this.state.movie2,
      movie3: this.state.movie3
    }, 'register failed')
  }

  loginSubmitHandler = async e => {
    await this.submitHandler(e, 'http://localhost:8080/api/login', {
      username: this.state.username, 
      password: this.state.password
    }, 'login failed')
  }

  submitHandler = async (e, route, data, errorMessage) => {
    e.preventDefault()
    console.log(this.state)
    let response = await axios.post(route, data)
    this.setState({loggedIn: response.data === 'OK'})
    alert(response.data === 'OK' ? 'success' : errorMessage)
  }

  logoutHandler = async e => {
    this.setState({loggedIn: false})
    await axios.get('http://localhost:8080/api/logout')
  }

  login = () => {
    return (
      <div>
        <form onSubmit = {this.loginSubmitHandler}>
          <div>
            <input
              type = 'text' 
              name = 'username' 
              onChange = {this.changeHandler}
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'password'
              onChange = {this.changeHandler}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    )
  }

  logout = () => {
    return (
      <div>
        <button onClick = {this.logoutHandler}>Logout</button>
      </div>
    )
  }

  register = () => {
    return (
      <div>
        <form onSubmit = {this.registerSubmitHandler}>
          <div>
            <input
              type = 'text' 
              name = 'username' 
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'password'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'number' 
              name = 'age'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'occupation'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie1'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie2'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <div>
            <input 
              type = 'text' 
              name = 'movie3'
              onChange = {this.changeHandler}
              required
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    )
  }

  render() {
    let tabs
    if (this.state.loggedIn) {
      tabs = (
        <Navbar className="navigation_bar">
          <Nav.Link onClick={this.logout()}>logout</Nav.Link>
        </Navbar>
      )
    } else {
      tabs = (
        <Navbar className="navigation_bar" bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      )
    }
    
    return (
      <Navbar>
        <Navbar.Brand>Hello</Navbar.Brand>
        <Navbar.Toggle aria-controls="response-navbar-nav" />
        <Navbar.Collapse>
          {tabs}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavigationBar