import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = (e) => {
    console.log('item clicked', e.target.textContent);
    if (this.state.clicked === false) {
      this.setState({
        clicked: true
      })
    } else {
      this.setState({
        clicked: false
      })
    }
    // mutation to toggle that item that was clicked.
    // render onclick a div that says <name> claimed item!
  }

  render() {
    console.log('Item props', this.props);
    const isClicked = this.state.clicked
    return (
      <div style={{"textAlign": "center"}}>
      {isClicked ? (
        <a onClick={(e) => this.handleItemClick(e)}>{this.props.name} was claimed by {this.props.currentUser.name}</a>
      ) : (

        <a onClick={(e) => this.handleItemClick(e)}>{this.props.name}</a>
      )}
    </div>
    )
  }

}

// class Item extends React.Component {
//   constructor(props) {
//     super(props)
//   }


//   render() {
//     return (
//       <li onClick={this.props.handleClick()}>
//     )
//   }
// }


export default Item
