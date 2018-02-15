import React from 'react';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

const Event = ({ event, handleEventClick }) => (
  <div>
  {(event === null) ? (
  <Card
      onClick={() => {
        handleEventClick(event);
      }}
    >
      <CardMedia
        overlay={<CardTitle title="Nothing" subtitle="so sad" />}
      >
        <img src="http://www.htmlcsscolor.com/preview/gallery/95524C.png" alt="" />
      </CardMedia>
    </Card>
  ) : (

    <Card
      onClick={() => {
        handleEventClick(event);
      }}
      >
        <CardMedia
          overlay={<CardTitle title={event.name} subtitle={event.description} />}
          >
            <img src={event.img} alt="" />
          </CardMedia>
        </Card>
      )
}

  </div>
);

export default Event;
