const knex = require('knex')({
    client: 'mysql',
    connect: {
        host: 'thesis.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
        user: 'thesis',
        password: 'thesis12345',
        port: '3307',
        database: 'thesis'
    }
})

const bookshelf = require('bookshelf')(knex);

module.exports = {
    knex: knex,
    bookshelf: bookshelf
}

