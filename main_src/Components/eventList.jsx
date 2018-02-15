import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Event from './event';
import Loader from 'react-loader-spinner';
import '../Styles/Components/_dashboard.scss';

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEvent: 0,
      events: [],
      currentEvents: 0,
      currentPic: 0

    };

    this.changeEvent = this.changeEvent.bind(this);
    this.changeEventBack = this.changeEventBack.bind(this);

  }

  componentDidMount() {
      this.setState({
        events: this.props.events
      })
  }

  changeEvent() {
    var events = this.props.events;
    this.setState({
      currentPic: (this.state.currentPic + 1) % events.length
    });
  }

  changeEventBack() {
      var events = this.props.events;
      this.setState({
        currentPic: (this.state.currentPic - 1) % events.length
      });
    }

  render() {

    if (this.props.events.length === 0) {

      return <div />
    }

    const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
    const leftArrow = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>

    return (
      <div>

        <div className="event-grid">

          <div className="event-grid-buttons-left" onClick={this.changeEventBack} style={{"alignSelf": "center"}}>
            {leftArrow}
          </div>

          <Event event={this.props.events[this.state.currentPic]}  handleEventClick={this.props.handleEventClick} className="event-list-first"/>
          <Event event={this.props.events[this.state.currentPic + 1]}  handleEventClick={this.props.handleEventClick} className="event-list-second" />
          {this.props.events[this.state.currentPic + 2] ? (<Event event={this.props.events[this.state.currentPic + 2]} handleEventClick={this.props.handleEventClick} className="event-list-third"/>) : (<Event event={null} />)}

      <div className="event-grid-buttons-right" onClick={this.changeEvent} style={{"alignSelf": "center"}}>
        {rightArrow}
      </div>
        </div>

    </div>
      );
  }
}


export default EventList;
