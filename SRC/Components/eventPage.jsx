import React from 'react'
import ItemList from './itemList.jsx'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class EventPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        guests: ["Bob", "Joe"]
      }
    }

    clickAttending() {
      console.log('you is going to the partay')
      this.setState({
        guests: [...this.state.guests, this.props.currentGuest.name || "YOUR NAME HERE"]
      })
    }

    clickNotAttending() {
      console.log('sucks to suck')
      window.location ='/'
    }

   render() {
    if (this.props.location.state.event === undefined) {
      // console.log('testing', this.props)
      return null
    } else {
      // console.log('PROPS IN EVENT PAGE ', this.props.currentUser.name)
      console.log('GUESTS ', this.state.guests)
      const event = this.props.location.state.event
      // console.log('event',this.props.location.state.event)
      // console.log('curent Gues ', this.props.location.state.currentGuest)
      return (
        <div>
        {this.props.location.state.currentGuest ? (
        <div>
            <div>
            <button style={{"textAlign": "center", "align":"center"}}
              onClick={() => this.clickAttending(this.props.currentGuest.name)}
              >I'll be there</button>
            <button style={{"textAlign": "center", "align":"center"}}
              onClick={this.clickNotAttending}
              >Hell nah, I aint coming</button>
          </div>


            <div style={{"textAlign": "center"}} className="eventPage">
              <h1 className="eventPage">{event.name}</h1>
              <div className="eventPage">{event.location}</div>
              <div className="eventPage">{event.date}</div>
              <div className="eventPage" >{event.description}</div>
              <div>
                <h3>Who's Coming</h3>
                <ul>
                    {this.state.guests.map((name) => {
                      return (
                        <div>
                        <a>{name}</a>
                      </div>
                      )
                    })}
                </ul>
              </div>
              <div>
                <h3>Item Registery</h3>
                <ItemList currentUser={this.props.currentUser || this.props.location.state.currentGuest} event={this.props.location.state.event}></ItemList>
                <ul></ul>
              </div>
              <img
                style={{"height":"400px", "width": "200px"}}
                src={event.img}
                alt=""
              />
            </div>
          </div>


        ) : (


        <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{event.name}</h1>
          <div className="eventPage">{event.location}</div>
          <div className="eventPage">{event.date}</div>
          <div className="eventPage" >{event.description}</div>
          <div>
            <h3>Who's Coming</h3>
            <ul>
              {this.state.guests.map((name) => {
                return (
                  <div>
                  <a>{name}</a>
                </div>
                )
              })}
            </ul>
          </div>
          <div>
            <h3>Item Registery</h3>
            <ItemList currentUser={this.props.currentUser || this.props.location.state.currentGuest} event={this.props.location.state.event}></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "200px"}}
            src={event.img}
            alt=""
          />
        </div>
        )}
      </div>
      )
    }
  }
}

const NAME_QUERY = gql `
  query nameQuery ($id: String){
    user(hash: $id) {
      name
    }
  }
`

const nameGuest = graphql(NAME_QUERY, {
  skip: (props) => (typeof props.currentUser !== 'string'),
  options: (props) => ({variables: {id: props.currentUser}}),
  name: 'nameGuest'
})(EventPage);

export default withRouter(nameGuest)
