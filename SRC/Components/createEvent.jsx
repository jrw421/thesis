import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios'


class createEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      location: '',
      date: '',
      time: undefined,
      description: '',
      currentItem: '',
      items: [],
      guests: [],
      hostId: 1
    }


    this.handleItems = this.handleItems.bind(this)
    this.getEmails = this.getEmails.bind(this)

  }

  submitForm = () => {
    const {  eventTitle, location, date, time, description } = this.state
    console.log('state is ', this.state)
    console.log('this is props ', this.props)
    this.props.addEvent({
      variables: {
        eventTitle,
        location,
        date,
        time,
        description,
        hostId
      }
    })
  }

  handleItems = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        items: [...this.state.items, this.state.currentItem]
      }, () => {
        this.setState({
          currentItem: ''
        })
      })
    }
  }

  render() {
    return (
      <div style={{"textAlign":"center", "marginTop": "20px"}}>
        <h1 style={{"height": "100%", "width": "100%"}}>CREATE YOUR EVENT</h1>
        <br></br>
        <form>
        <TextField value={this.state.eventTitle} type="text" placeholder="Whatcha gonna call your party?" onChange={e => this.setState({ eventTitle: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.location} type="text" placeholder="Where's your party at?" onChange={e => this.setState({ location: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.guests} type="text" placeholder="Who do you not hate?" onChange={e => this.setState({ guests: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.date} type="date" placeholder="What day?" onChange={e => this.setState({ date: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.time} type="time" placeholder="What time?" onChange={e => this.setState({ time: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.description} type="text" placeholder="Tell people what your party is all about!" onChange={e => this.setState({ description: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField 
          value={this.state.currentItem} 
          type="text" 
          placeholder="Whatcha want people to bring?" 
          onChange={e => this.setState({ currentItem: e.target.value })}
          onKeyPress={this.handleItems}
        />
        </form>
        <ul>
          {this.state.items.map(item => {
            return <li>{item}</li>
          })}
        </ul>
        <br></br>
        <br></br>
        <FlatButton label="Submit" secondary={true} onClick={() => this.submitForm()}/>
        <button onClick={() => {this.getEmails()}}>Get Emails</button>

      </div>
    )
  }

}

// const CREATE_EVENT_MUTATION = gql`
//   mutation EventMutation($description: String!, $url: String!) {
//     event(eventTitle: $eventTitle, location: $location, date: $date, time: $time, description: $description) {
//       id
//       eventTitle
//       location
//       date
//       time
//       description
//     }
//   }
// `

// const CREATE_EVENT_MUTATION = gql`
//   mutation {
//     addEvent(name: $name, location: $location, date: $date, time: $time, description: $description, hostId: $hostId) {
//     id
//     eventTitle
//     location
//     date
//     time
//     description
//     hostId
//   }
// `

export default createEvent
// export default graphql(CREATE_EVENT_MUTATION, { name: 'addEvent' })(createEvent)
