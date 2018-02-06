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

class Header2 extends Component {
  render() {
    console.log('href', window.location.href.substring(31))
    const href = "/dashboard" + window.location.href.substring(31)

    return (
      <div>
        <AppBar title="Host.ly">
          <Tabs onChange={this.changeTab}>
            <Tab
            value={0}
            label="Dashboard"
            containerElement={<Link to={href}/>}
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
              label="Join Us"
              containerElement={<a href="/"/>}
              style={tabStyle}
            />
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(Header2)
