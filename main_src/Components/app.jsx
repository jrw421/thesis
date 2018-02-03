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

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined,
      contacts: []
      // guests: ["Bob", "Joe"]
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

  }
  //
  // clickAttending() {
  //   console.log('you is going to the partay')
  //   //add user name to who is Coming
  //   this.setState({
  //     guests: [...this.state.guests, this.props.currentUser.name]
  //   })
  // }
  //
  // clickNotAttending() {
  //   console.log('sucks to suck')
  //   window.location ='/'
  //   //redirect to landing
  // }


  render() {
    if (this.state.currentUser === undefined) {
      return null
    } else {
      console.log('contacts ', this.state.contacts)
      return (
        <MuiThemeProvider>
        <div>
          <Header />
          <div>
            <Switch>
              <Route path="/dashboard/:id" render={({match}) => <DashboardWithData history={browserHistory} currentUser={this.state.currentUser} currentGuest={match}/>}/>
              <Route path="/eventPage/:id" render={({match}) => <EventPage currentUser={this.state.currentUser} currentGuest={match}/>}/>
              <Route path="/createEvent" render={() => <CreateEventWithMutations currentUser={this.state.currentUser} />}/>
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
      )
    }
  }
}

// const NAME_QUERY = gql `
//   query nameQuery ($id: String){
//       user(hash: $id) {
//         name
//         # items {
//         #   id
//         #   name
//         #   user_id
//         # }
//     }
//   }
// `
//
// const nameGuest = graphql(NAME_QUERY, {
//   skip: (props) => (typeof props.currentUser !== 'string'),
//   options: (props) => ({variables: {id: props.currentUser}}),
//   name: 'nameGuest'
// })(App);

export default withApollo(App)
