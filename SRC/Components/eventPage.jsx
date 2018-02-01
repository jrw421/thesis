import React from 'react'
import Items from './item.jsx'
import { withRouter } from 'react-router'

class EventPage extends React.Component {
  render() {
    console.log('Event page props', this.props);
    const event = this.props.location.state.event
    console.log('event', event)
    return (
      <div style={{"textAlign": "center"}} className="eventPage">
        <h1 className="eventPage">{event.name}</h1>
        <div className="eventPage" >{event.description}</div>
        <div className="eventPage">{event.location}</div>
        <div className="eventPage">{event.date}</div>
        <img
          style={{"height":"400px", "width": "200px"}}
          src={event.image}
          alt=""
        />
        <h1>Your Items</h1>
        <Items currentEvent={event.id}/>
      </div>
    )
  }
}


export default withRouter(EventPage)
