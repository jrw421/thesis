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
      name: '',
      location: '',
      date: '',
      time: undefined,
      description: '',
      currentItem: '',
      items: [],
      guests: [],
      host_id: 1
    }
    this.onChange = this.onChange.bind(this)
    this.handleItems = this.handleItems.bind(this)
    this.onSubmit = this.onSubmit(this)
  }

  onSubmit(e) {
    e.preventDefault()
    // const {  eventTitle, location, date, time, description } = this.state
 
    this.props.mutate({
      variables: {
        name: this.state.currentItem,
        host_id: this.props.currentUser.id,
        description: this.state.description,
        location: this.state.location
      }
    }).then(item => console.log(item))
    // .then((data) => console.log('receive data', data))
  }
  
  onClick() {
    submitEvent(e)
  }

  handleItems (e) {
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


        <form onSubmit={this.onSubmit}>
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
        <ul>
          {this.state.items.map(item => {
            return <li>{item}</li>
          })}
        </ul>
        <br></br>
        <br></br>
        <FlatButton 
          label="Submit" 
          value="Submit" 
          type="submit" 
          secondary={true} />


          </form>
      </div>
    )
  }

}


const mutation = gql`
mutation AddEvent($name: String!, $host_id: ID!, $description: String!, $location: String!){
  addEvent(name: $name, host_id: $host_id, description: $description, location: $location) {
    name
    host_id
    description
    location
  }
}`

export default graphql(mutation)(createEvent)
