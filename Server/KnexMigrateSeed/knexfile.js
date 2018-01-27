// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
      host: 'thesis.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
      port: '3307',
      user: 'thesis',
      password: 'thesis12345',
      database: 'thesis'
  },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    
};
