import React from 'react'
import Header from './header.jsx'
//import Dashboard from './dashboard.jsx'
import DashboardWithData from './dashboard.jsx'
import EventPage from './eventPage.jsx'
import CreateEventWithMutations from './createEvent.jsx'
// import MuiThemeProvider from 'material-ui/styles'
import { Switch, Route, browserHistory } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios'
import { withApollo } from 'react-apollo';
import $ from 'jquery'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined
    }
  }

  componentWillMount() {
    axios.get('/user')
          .then(data => {
            this.setState({
              currentUser: data.data.user || null
            })
          })
          .catch(error => {
            console.log(error)
          })

    // axios.get('/contacts')
    //     .then(data => {
    //       console.log('contact data ?' , data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // checkAuth()
    // handleAuthResult()
  }

  // $(document).on('click', '.js-google_contacts', function() {
  //   gapi.client.setApiKey(apiKey);
  //   window.setTimeout(checkAuth, 3);
  // });

  // function checkAuth() {
  //   var clientId = '571244561845-vl8oue7ljre4h8s1tq375bbki1ni92ih.apps.googleusercontent.com';
  //   var apiKey = 'AIzaSyDY6W23xMu7ct8KPcCnM-7HD_DiqgK0XI0';
  //   var scopes = 'https://www.google.com/m8/feeds';
  //
  //   gapi.auth.authorize({
  //     client_id: clientId,
  //     scope: scopes,
  //     immediate: false
  //   }, handleAuthResult);
  // }
  //
  // function handleAuthResult(authResult) {
  //   if (authResult && !authResult.error) {
  //     $.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' +
  //     authResult.access_token + '&max-results=700&v=3.0',
  //     function(response) {
  //       console.log(response)
  //     });
  //   }
  // }
  render() {
    if (this.state.currentUser === undefined) {
      return <div>wait</div>
    } else {
      return (
        <MuiThemeProvider>
        <div>
          <Header />
          <div>
            <Switch>
              <Route path="/dashboard/:id" render={({match}) => <DashboardWithData history={browserHistory} currentUser={this.state.currentUser} currentGuest={match}/>}/> 
              <Route path="/eventPage" render={() => <EventPage currentUser={this.state.currentUser} />}/>
              <Route path="/createEvent" render={() => <CreateEventWithMutations currentUser={this.state.currentUser} />}/>
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
      )
    }
  }
}

export default withApollo(App)

