import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios'


import Dropzone from 'react-dropzone';
import request from 'superagent';
import { withRouter } from 'react-router';

const CLOUDINARY_UPLOAD_PRESET = 'gvmf858k';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxhj4dt9i/upload';

const dropzoneStyle = {
  height: '300px',
  width: '300px',
  margin: 'auto',
  textAlign: 'center'
}

const imageStyle = {
  height: '300px',
  width: '300px',
  margin: 'auto'
}



class createEvent extends React.Component {
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
      guestName: '',
      guests: [],
      hostId: 1,
      uploadedFileCloudinaryUrl: ''
    }



    //this.onChange = this.onChange.bind(this)
    this.handleItems = this.handleItems.bind(this)
    //this.onSubmit = this.onSubmit(this)
    this.submitForm = this.submitForm.bind(this)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });


  }

  submitForm = () => {
    const {  eventTitle, location, date, time, description } = this.state
    this.props.addEvent({
      variables: {
        name: this.state.name,
        host_id: this.props.currentUser.id,
        description: this.state.description,
        location: this.state.location,
        img: this.state.uploadedFileCloudinaryUrl
      }
    })
    .then((event) =>{
      this.props.addRecipients({
        variables: {
          nameEmail: this.state.guests,
          event_id: event.data.addEvent.id, 
          user_id: this.props.currentUser.id
        }
      })
    })
    .then(event => {
      this.props.history.push({
        pathname: '/eventPage',
        state: { event: event.data }
      })
    })
    .catch((error) => error)
  }
  
  onClick() {
    submitEvent(e)
  }

  handleItems (e) {
    if (e.key === 'Enter') {
      this.setState({
        items: [...this.state.items, this.state.currentItem]
      }, () => {
        this.setState({
          currentItem: ''
        })
      })
    }
  }

  render() {
    return (
      <div style={{"textAlign":"center", "marginTop": "20px"}}>
        <h1 style={{"height": "100%", "width": "100%"}}>CREATE YOUR EVENT</h1>
        <br></br>

        <div>
        {/* <form onSubmit={this.onSubmit}> */}
        <TextField value={this.state.name} type="text" placeholder="Whatcha gonna call your party?" onChange={e => this.setState({ event: e.target.value })}/>
        <br></br>
        <br></br>
        <div style={dropzoneStyle}>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
            >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <br></br>
        <br></br>
        <div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div >
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} style={imageStyle}/>
            </div>}
          </div>
        </div>
        <br></br>
        <br></br>
        <TextField value={this.state.location} type="text" placeholder="Where's your party at?" onChange={e => this.setState({ location: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.guests.names} type="text" placeholder="Who do you not hate?" onChange={e => this.setState({ guestName: e.target.value })}/>
        <TextField value={this.state.guests.emails} type="text" placeholder="What is their email?" onSubmit={e => this.setState({ guests: this.state.guests.concat([e.target.value + '*' + this.state.guestName])})}/>
        <br></br>
        <br></br>
        <TextField value={this.state.date} type="date" placeholder="What day?" onChange={e => this.setState({ date: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.time} type="time" placeholder="What time?" onChange={e => this.setState({ time: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField value={this.state.description} type="text" placeholder="Tell people what your party is all about!" onChange={e => this.setState({ description: e.target.value })}/>
        <br></br>
        <br></br>
        <TextField 
          value={this.state.currentItem} 
          type="text" 
          placeholder="Whatcha want people to bring?" 
          onChange={e => this.setState({ currentItem: e.target.value })}
          onKeyPress={this.handleItems}
        />
        <ul>
          {this.state.items.map(item => {
            return <li>{item}</li>
          })}
        </ul>
        <br></br>
        <br></br>


        <FlatButton 
          label="Submit" 
          value="Submit" 
          type="submit" 
          onClick={() => {this.submitForm()}}
          secondary={true} />


          </div>

      </div>
    )
  }

}



const addEvent = gql`
mutation AddEvent($name: String!, $host_id: ID!, $description: String!, $location: String!, $img: String!){
  addEvent(name: $name, host_id: $host_id, description: $description, location: $location, img: $img) {
    name
    host_id
    description
    location
    img
  }
}`


const addRecipients = gql ` AddRecipients($nameEmail: [String]!,  $event_id: Int, $id: Int){
  addRecipients(nameEmail: $nameEmail, event_id: $event_id, id: $id){
    name
  }
}
`


let createEventWithData = compose(
  graphql(addEvent, {name: 'addEvent'}),
  graphql(addRecipients, {name: 'addEvent'}))(createEvent)

export default withRouter(createEventWithData)
