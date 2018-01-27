// React Dependencies
import { Component } from 'react';

// Redux Dependencies
import { connect } from 'react-redux'

// Actions
import setCurrentEvent from '../Actions/currentEventActions.js'

// Child Components
import EventList from '../Components/eventList.jsx'

// Take in Redux State and allow it to be passed
// to presentation components as props
const mapStateToProps = function(state) {
    return {
       attendingEvents: state.attendingEvents,
       hostingEvents: state.hostingEvents,
       pastEvents: state.pastEvents
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onEventClick: (event) => {
            dispatch(setCurrentEvent(event))
        }
    }
}

class DashboardContainer extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <EventList 
                    events={this.props.hostingEvents}
                    onEventClick={this.props.onEventClick}
                />
                <EventList 
                    events={this.props.attendingEvents}
                    onEventClick={this.props.onEventClick}
                />
                <EventList 
                    events={this.props.pastEvents}
                    onEventClick={this.props.onEventClick}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
