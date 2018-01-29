import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class createEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      location: '',
      date: '', 
      time: undefined, 
      description: ''
    }
  }

  submitForm = () => {
    const {  eventTitle, location, date, time, description } = this.state
    console.log('state is ', this.state)
    console.log('this is props ', this.props)
    // this.props.eventMutation({
    //   variables: {
    //     eventTitle,
    //     location,
    //     date,
    //     time,
    //     description
    //   }
    // }) 
  }

  render() {
    return (
      <div>
        <input value={this.state.eventTitle} type="text" placeholder="Event title" onChange={e => this.setState({ eventTitle: e.target.value })}/>
        <input value={this.state.location} type="text" placeholder="location" onChange={e => this.setState({ location: e.target.value })}/>
        <input value={this.state.date} type="date" placeholder="date" onChange={e => this.setState({ date: e.target.value })}/>
        <input value={this.state.time} type="time" placeholder="Event time" onChange={e => this.setState({ time: e.target.value })}/>
        <input value={this.state.description} type="text" placeholder="Event description" onChange={e => this.setState({ description: e.target.value })}/>
        <button onClick={() => this.submitForm()}>Submit</button>
      </div>
    )
  }
}

const CREATE_EVENT_MUTATION = gql`
# placeholder
mutation EventMutation($description: String!, $url: String!) {
  event(eventTitle: $eventTitle, location: $location, date: $date, time: $time, description: $description) {
    id
    eventTitle
    location
    date
    time
    description
  }
}
`

export default graphql(CREATE_EVENT_MUTATION, { name: 'eventMutation' })(createEvent)