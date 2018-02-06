import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import ItemList from './itemList.jsx'
import gql from 'graphql-tag'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EventPage2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guests: []
    }
  }

  // componentWillMount() {
  //   this.setState({
  //     guests: this.props.guestQuery.user
  //   })
  //   // console.log('HERRO ', this.props.guestQuery.user)
  // }

  postLoad() {
    this.setState({
      guests: this.props.guestQuery.user.guestEvent.users
    })
  }
  clickAttending() {
    this.setState({
      guests: [...this.state.guests, this.props.guestQuery.user.name]
    })

    this.props.confirmPresence({
      variables: {
        userId: this.props.guestQuery.user.id,
        eventId: this.props.guestQuery.user.guestEvent.id
      }
    })
  }

  clickNotAttending() {
    this.props.denyPresence({
      variables: {
        userId: this.props.guestQuery.user.id,
        eventId: this.props.guestQuery.user.guestEvent.id
      }
    })
    window.location ='/'
  }

  returnHome() {
    window.location ='/'
  }

  render() {
    //   console.log("HEEEREEEEE ", this.props.currentUser.params.id)
    // console.log("HERE ", this.props.match.params.id)
    if (this.props.guestQuery.loading || this.props.guestQuery.error) {
      return null
    }
    console.log('HEY DUDE ', this.props.guestQuery.user.guestEvent.users[0]) //array of users attending
    let users = this.props.guestQuery.user.guestEvent.users
    console.log('yUersss ', users)
    // console.log('ERHG STATE ', this.state.guests)
    // console.log('HEREE ', this.props.guestQuery.user.guestEvent.id)
    // console.log('stateeee ', this.props.guestQuery)
    // console.log('PROPS ALL ', this.props.guestQuery.user.name)
    // console.log("hey there WHAT ARE YOU ",  this.props.currentUser.params.id)
    // console.log("what are we getting here ", this.props.match.params.id)
    // const id = this.props.currentUser.params.id
    return(
    <div>
        <div style={{"textAlign": "center", "align":"center"}}>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickAttending(this.props.guestQuery.user.name)} //this.props.user.name
          label="I'll be there"/>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={this.clickNotAttending}
          label="Hell nah, I aint coming"/>
          <FlatButton style={{"textAlign": "center", "align":"center"}}
            onClick={this.returnHome}
            label="HOME"/>
      </div>

        <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{this.props.guestQuery.user.guestEvent.name}</h1>
          <div className="eventPage">{this.props.guestQuery.user.guestEvent.location}</div>
          <div className="eventPage">{this.props.guestQuery.user.guestEvent.date}</div>
          <div className="eventPage" >{this.props.guestQuery.user.guestEvent.description}</div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Who's Coming</h2>
            <ul>
                {users.map((name) => {
                  return (
                    <div style={{"textAlign": "center", "align":"center"}}>
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
              currentUser={this.props.match.params.id}
              event={this.props.guestQuery}
              ></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "400px"}}
            src={this.props.guestQuery.user.guestEvent.img}
            alt=""
          />
        </div>
      </div>)
  }
}

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    user(hash: $id) {
      id
      name
      guestEvent{
        items {
          name
          user_id
          id
        }
        users {
         name
         id
       }
          id
          name
          description
          img
       }
    }
  }
`

const confirmPresence = gql`
  mutation confirmPresence($userId: Int!, $eventId: Int!){
    confirmPresence(userId: $userId, eventId: $eventId){
      userId
      eventId
    }
  }
`
const denyPresence = gql`
  mutation denyPresence($userId: Int!, $eventId: Int!){
    denyPresence(userId: $userId, eventId: $eventId){
      userId
      eventId
    }
  }
`


const GuestInfo = compose (
  graphql(confirmPresence, { name: 'confirmPresence' }),
  graphql(denyPresence, { name: 'denyPresence'}),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.currentUser.params.id}}),
    name: 'guestQuery'
}))(EventPage2)


export default withRouter(GuestInfo)
