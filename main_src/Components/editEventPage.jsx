import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
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
      img: this.props.event.img,
      showItems: false,
    }
    this.submitChanges = this.submitChanges.bind(this)
    this.showItemList = this.showItemList.bind(this)
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

  showItemList() {
    this.setState({showItems: !this.state.showItems})
  }

 

  render() {
  //   <img
  //   style={{ height: '400px', width: '400px' }}
  //   src={event.img}
  //   alt=""
  // />


    let event = this.props.event;

    const backButton = <svg xmlns="http://www.w3.org/2000/svg" 
      width="50" height="50" 
      viewBox="0 0 24 24">
      <path fill="#a7b3a5" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
      </svg>

    return(
      <div className="edit-event">
        <div className="edit-event-grid">
          <div className="edit-event-background-img">


          { !this.state.showItems ? (
            <div>
            <div className="edit-event-inputs">
          <h1>Edit Event</h1>
                <TextField type="text" placeholder={event.name} className="input" secondary={true} onChange={(e) => this.setState({name: e.target.value})}></TextField>
                <TextField type="text" placeholder={event.location} className="input" secondary={true} onChange={(e) => this.setState({location: e.target.value})}></TextField>
                <DateTimePicker
                DatePicker={DatePickerDialog}
                TimePicker={TimePickerDialog}
                // value={this.state.date}
                // type="date"
                placeholder="Edit your date and time"
                onChange={(time) => {
                  let year = time.getFullYear()
                  let month = ('' + (time.getMonth() + 1)).length === 1 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                  let day = ('' + time.getDate()).length === 1 ? '0' + time.getDate() : time.getDate();
                  let date = '' + year + month + day
      
                  let hour = time.getHours()
                  let minutes = time.getMinutes()
                  let clockTime = hour + ':' + minutes
      
                  this.setState({ date: Number(date) })
                  this.setState({ time: clockTime  , dateTimeStart: time.toISOString()})
                }
              }
              />
            
                <TextField type="text" placeholder={event.description} className="input" secondary={true} onChange={(e) => this.setState({description: e.target.value})}></TextField>
              </div>
              <div className="edit-event-inputs-buttons">
                <span>
                <RaisedButton label="Submit Changes" primary={true} onClick={this.submitChanges} />
                </span>
                <span className="edit-event-navigate-btn" className="svg">
                <svg onClick={this.showItemList} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#eae3ea" d="M6.028 0v6.425l5.549 5.575-5.549 5.575v6.425l11.944-12z"/></svg>
                </span>
                </div>
              </div>
            ) : (
              <div>
              <ul>
            <ItemList 
              event={this.props.event}
              currentUser={this.props.currentUser}
              currentlyEditing={this.props.currentlyEditing}
                />
                </ul>
                <span className="edit-event-navigate-btn" onClick={this.showItemList}>{backButton}</span>
                </div>
                
            )  }
          </div>
        </div>
      </div>
    )
  }

}



export default EditEventPage

