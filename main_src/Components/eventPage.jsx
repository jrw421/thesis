import React from 'react';
import ItemList from './itemList.jsx';
import EditEvent from './editEvent.jsx';
import { withRouter } from 'react-router';
import { Switch, Route, browserHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: ['Bob', 'Joe']
    };
  }

  clickAttending() {
    this.setState({
      guests: [...this.state.guests, this.props.currentUser.name]
    });
  }

  clickNotAttending() {
    window.location = '/';
  }

  render() {
        const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname:location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);
   
    return (
    <EditEvent 
      location={this.props.location}
      guests={this.state.guests}
      currentUser={this.props.currentUser}
      guests={this.state.guests}
      />


    ) 
  }
}
  



const NAME_QUERY = gql`
  query nameQuery($id: String) {
    user(hash: $id) {
      name
    }
  }
`;

const EventPageWithData = graphql(NAME_QUERY, {
  skip: props => typeof props.currentUser !== 'string',
  options: props => ({ variables: { id: props.currentUser } }),
  name: 'nameGuest'
})(EventPage);

export default withRouter(EventPageWithData);
