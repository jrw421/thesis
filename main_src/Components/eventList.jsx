import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Event from './event';

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEvent: 0,
    };

    this.changeEvent = this.changeEvent.bind(this);
    this.changeEventBack = this.changeEventBack.bind(this);
  }

  changeEvent() {
    const { events } = this.props;
    const { length } = events;
    this.setState({ currentEvent: this.state.currentEvent + 1 === length ? 0 : this.state.currentEvent + 1 });
  }

  changeEventBack() {
    const { events } = this.props;
    const { length } = events;
    this.setState({ currentEvent: this.state.currentEvent - 1 < 0 ? length - 1 : this.state.currentEvent - 1 });
  }

  render() {
    if (this.props.events.length === 0) {
      return null;
    }
    return (
      <div>
        <Event event={this.props.events[this.state.currentEvent]} handleEventClick={this.props.handleEventClick} />
        <FlatButton
          label="previous"
          onClick={this.changeEventBack}
        />
        <FlatButton
          label="next"
          onClick={this.changeEvent}
        />
      </div>
    );
  }
}

export default EventList;
