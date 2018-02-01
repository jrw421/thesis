import React from 'react'
import Event from './event.jsx'
import {CArd, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

class EventList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentEvent: 0
        }
    }

    changeEvent = () => {
        let events = this.props.events; //change to each array
        this.setState({
            currentEvent: (this.state.currentEvent + 1) % events.length
        })
    }

    changeEventBack = () => {
        let events = this.props.events;
        this.setState({
            currentEvent: (this.state.currentEvent - 1) % events.length
        })
    }

    render() {
        const item = this.props.events[this.state.currentEvent];
        return (
            <div>
                {(this.props.events.length === 0) && 
                    <h3 style={{"textAlign": "center"}}>No events here brah!</h3>
                }
                <div className="pics" style={{"textAlign": "center"}}>
                    {(item !== undefined) &&
                        <div onClick={() => this.props.handleEventClick(item)}>
                        <br></br>
                        {item.name}
                        <br></br>
                        <img style={{"height": "300px", "width": "300px", "textAlign": "center"}} className="img" src={item.img}></img>
                        <br></br>
                        {item.description}
                        </div>
                    }
                    {(this.props.events.length > 0) &&
                        <div>
                            <button style={{"textAlign": "center"}} className="button" onClick={this.changeEventBack.bind(this)}>previous</button>
                            <button style={{"textAlign": "center"}} className="button" onClick={this.changeEvent.bind(this)}>next</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}



export default EventList

