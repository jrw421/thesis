import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Event from './event';

// const mediaStyle = {
//   height: '300px',
//   width: '50px'
// };

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
    // const item = this.props.events[this.state.currentEvent];

    // return (
    //   <Card>
    //     {this.props.events.length === 0 && (
    //       <h3 style={{ textAlign: 'center' }}>No events yet!</h3>
    //     )}

    //     <div className="pics" style={{ textAlign: 'center' }}>
    //       {item !== undefined && (
    //         <div onClick={() => this.props.handleEventClick(item)}>
    //           <br />
    //           <br />
    //           <CardMedia
    //             overlay={
    //               <CardTitle title={item.name} subtitle={item.description} />
    //             }
    //           >
    //             <img
    //               style={{ height: '400px', width: '200px' }}
    //               src={item.img}
    //               alt=""
    //             />
    //           </CardMedia>
    //           <br />
    //         </div>
    //       )}
    //       {this.props.events.length > 0 && (
    //         <CardActions>
    //           <FlatButton
    //             label="previous"
    //             onClick={this.changeEventBack.bind(this)}
    //           />
    //           <FlatButton label="next" onClick={this.changeEvent.bind(this)} />
    //         </CardActions>
    //       )}
    //     </div>
    //   </Card>
    // );
  }
}

EventList.propTypes = {
  events: PropTypes.shape.isRequired,
  handleEventClick: PropTypes.func.isRequired,
};

export default EventList;
