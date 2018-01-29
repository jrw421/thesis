import React from 'react'
import Event from './event.jsx'

const EventList = ({events, handleEventClick}) => (
    <ul>
        {events.map(event =>
            <Event 
                event={event}
                handleEventClick={handleEventClick}
                key={event.id}
            />
        )}
    </ul>
)

export default EventList