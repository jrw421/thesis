import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import ItemList from './itemList.jsx'
import gql from 'graphql-tag'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { confirmPresence, denyPresence } from '../mutations.js'
import { guestQuery } from '../queries.js'
class EventPage2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guests: ["bob"]
    }
  }

  postLoad() {
    this.setState({
      guests: this.props.guestQuery.guestUser.guestEvent.users
    })
  }

  clickAttending(name) {
    alert("Great! Can't wait to see you there!")
    console.log('event id ', this.props.guestQuery.guestUser.id, this.props.guestQuery.guestUser.guestEvent.id)

    this.setState({
      guests: [...this.state.guests, name]
    })
   // console.log('event id ', this.props.guestQuery.user.id, this.props.guestQuery.user.guestEvent.id)
    this.props.confirmPresence({
      variables: {
        user_id: this.props.guestQuery.guestUser.id,
        event_id: this.props.guestQuery.guestUser.guestEvent.id
      }
    })
  }

  clickNotAttending() {
    alert('So sad! You suck!')
    console.log('event id ', this.props.guestQuery.guestUser.id, this.props.guestQuery.guestUser.guestEvent.id)
    this.props.denyPresence({
      variables: {
        user_id: this.props.guestQuery.guestUser.id,
        event_id: this.props.guestQuery.guestUser.guestEvent.id
      }
    })
    window.location ='/'
  }

  returnHome() {
    window.location ='/'
  }

  render() {
    if (this.props.guestQuery.loading || this.props.guestQuery.error) {
      return null
    }
    // console.log('event id ', this.props.guestQuery.user.guestEvent.id)
    // console.log('HEY DUDE ', this.props.guestQuery.user.guestEvent.users[0]) //array of users attending
    console.log('props in eventPage ', this.props)
    let users = this.props.guestQuery.guestUser.guestEvent.users

    return(
    <div>

        <div style={{"textAlign": "center", "align":"center"}}>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickAttending(this.props.guestQuery.guestUser.name)} //this.props.guestUser.name
          label="I'll be there"/>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickNotAttending()}
          label="Hell nah, I aint coming"/>
          <FlatButton style={{"textAlign": "center", "align":"center"}}
            onClick={this.returnHome}
            label="HOME"/>
      </div>

        <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{this.props.guestQuery.guestUser.guestEvent.name}</h1>
          <div className="eventPage">{this.props.guestQuery.guestUser.guestEvent.location}</div>
          <div className="eventPage">{this.props.guestQuery.guestUser.guestEvent.date}</div>
          <div className="eventPage" >{this.props.guestQuery.guestUser.guestEvent.description}</div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Who's Coming</h2>
            <ul>
                {users.map((name, i) => {
                  return (
                    <div key={i} style={{"textAlign": "center", "align":"center"}}>
                    <a>{name.name}</a>
                  </div>
                  )
                })}
            </ul>
          </div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Item Registery</h2>
            <h3>Click on an item to claim it</h3>
            <ItemList style={{"textAlign": "center", "align":"center"}}
              eventId={this.props.guestQuery.guestUser.guestEvent.id}
              hash={this.props.currentUser.params.id}
              currentUser={this.props.match.params.id}
              event={this.props.guestQuery}
              ></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "400px"}}
            src={this.props.guestQuery.guestUser.guestEvent.img || "https://static.businessinsider.com/image/519e85e6ecad04337f000019/image.jpg"}
            alt=""
          />
        </div>
      </div>)
  }
}


const GuestInfo = compose (
  graphql(confirmPresence, { name: 'confirmPresence' }),
  graphql(denyPresence, { name: 'denyPresence'}),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.currentUser.params.id}}),
    name: 'guestQuery'
}))(EventPage2)


export default withRouter(GuestInfo)
