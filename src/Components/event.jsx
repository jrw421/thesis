import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Event = ({event, handleEventClick}) => (
  <Card onClick={() => {handleEventClick(event)}}>
   <CardMedia
     overlay={<CardTitle title={event.name} subtitle={event.description} />}
   >
     <img style={{"height":"400px", "width": "150px"}}
       src={event.img} alt="" />
   </CardMedia>
   <CardTitle title="" subtitle="" />
   <CardText>
     {/* {event.description} */}
   </CardText>
   <CardActions>
     <FlatButton label="previous" />
     <FlatButton label="next" />
   </CardActions>
 </Card>
)

export default Event