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
import '../Styles/styles.scss';


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
      userLocation: []
    };
  }

  componentDidMount() {

    axios
      .get('/user')
      .then(data => {
        this.setState({
          currentUser: data.data.user,
        });
      })
      .catch((error) => {
        return ['componentwillmount', error];
      });
  }

  render() {

    if (this.state.currentUser === undefined ) {
      return null;
    }
    console.log('here is your statttteeee in app ', this.state)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
          <Header />
            <Switch>
              <Route
                path="/dashboard"
                render={() => (
                  <DashboardWithData
                    history={browserHistory}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              <Route
                path="/eventPage"
                render={() => (
                  <EventPageWithData
                    location={this.state.userLocation}
                    currentUser={this.state.currentUser}
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
