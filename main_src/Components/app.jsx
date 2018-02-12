import React from 'react';
import { Switch, Route, browserHistory } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import { withApollo } from 'react-apollo';
import * as Colors from 'material-ui/styles/colors';
import babelPolyfill from 'babel-polyfill';

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
      refresh: true,
      contacts: [],
      emails: []
    };

    this.refreshDash = this.refreshDash.bind(this)
  }

  componentDidMount() {
    axios
      .get('/user')
      .then(data => {
        console.log('data', data)
        axios
          .post('/contacts', {'accessToken': data.data.user.accessToken})
          .then((result) => {
            console.log('data', data, result)
            let contacts = result.data.entry.map(contact => {
              if (contact.gd$name && contact.gd$email) {
                return contact.gd$name.gd$fullName.$t
              }
            }).filter(entry => entry)

            let emails = result.data.entry.map(email => {
              if (email.gd$name && email.gd$email) {
                return email.gd$email[0].address
              }
            }).filter(entry => entry)

            this.setState({
              currentUser: data.data.user,
              contacts,
              emails
            });
          })
          .catch(error => {console.log('this is an error', error)})
      })
      .catch((error) => {
        return ['componentwillmount', error];
      });
  }


refreshDash(){
  this.setState({
    refresh: !this.state.refresh
  })
}

  render() {

    if (this.state.currentUser === undefined ) {
      return null;
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
          <Header refresh={this.refreshDash}/>
            <Switch>
              <Route
                exact path="/"
                render={() => (
                  <DashboardWithData
                    history={browserHistory}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              <Route
                exact path="/eventPage"
                render={() => (
                  <EventPageWithData
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              <Route
                exact path="/createEvent"
                render={() => (
                  <CreateEventWithMutations
                    currentUser={this.state.currentUser}
                    contacts={this.state.contacts}
                    emails={this.state.emails}
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
