import React from 'react'
import Header from './header.jsx'
import Dashboard from './dashboard.jsx'
import EventPage from './eventPage.jsx'
import CreateEvent from './createEvent.jsx'
// import MuiThemeProvider from 'material-ui/styles'
import { Switch, Route } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/eventPage" component={EventPage} />
            <Route path="/createEvent" component={CreateEvent} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default App
