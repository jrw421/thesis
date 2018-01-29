import React from 'react'

class EventPage extends React.Component {
  render() {
    const event = this.props.location.state.event
    return (
      <div>
        <div>{event.name}</div>
        <div>{event.description}</div>
        <div>{event.location}</div>
        <div>{event.date}</div>
      </div>
    )
  }
}

export default EventPage