const crypto = require('crypto');
const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');
const Event_Attendee = require('../ModelsDB/event_attendee.js');
const nodemailer = require('nodemailer');
const conn = require('../dbConfig.js').conn;
const db = require('../ControllersDB/mainController.js');


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
        
        knex.select('*').from('user').where('member_status', null).andWhere('email', email)
        .then(oldUser => {

          const newUser = new User({
            name: name,
            hash: id,
            member_status: oldUser.length ? oldUser[0].id : 0,
            email: email,
            guest_event_id: event_id
          }).save().then(user => {

          let idx = oldUser.length ? oldUser[0].id : user.attributes.id
       
          db.event_attendee.add({user: idx, event: event_id}, function(err, res){
            if(err){
              return err
            }
            })
          }).catch(err => err)
        }).catch(err => err)

        return id;
      }
    }).catch(err => err)
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

//args.dateTimeStart, args.dateTimeEnd
const sendMessage = function(recipients, account, event_id, cb) {
  recipients.forEach(async guest => {
    var id = await generateID(event_id, guest[0], guest[1]);

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
        cb(error, null)
      } else if (mailOptions.to === `${recipients[recipients.length - 1][0]} <${recipients[recipients.length - 1][1]}>`){
        knex
        .select('*')
        .from('event')
        .where('id', event_id)
        .then(x => {
          cb(null, x[0])
        })
        .catch(err => {
          cb(err, null)
        });
      }
    });
  });
  if (!recipients.length){
    knex
      .select('*')
      .from('event')
      .where('id', event_id)
      .then(x => {
        cb(null, x[0])
      })
      .catch(err => {
        cb(err, null)
      });
  }
};

module.exports = { generateID, transporter, sendMessage };


