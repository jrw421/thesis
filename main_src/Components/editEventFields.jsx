import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ItemList from './itemList';

class EditEventFields extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      name="",
      location="",
      date="",
      time="",
      description=""
    }
  }

  render() {

    let event = this.props.event;

    return(
      <div>

     
      <div style={{ textAlign: 'center' }} className="eventPage">
      <RaisedButton label="Submit Changes" primary={true} />
      <input type="text" value={event.name} className="eventPage"></input>
      <input type="text" value={event.location} className="eventPage"></input>
      <input type="text" value={event.date} className="eventPage"></input>
      <input type="text" value={event.time} className="eventPage time"></input>
      <input type="text" value={event.description} className="eventPage"></input>

     
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



export default EditEventFields;
