import React from 'react'
import Header from './header.jsx'
import Dashboard from './dashboard.jsx'
import EventPage from './eventPage.jsx'
import CreateEvent from './createEvent.jsx'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/eventPage" component={EventPage} />
            <Route path="/createEvent" component={CreateEvent} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App