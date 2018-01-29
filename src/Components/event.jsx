import React from 'react'

const Event = ({event, onEventClick}) => (
    <div>
        <img src={event.image}/>
    </div>
)

export default Event;