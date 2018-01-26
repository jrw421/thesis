// React, Redux Dependencies
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Component } from 'react'

// Reducer Dependencies
import { root } from '../Reducers/root.ts'

const store = createStore(root)

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/" component={DashboardContainer} />
        <Route path="/createEvent" component={createEventContainer} />
        <Route path="/editEvent" component={editEventContainer} />
        <Route path="/event" component={eventPageContainer} />
      </Router>
    </Provider>
  )