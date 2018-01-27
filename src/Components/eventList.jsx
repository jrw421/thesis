import Event from './event.jsx'

const EventList = ({events, onEventClick}) => (
    <ul>
        {events.map(event =>
            <Event 
                event={event}
                onEventClick={onEventClick}
            />
        )}
    </ul>
)