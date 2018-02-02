import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick = (e) => {
    console.log('item clicked', e.target.textContent);
    // mutation to toggle that item that was clicked.
    // render onclick a div that says <name> claimed item!
  }

  render() {
    console.log('Item props', this.props);
    return (
      <li onClick={(e) => this.handleItemClick(e)}>{this.props.name}</li>
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
