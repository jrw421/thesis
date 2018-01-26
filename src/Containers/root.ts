// React, Redux Dependencies
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Component } from 'react'

// Reducer Dependencies
import { combinedReducer } from '../Reducers/root.ts'

// Components
import DashboardContainer from './DashboardContainer'
import CreateEventContainer from './CreateEventContainer'
import EditEventContainer from './EditEventContainer'
import EventPageContainer from './EventPageContainer'

// Create Redux Store and pass it Root Reducer
const store = createStore(combinedReducer)

// Set up Root Component
const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/" component={DashboardContainer} />
        <Route path="/createEvent" component={CreateEventContainer} />
        <Route path="/editEvent" component={EditEventContainer} />
        <Route path="/event" component={EventPageContainer} />
      </Router>
    </Provider>
  )