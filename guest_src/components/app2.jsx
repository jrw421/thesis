import React from 'react'
import Header2 from './header2.jsx'
import EventPage2 from './eventPage2.jsx'
import { Switch, Route, browserHistory } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios'
import { withApollo } from 'react-apollo';

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


class App2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    // axios.get('/user')
    //       .then(data => {
    //         this.setState({
    //           currentUser: data.data.user || null
    //         })
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    // let href = window.location.href.substring(31)
    // this.setState({
    //   currentUser: href
    // )}
  }

  render() {
      return (
        <MuiThemeProvider>
        <div>
          <Header2 />
          <div>
            <Switch>
              {/* <Route path="/dashboard/:id" render={({match}) => <DashboardWithData history={browserHistory} currentUser={this.state.currentUser} currentGuest={match}/>}/> */}
              <Route path="/eventPage/:id" render={({match}) => <EventPage2 currentUser={match}/>}/>
              {/* <Route path="/createEvent" render={() => <CreateEventWithMutations currentUser={this.state.currentUser} />}/> */}
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
      )
  }
}

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    user(hash: $id) {
      id
    }
  }
`

const GuestID = graphql(GUEST_QUERY, {
  skip: (props) => (typeof props.currentUser !== 'string'),
  options: (props) => ({variables: {id: props.currentUser}}), //change variables
  name: 'guestQuery'
})(App2)


export default withApollo(GuestID)
