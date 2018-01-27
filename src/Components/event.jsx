const Event = ({event, onEventClick}) => (
    <div
        onClick={() => {onEventClick(event)}}
    >
        <img src={event.image}/>
    </div>
)

export default Event;