import React from 'react'
import Event from './event.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

const mediaStyle = {
  height: '300px',
  width: '50px'
}

class EventList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentEvent: 0
        }
    }

    changeEvent = () => {
        let events = this.props.events;
        this.setState({
            currentEvent: (this.state.currentEvent + 1) % events.length
        })
    }

    changeEventBack = () => {
        let events = this.props.events;
        console.log('HI')
        this.setState({
            currentEvent: (this.state.currentEvent - 1) % events.length
        })
    }

    render() {
        const item = this.props.events[this.state.currentEvent];
        console.log('HERE IS ITEM ', item)
        console.log('HELLLLOOOOOOO ', this.props.events)

            return (
              <Card>
                {/* <div>{item.description} </div> */}

                    {(this.props.events.length === 0) &&
                        <h3 style={{"textAlign": "center"}}>No events yet!</h3> }

                    <div className="pics" style={{"textAlign": "center"}}>
                        {(item !== undefined) &&
                            <div onClick={() => this.props.handleEventClick(item)}>
                            <br></br>
                            <br></br>
                            {/* <img style={{"height": "300px", "width": "300px", "textAlign": "center"}} className="img" src={item.img}></img> */}
                            <CardMedia
                                overlay={<CardTitle title={item.name} subtitle={item.description} />}
                              >
                                <img style={{"height": "400px", "width": "200px"}}
                                  src={item.img} alt="" />
                              </CardMedia>
                            <br></br>
                            </div>
                        }
                        {(this.props.events.length > 0) &&
                          <CardActions>
                            <FlatButton label="previous" onClick={this.changeEventBack.bind(this)}/>
                            <FlatButton label="next" onClick={this.changeEvent.bind(this)}/>
                          </CardActions>
                        }
                    </div>



                 {/* <CardMedia
                      overlay={<CardTitle title={item.name} subtitle={item.description} />}
                    >
                      <img style={{"height":"400px", "width": "150px"}}
                        src={item.img} alt="" />
                    </CardMedia>
                    {(this.props.events.length > 0) &&
                    <CardActions>
                      <FlatButton label="previous" onClick={this.changeEventBack.bind(this)}/>
                      <FlatButton label="next" onClick={this.changeEvent.bind(this)}/>
                    </CardActions>
                    } */}


                </Card>
        )
    }
}

export default EventList;
