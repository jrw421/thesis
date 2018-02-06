import React from 'react';
import { Switch, Route, browserHistory } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import { withApollo } from 'react-apollo';
import * as Colors from 'material-ui/styles/colors';

import Header from './header';
import DashboardWithData from './dashboard';
import EventPageWithData from './eventPage';
import CreateEventWithMutations from './createEvent';


const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.lime900,
    primary1Color: Colors.white,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.teal800,
    alternateTextColor: Colors.redA200,
  },
  appBar: {
    height: 60,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  componentWillMount() {
    axios
      .get('/user')
      .then((data) => {
        this.setState({
          currentUser: data.data.user || null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.currentUser === undefined) {
      return null;
    }
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
                render={({ match }) => (
                  <DashboardWithData
                    history={browserHistory}
                    currentUser={this.state.currentUser}
                    currentGuest={match}
                  />
                )}
              />
              <Route
                path="/eventPage/:id"
                render={({ match }) => (
                  <EventPageWithData
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


export default withApollo(App);
