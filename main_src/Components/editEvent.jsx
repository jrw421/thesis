import React from 'react';
import ItemList from './itemList';
import RaisedButton from 'material-ui/RaisedButton';

class EditEvent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.location.state.event === undefined) {
      return null;
    }

  console.log('props', this.props)
  console.log('event', this.props.location.state.event)
  
      var event = this.props.location.state.event;
    

      return (
      <div style={{ textAlign: 'center' }} className="eventPage">
      <RaisedButton label="Edit Event" primary={true} /> 
      <h1 className="eventPage">{event.name}</h1>
      <div className="eventPage">{event.location}</div>
      <div className="eventPage">{event.date}</div>
      <div className="eventPage time">{event.time}</div>
      <div className="eventPage">{event.description}</div>

        <div>
          <h2>Who's Coming</h2>
          <ul>
            {this.props.guests.map((name, id) => {
              return (
                <div>
                  <h3>{name}</h3>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <h2>Item Registery</h2>
          <h3>Click on an item to claim it</h3>
          <ItemList
            currentUser={this.props.currentUser}
            event={this.props.location.state.event}
          />
          <ul />
        </div>
          <img
          style={{ height: '400px', width: '400px' }}
          src={event.img}
          alt=""
        />
      </div>

    )
  }




}


export default EditEvent