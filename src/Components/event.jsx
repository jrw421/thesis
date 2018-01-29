import React from 'react'

const Event = ({event, handleEventClick}) => (
    <div
        onClick={() => {handleEventClick(event)}}
    >
        {event.name}
    </div>
)

export default Event;