import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

const tabStyle = {
  paddingLeft: '12.5px',
  paddingRight: '12.5px',
  marginTop: '5px',
  textAlign: 'center'
}

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar title="Host.ly">
          <Tabs onChange={this.changeTab}>
            <Tab 
            value={0} 
            label="Dashboard"
            containerElement={<Link to="/dashboard/0" />}
            style={tabStyle}
            />
            <Tab 
            value={1}
            label="Create Event"
            containerElement={<Link to="/createEvent" />}
            style={tabStyle}
            />
            <Tab
              value={2} 
              label="Logout"
              containerElement={<a href="/auth/logout"/>}
              style={tabStyle}
            />
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(Header)
