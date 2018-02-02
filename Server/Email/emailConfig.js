const crypto = require('crypto')
const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')
const nodemailer = require('nodemailer');

const generateID = function(eventId){
	let id = crypto.randomBytes(20).toString('hex')
	return knex.select('*').from('user').where('id', id).then((data) => {
		if(data.length){
			generateID()
		} else {
			const newUser = new User({
						hash: id,
						member_status: 0, 
						guest_event_id: eventId
					})
					.save()	
			return id
		}
	})	
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
    		type: 'OAuth2',
        clientId: '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
				clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
    }
});

let acc = {
	name: 'Christine Mourani', 
	email: 'christinemourani@gmail.com', 
	accessToken: 'ya29.GltVBclcSHK--wsUhoOrVbcWddkaD0pac85hZAgjfn2e3cw9Wqz4liREkFFlBT9bRQx1mVC5A1L5tK51qLFgcYp7ijg3PdLtZqcY_T61xnudJxHjeC6YmDC2m6rh'
}

let rec = ['cmourani12@yahoo.com']

const sendMessage = function(recipients, account, event_id){
	recipients.forEach(async email => {
		var id = await generateID(event_id)
		console.log('generated', id)
		let mailOptions = {
      from: `${account.name} <${account.email}>`, 
      to: email, 
      subject: `${account.name} just invited you to their event!`, 
      html: `<span>Click <a href="http://localhost:4000/dashboard/${id}">here</a> to check out the event page!</span>`,
      auth: {
      	user: account.email, 
      	accessToken: account.accessToken,
  			refreshToken: account.refreshToken, 
      }
  	};
		
		transporter.sendMail(mailOptions, (error, info) => {
	      if (error) {
	        return console.log('send mail error', error);
	      }
	      console.log('Message sent. Response Info:  ', info);
	  });
	})
}

sendMessage(rec, acc, 1)
