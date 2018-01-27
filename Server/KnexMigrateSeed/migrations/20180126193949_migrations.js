
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTableIfNotExists('user', function(table) {
      table.increments('id').primary()
      table.string('name', 100);
      table.string('email', 100);
      table.string('token', 150);
      table.boolean('member_status');
  }),
  
  knex.schema.createTableIfNotExists('event', function(table){
    table.increments('id').primary();
    table.integer('host_id');
    table.string('name');
    table.string('description', 500);
    table.string('date', 100);
    table.string('location', 100);
    table.string('image', 200);

    // table.foreign('host_id').references('id').inTable('user');
  }),
  
  knex.schema.createTableIfNotExists('event_attendee', function(table){
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('event_id');

    // table.foreign('user_id').references('user.id');
    // table.foreign('event_id').references('id').inTable('event')
  }),
  
  knex.schema.createTableIfNotExists('item', function(table){
    table.increments('id').primary();
    table.string('name', 100);
    table.integer('user_id');
    table.integer('event_id');

    // table.foreign('user_id').references('user.id');
    // table.foreign('event_id').references('event.id');

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
