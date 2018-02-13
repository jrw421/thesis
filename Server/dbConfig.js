const mysql = require ('mysql')
const conn = mysql.createConnection({
    host: 'thesis.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
    user: 'thesis',
    port: '3307',
    password: 'thesis12345',
    database: 'thesis'
})

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'thesis.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
    port: '3307',
    user: 'thesis',
    password: 'thesis12345',
    database: 'thesis'
  }
});

knex.schema
  .hasTable('user')
  .then(function(exists) {
    if (!exists) {
      knex.schema
        .createTable('user', function(table) {
          table.increments('id').primary();
          table.string('name', 100);
          table.string('email', 100);
          table.string('img', 150);
          table.string('google_id', 150);
          table.integer('member_status');
          table.string('accessToken', 200);
          table.string('hash', 200);
          table.integer('guest_event_id');
          table.integer('lastEvent');
          table.string('refreshToken', 200)
          table.string('subscription', 500);
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
  .catch(err => {
    console.log(err);
  });

knex.schema.hasTable('event').then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable('event', function(table) {
        table.increments('id').primary();
        table.integer('host_id');
        table.string('img', 150);
        table.string('description', 500);
        table.string('name', 500);
        table.integer('date', 8);
        table.string('location', 100);
        table.string('dateTimeStart', 25);
        table.string('time', 20);
        table.string('endTime', 20);
        table.string('dateTimeEnd', 25);
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

knex.schema.hasTable('event_attendee').then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable('event_attendee', function(table) {
        table.increments('id').primary();
        table.integer('reply');
        table.integer('user_id');
        table.integer('event_id');
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

knex.schema.hasTable('item').then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable('item', function(table) {
        table.increments('id').primary();
        table.string('name', 100);
        table.integer('user_id');
        table.integer('event_id');
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

knex.schema.hasTable('itemComments').then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable('itemComments', function(table) {
        table.increments('id').primary();
        table.string('content', 255);
        table.integer('user_id');
        table.integer('event_id');
        table.integer('item_id');
        table.integer('likes');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

knex.schema.hasTable('votes').then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable('votes', function(table) {
        table.increments('id').primary();
        table.integer('item_id');
        table.integer('user_id');
        table.integer('vote');
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
  }
})

const bookshelf = require('bookshelf')(knex);

module.exports = {
  knex,
  bookshelf, 
  conn
};


