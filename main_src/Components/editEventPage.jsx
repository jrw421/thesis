import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RaisedButton from 'material-ui/RaisedButton';
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
      console.log(results.data)
      let filteredResults = {}
      for (var key in results.data.editEventFields) {
        if (key !== "__typename") {
          filteredResults[key] = results.data.editEventFields[key]
        }
      }
      console.log('filteredResults', filteredResults)
      this.props.updateEventState(filteredResults)
    })
    .catch((err) => console.log(err))
    .then(() => {
      this.props.toggleEditState()
    })
    .catch((err) => console.log(err))
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



export default EditEventPage
