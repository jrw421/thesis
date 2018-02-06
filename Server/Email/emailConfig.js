const crypto = require('crypto');
const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');
const Event_Attendee = require('../ModelsDB/event_attendee.js');
const nodemailer = require('nodemailer');


const generateID = function(event_id, name, email) {
  let id = crypto.randomBytes(20).toString('hex');
  return knex
    .select('*')
    .from('user')
    .where('id', id)
    .then(data => {
      if (data.length) {
        generateID(event_id, name, email);
      } else {
        const newUser = new User({
          name: name,
          hash: id,
          member_status: 0,
          email: email,
          guest_event_id: event_id
        }).save().then(async user => {

          let oldUser = await knex.select('*').from('user').where('email', user.attributes.email).andWhere('member_status', 1)
          let idx = oldUser.length ? oldUser[0].id : user.attributes.id
          let newEventAttendee = new Event_Attendee({
            user_id: idx,
            event_id: event_id, 
            reply: 2
          });

          newEventAttendee.save().then(x => console.log('newPair', x)).catch(x => console.log('errorPair', x))
      
        });
        console.log('before return email id', id)
        return id;
      }
    });
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    type: 'OAuth2',
    clientId:
      '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
    clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
  }
});

const sendMessage = function(recipients, account, event_id) {
  recipients.forEach(async guest => {
    var id = await generateID(event_id, guest[0], guest[1]);
    console.log('after await email id', id)
    let mailOptions = {
      from: `${account.name} <${account.email}>`,
      to: `${guest[0]} <${guest[1]}>`,
      subject: `${account.name} just invited you to their event!`,
      html: `<span>Hey ${
        guest[0]
      }, click <a href="http://localhost:4000/eventPage/${id}">here</a> to check out the event page!</span>`,
      auth: {
        user: account.email,
        accessToken: account.accessToken
      }
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('send mail error', error);
      } else {
        console.log('Message sent. Response Info:  ', info);
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return knex
        .select('*')
        .from('event')
        .where('id', event_id)
        .then(x => x[0]);
    });
  });
};

module.exports = { generateID, transporter, sendMessage };
