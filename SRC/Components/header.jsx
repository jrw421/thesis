import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <div>Placeholder</div>
          <Link to="/">
            Dashboard
          </Link>
          <div>|</div>
          <Link to="/createEvent">
            Create Event
          </Link>
          <a href="/logout">Logout</a>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)