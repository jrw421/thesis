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
      guests: ["Tim", "Todd"],
      info: ''
    }
  }

  componentDidMount() {
    this.setState({
      info: this.props.guestQuery.user
    })
  }

  clickAttending() {
    console.log('you is going to the partay')
    this.setState({
      guests: [...this.state.guests, this.props.currentGuest.name || "Guest"]
    })
  }

  clickNotAttending() {
    console.log('bummer')
    window.location ='/'
  }

  returnHome() {
    window.location ='/'
  }

  render() {
    console.log('STATE ', this.state.info)
    //   console.log("HEEEREEEEE ", this.props.currentUser.params.id)
    // console.log("HERE ", this.props.match.params.id)
    console.log('PROPS ALL ', this.props.guestQuery.user)
    console.log("hey there WHAT ARE YOU ",  this.props.currentUser.params.id)
    console.log("what are we getting here ", this.props.match.params.id)
    // const id = this.props.currentUser.params.id
    return(
    <div>
        <div style={{"textAlign": "center", "align":"center"}}>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickAttending(this.props.currentGuest.name)} //this.props.user.name
          label="I'll be there"/>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={this.clickNotAttending}
          label="Hell nah, I aint coming"/>
          <FlatButton style={{"textAlign": "center", "align":"center"}}
            onClick={this.returnHome}
            label="HOME"/>
      </div>


        <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{event.name}</h1>
          <div className="eventPage">{event.location}</div>
          <div className="eventPage">{event.date}</div>
          <div className="eventPage" >{event.description}</div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Who's Coming</h2>
            <ul>
                {this.state.guests.map((name) => {
                  return (
                    <div style={{"textAlign": "center", "align":"center"}}>
                    <a>{name}</a>
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
              event={this.props.guestQuery.user}
              ></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "400px"}}
            src={event.img}
            alt=""
          />
        </div>
      </div>)
  }
}

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    user(hash: $id) {
      guestEvent{
         id
          name
          description
          img
       }
    }
  }
`

const GuestInfo = graphql(GUEST_QUERY, {
  // skip: (props) => (typeof props.currentUser !== 'string'),
  options: (props) => ({variables: {id: props.currentUser.params.id}}),
  name: 'guestQuery'
})(EventPage2)


export default withRouter(GuestInfo)
