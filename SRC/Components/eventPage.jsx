import React from 'react'

class EventPage extends React.Component {
  render() {
    const event = this.props.location.state.event
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
      </div>
    )
  }
}

export default EventPage
