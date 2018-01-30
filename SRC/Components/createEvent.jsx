import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

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
      <div style={{"textAlign":"center", "marginTop": "100px"}}>
        <h1 style={{"height": "100%", "width": "100%"}}>CREATE YOUR EVENT</h1>
        <br></br>
        <br></br>
        <TextField value={this.state.eventTitle} type="text" placeholder="Event title" onChange={e => this.setState({ eventTitle: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.location} type="text" placeholder="location" onChange={e => this.setState({ location: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.date} type="date" placeholder="date" onChange={e => this.setState({ date: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.time} type="time" placeholder="Event time" onChange={e => this.setState({ time: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.description} type="text" placeholder="Event description" onChange={e => this.setState({ description: e.target.value })}/>
        <br></br>
        <br></br>
        <FlatButton label="Submit" secondary={true} onClick={() => this.submitForm()}/>
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
