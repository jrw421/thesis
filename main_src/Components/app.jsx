import React from 'react';
import Header from './header.jsx';
import DashboardWithData from './dashboard.jsx';
import EventPage from './eventPage.jsx';
import CreateEventWithMutations from './createEvent.jsx';
import { Switch, Route, browserHistory } from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import { withApollo } from 'react-apollo';
import * as Colors from 'material-ui/styles/colors';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.lime900,
    primary1Color: Colors.white,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.teal800,
    alternateTextColor: Colors.redA200
  },
  appBar: {
    height: 60
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      contacts: []
    };
  }

  componentDidMount() {

    axios
      .get('/user')
      .then(data => {
        console.log('here is axios call data', data.data)
        this.setState({
          currentUser: data.data.user || null
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.currentUser === undefined ) {
      return null;
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {/* <Header /> */}
            {/* <div> */}
            <Header />
            <div>
              <Switch>
                <Route
                  path="/dashboard/:id"
                  render={() => (
                    <DashboardWithData
                      history={browserHistory}
                      currentUser={this.state.currentUser}
                    />
                  )}
                />
                <Route
                  path="/eventPage/:id"
                  render={({ match }) => (
                    <EventPage
                      currentUser={this.state.currentUser}
                      currentGuest={match}
                    />
                  )}
                />
                <Route
                  path="/createEvent"
                  render={() => (
                    <CreateEventWithMutations
                      currentUser={this.state.currentUser}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

export default withApollo(App);
