import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import { withRouter } from 'react-router';
import { addItems, addRecipients, addEvent } from '../mutations.js'

const CLOUDINARY_UPLOAD_PRESET = 'gvmf858k';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dxhj4dt9i/upload';

const dropzoneStyle = {
  height: '300px',
  width: '300px',
  margin: 'auto',
  textAlign: 'center',
};

const imageStyle = {
  height: '300px',
  width: '300px',
  margin: 'auto',
};

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      date: '',
      time: undefined,
      description: '',
      currentItem: '',
      items: [],
      searchNames: '',
      guestName: '',
      guestEmail: '',
      guests: [],
      uploadedFileCloudinaryUrl: '',
      endTime: '',
      dateTimeStart: '',
      dateTimeEnd: ''
    };

    this.handleItems = this.handleItems.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFileCloudinaryUrl: files[0],
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    const upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
      }
    });
  }

  addGuest() {
    this.setState({
      guests: this.state.guests.concat([
        `${this.state.guestName}*${this.state.guestEmail}`,
      ]),
      guestName: '',
      guestEmail: '',
      searchNames: ''
    });
  }

  handleUpdateSearch(e) {
    this.setState({searchNames: e, guestName: e})
  }

  handleContacts(chosenRequest, index) {
    this.setState({
      guestName: chosenRequest,
      guestEmail: this.props.emails[index]
    })
  }


  submitForm() {
    const images = ['https://pmcvariety.files.wordpress.com/2016/06/the-women-of-hamilton-broadway.jpg?w=1000&h=562&crop=1',
    'https://www.pifemaster.com/wp-content/uploads/jeremy-100.jpg',
    'https://foodal.com/wp-content/uploads/2015/06/Best-Picnic-Basket-Reviews.jpg',
    'http://themocracy.com/wp-content/uploads/2016/12/Parties.jpg',
    'http://i1049.photobucket.com/albums/s394/onesheepishgirl/EmmaMagazineYarnPartyMay7_zpsa09bd3a1.jpg',
    'http://www.sparqvault.com/wp-content/uploads/2012/12/shotski000.jpg',
    'http://www.thebrookeeper.com/wp-content/uploads/2015/12/Formal-Dinner-Party-954x426.jpg']

    if (this.state.name === ''
      || this.state.location === ''
      || this.state.date === ''
      || this.state.time === undefined
      || this.state.description === '') {

      alert('All fields must be entered!')
    } else {
    const { name, location, date, time, description, uploadedFileCloudinaryUrl, endTime, dateTimeStart, dateTimeEnd} = this.state;

    this.props
      .addEvent({
        variables: {
          name,
          host_id: this.props.currentUser.id,
          description,
          location,
          img: uploadedFileCloudinaryUrl || images[Math.floor(Math.random()*images.length)],
          time,
          date,
          endTime
        }
      })
      .then(event => {
        console.log('event, event', event)
        this.props
          .addItems({
            variables: {
              itemNames: this.state.items,
              event_id: event.data.addEvent.id
            }
          })
          .then(() => {
            this.props
              .addRecipients({
                variables: {
                  nameEmail: this.state.guests,
                  event_id: event.data.addEvent.id,
                  id: this.props.currentUser.id,
                  dateTimeStart,
                  dateTimeEnd
                }
              })
              .then(() => {
                // if (this.state.items === [] || this.state.items) {
                this.props.history.push({
                  pathname: '/eventPage',
                  state: { event: event.data.addEvent }
                });
              // }
            })
              .catch(error => console.log(error))
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error));
    }
  }


  handleItems(e) {
    if (e.key === 'Enter') {
      this.setState(
        {
          items: [...this.state.items, this.state.currentItem],
        },
        () => {
          this.setState({
            currentItem: '',
          });
        },
      );
    }
  }

  render() {
    console.log('what is the guest list now ', this.state.guests)
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontFamily: 'Noto Sans',
        }}
      >
        <h1 style={{ height: '100%', width: '100%' }}>CREATE YOUR EVENT</h1>
        <br />

        <div>
          {/* <form onSubmit={this.onSubmit}> */}
          <TextField
            value={this.state.name}
            type="text"
            placeholder="Whatcha gonna call your party?"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <br />
          <br />
          <div style={dropzoneStyle}>
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop}
            >
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
          <br />
          <br />
          <div>
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? (<div />) : (
                <div>
                  <p>{this.state.uploadedFileCloudinaryUrl.name}</p>
                  <img
                    src={this.state.uploadedFileCloudinaryUrl}
                    style={imageStyle}
                    alt="Uploaded img"
                  />
                </div>
              )}
            </div>
          </div>
        <br />
        <br />

        <TextField
          value={this.state.location}
          type="text"
          placeholder="Where's your party at?"
          onChange={e => this.setState({ location: e.target.value })}
        />
        <br />
        <br />

        <AutoComplete
          floatingLabelText="Invite Some Peeps"
          searchText={this.state.searchNames}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.contacts}
          maxSearchResults={5}
          onNewRequest={this.handleContacts}
          onUpdateInput={this.handleUpdateSearch}
        />

        <TextField
          value={this.state.guestEmail}
          type="text"
          placeholder="What is their email?"
          onChange={e => this.setState({ guestEmail: e.target.value })}
        />

        <FlatButton
          label="Add Guest"
          value="Add Guest"
          type="submit"
          onClick={() => {
            this.addGuest();
          }}
          secondary={true}
        />
        <br />
        <br />
        <DateTimePicker
          DatePicker={DatePickerDialog}
          TimePicker={TimePickerDialog}
          // value={this.state.date}
          // type="date"
          placeholder="Pick a day and time"
          onChange={(time) => {
            let year = time.getFullYear()
            let month = ('' + (time.getMonth() + 1)).length === 1 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            let day = ('' + time.getDate()).length === 1 ? '0' + time.getDate() : time.getDate();
            let date = '' + year + month + day

            let hour = time.getHours()
            let minutes = time.getMinutes()
            let clockTime = hour + ':' + minutes

            this.setState({ date: Number(date) })
            this.setState({ time: clockTime  , dateTimeStart: time.toISOString()})
          }
        }
        />

        <br />
        <br />
        <TextField
          value={this.state.description}
          type="text"
          placeholder="Tell people what your party is all about!"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <br />
        <br />
        <TextField
          value={this.state.currentItem}
          type="text"
          placeholder="Whatcha want people to bring?"
          onChange={e => this.setState({ currentItem: e.target.value })}
          onKeyPress={this.handleItems}
        />
        <ul>
          {this.state.items.map(item => {
            return <li>{item}</li>;
          })}
        </ul>
        <br />
        <br />
         <FlatButton
            label="Submit"
            value="Submit"
            type="submit"
            onClick={() => {
              this.submitForm();
            }}
            secondary={true}
          />
      </div>
  </div>

    );
  }
}

const CreateEventWithMutations = compose(
  graphql(addEvent, { name: 'addEvent' }),
  graphql(addItems, { name: 'addItems' }),
  graphql(addRecipients, { name: 'addRecipients' })
)(CreateEvent);




export default withRouter(CreateEventWithMutations);
