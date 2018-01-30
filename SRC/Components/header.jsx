import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          // className="bar"
          title="Host.ly"
        />
          <Link to="/">
            Dashboard
          </Link>
          <div></div>
          <Link to="/createEvent">
            Create Event
          </Link>
      </div>
    )
  }
}

export default withRouter(Header)
