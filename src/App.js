import React from 'react';
import './App.css';
import Movie from './components/Movie.js'
import NavigationBar from './components/NavigationBar.js'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <NavigationBar />
        <Movie />
      </div>
    )
  }
}


export default App;
