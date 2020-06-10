import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: props.data, found: props.found}
  }

  render = () => {
    return (
    <div>{this.state.data[0].title}</div>
    )
  }
  
}
export default Search