
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTableIfNotExists('user', function(table) {
      table.increments('id').primary()
      table.string('name', 100);
      table.string('img', 150);
      table.string('google_id', 150);
      table.string('etag', 300);
      table.string('email', 100);
      table.integer('member_status');
      table.string('cookie', 300);
  }),

  // { name: data.displayName, image: data.image.url, id: data.id, etag: data.etag }

  knex.schema.createTableIfNotExists('event', function(table){
    table.increments('id').primary();
    table.integer('host_id');
    table.string('name');
    table.string('description', 500);
    table.integer('date', 8);
    table.string('location', 100);
    table.string('img', 200);
  }),

  knex.schema.createTableIfNotExists('event_attendee', function(table){
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('event_id');
    table.integer('reply')
  }),

  knex.schema.createTableIfNotExists('item', function(table){
    table.increments('id').primary();
    table.string('name', 100);
    table.integer('user_id');
    table.integer('event_id');
  }),

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('event'),
    knex.schema.dropTable('event_attendee'),
    knex.schema.dropTable('item')
   ])
};
