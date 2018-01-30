import React from 'react'
import Event from './event.jsx'

const EventList = ({events, handleEventClick}) => (
  <div>
    <ul style={{"textAlign": "center"}}>
        {events.map(event =>
            <Event
                event={event}
                handleEventClick={handleEventClick}
                key={event.id}
            />
        )}
    </ul>
  </div>
)

export default EventList
