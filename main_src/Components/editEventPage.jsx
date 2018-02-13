import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ItemList from './itemList';

class EditEventPage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      name: this.props.event.name,
      location: this.props.event.location,
      date: this.props.event.date,
      time: this.props.event.time,
      description: this.props.event.description,
      img: this.props.event.img
    }
    this.submitChanges = this.submitChanges.bind(this)
  }

  submitChanges() {
    this.props.editEventFields({
      variables: {
        id: this.props.event.id,
        name: this.state.name,
        host_id: this.props.currentUser.id,
        description: this.state.description,
        time: this.state.time,
        date: this.state.date,
        location: this.state.location,
        img: this.state.img
      }
    })
    .then((results) => {
      let filteredResults = {}
      for (var key in results.data.editEventFields) {
        if (key !== "__typename") {
          filteredResults[key] = results.data.editEventFields[key]
        }
      }
      this.props.updateEventState(filteredResults)
    })
    .catch((err) => {
      return err
    })
    .then(() => {
      this.props.toggleEditState()
    })
    .catch((err) => {
      return err
    })
  }

 

  render() {
  //   <img
  //   style={{ height: '400px', width: '400px' }}
  //   src={event.img}
  //   alt=""
  // />

    let event = this.props.event;

    return(
      <section className="edit-event">
        <div className="edit-event-grid">
          <div className="edit-event-background-img">
          <div className="edit-event-inputs">
          <h1>Edit Event</h1>
                <TextField type="text" placeholder={event.name} className="input" secondary={true} onChange={(e) => this.setState({name: e.target.value})}></TextField>
                <TextField type="text" placeholder={event.location} className="input" secondary={true} onChange={(e) => this.setState({location: e.target.value})}></TextField>
                <TextField type="text" placeholder={event.date} className="input" secondary={true} onChange={(e) => this.setState({date: e.target.value})}></TextField>
                <TextField type="text" placeholder={event.time} className="input" secondary={true} onChange={(e) => this.setState({time: e.target.value})}></TextField>
                <TextField type="text" placeholder={event.description} className="input" secondary={true} onChange={(e) => this.setState({description: e.target.value})}></TextField>
                <RaisedButton label="Submit Changes" primary={true} onClick={this.submitChanges} />
              </div>
            <ul>
              <ItemList 
              event={this.props.event}
              currentUser={this.props.currentUser}
              currentlyEditing={this.props.currentlyEditing}
                />
            </ul>
          </div>
        </div>
      </section>
    )
  }

}



export default EditEventPage

