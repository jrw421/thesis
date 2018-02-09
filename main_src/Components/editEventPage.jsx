import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RaisedButton from 'material-ui/RaisedButton';
import ItemList from './itemList';
import { editEventFields } from '../mutations.js'

class EditEventPage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      name: "",
      location: "",
      date: "",
      time: "",
      description: ""
    }
    this.submitChanges = this.submitChanges.bind(this)
  }

  submitChanges() {
    this.props.editEventFields({
      variables: {
        name: this.state.name,
        host_id: this.props.currentUser.id,
        description: this.state.description,
        time: this.state.time,
        date: this.state.description,
        location: this.state.location,
        img: this.state.img
      }
    })
    .then(() => {
      this.props.toggleEditState()
    })
  }

 

  render() {

    let event = this.props.event;

    return(
      <div>

     
      <div style={{ textAlign: 'center' }} className="eventPage">
      <RaisedButton label="Submit Changes" primary={true} onClick={this.submitChanges} />
      <input type="text" placeholder={event.name} className="eventPage" onChange={(e) => this.setState({name: e.target.value})}></input>
      <input type="text" placeholder={event.location} className="eventPage" onChange={(e) => this.setState({location: e.target.value})}></input>
      <input type="text" placeholder={event.date} className="eventPage" onChange={(e) => this.setState({date: e.target.value})}></input>
      <input type="text" placeholder={event.time} className="eventPage time" onChange={(e) => this.setState({time: e.target.value})}></input>
      <input type="text" placeholder={event.description} className="eventPage" onChange={(e) => this.setState({description: e.target.value})}></input>

     
          <ItemList
            currentUser={this.props.currentUser}
            event={event}
          />
          <ul />
  
          <img
          style={{ height: '400px', width: '400px' }}
          src={event.img}
          alt=""
        />
    
      </div>

      </div>
    )
  }

}

const EditEventPageWithMutation = graphql(editEventFields, { name: 'editEventFields' })(EditEventPage)


export default EditEventPageWithMutation
