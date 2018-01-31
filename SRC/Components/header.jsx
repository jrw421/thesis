import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Host.ly"
        />
          <Link to="/dashboard">
            Dashboard
          </Link>
          <div></div>
          <Link to="/createEvent">
            Create Event
          </Link>
          <a href="/auth/logout">Logout</a>
      </div>
    )
  }
}

export default withRouter(Header)
