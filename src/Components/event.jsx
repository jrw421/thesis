import React from 'react'

const Event = ({event, handleEventClick}) => (
    <div
        onClick={() => {handleEventClick(event)}}
    >
        {event.name}
        <br></br>
        {event.description}
    </div>
)

export default Event;
