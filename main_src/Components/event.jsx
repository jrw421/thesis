import React from 'react';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

const Event = ({ event, handleEventClick }) => (
  <div className="event-space">
  {(event === null || undefined) ? (
  <Card
      onClick={() => {
        handleEventClick(event);
      }}
    >
      <CardMedia
        overlay={<CardTitle title="Nothing" subtitle="so sad" />}
      >
        <img style={{ height: '250px', width: '550px' }} src="http://www.htmlcsscolor.com/preview/gallery/95524C.png" alt="" />
      </CardMedia>
    </Card>
  ) : (
    <div style={{"height": "100px"}}>
    <Card
      onClick={() => {
        handleEventClick(event);
      }}
      >
        <CardMedia
          overlay={<CardTitle title={event.name} subtitle={event.description} />}
          >
            <img style={{ height: '250px', width: '550px' }} src={event.img} alt="" />
          </CardMedia>
        </Card>
      </div>
      )
}

  </div>
);

export default Event;
