
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


knex.schema.hasTable('user').then(function(exists){
    if (!exists) {
        knex.schema.createTable('user', function(table){
            table.increments('id').primary()
            table.string('name', 100);
            table.string('email', 100);
            table.string('token', 150);
            table.boolean('member_status');
        }).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    }
}).catch((err) => {
    console.log(err)
});


knex.schema.hasTable('event').then(function(exists){
    if (!exists) {
        knex.schema.createTable('event', function(table){
            table.increments('id').primary();
            table.integer('host_id').unsigned().references('id').inTable('user');
            table.string('description', 500);
            table.string('date', 100);
            table.string('location', 100);
        }).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    }
});


knex.schema.hasTable('event_attendee').then(function(exists){
    if (!exists) {
        knex.schema.createTable('event_attendee', function(table){
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('event_id').unsigned().references('id').inTable('event');
        }).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    }
});


knex.schema.hasTable('item').then(function(exists){
    if (!exists) {
        knex.schema.createTable('item', function(table){
            table.increments('id').primary();
            table.string('name', 100);
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('event_id').unsigned().references('id').inTable('event');
        }).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    }
});


const bookshelf = require('bookshelf')(knex);

module.exports = {
    knex,
    bookshelf
};
