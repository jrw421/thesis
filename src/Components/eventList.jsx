import React from 'react'
import Event from './event.jsx'

const EventList = ({events}) => (
    <ul>
        {events.map(event =>
            <Event 
                event={event}
            />
        )}
    </ul>
)

export default EventList