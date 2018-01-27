// React, Redux Dependencies
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Component } from 'react'

// Reducer Dependencies
import { combinedReducer } from '../Reducers/root'

// Components
import DashboardContainer from './DashboardContainer.jsx'

// Create Redux Store and pass it Root Reducer
const store = createStore(combinedReducer)
console.log(store.getState())

// Set up Root Component
const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/" component={DashboardContainer} />
      </Router>
    </Provider>
  )