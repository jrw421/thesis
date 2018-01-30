
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('user').del(),
    knex('event').del(),


   knex('user').insert([
      {id: 1, name: 'Caio Roper', email: 'caio@caio.com', token: '1234', member_status: 1},
      {id: 2, name: 'Madison Croker', email: 'madison@madison.com', token: '234234', member_status: 1},
      {id: 3, name: 'Evan Baker', email: 'evan@peacecorps.com', token: '234234', member_status: 1}
    ]),

   knex('event').insert([
      {id: 1, host_id: 1, name: 'My Birthday Party', description: 'Come to my birthday please', date: 2018025, location: '23 Orchard Street'},
      {id: 2, host_id: 2, name: 'Bar Mitzvah', description: 'Yeah, Hi', date: 2018031, location: '8 Pine Road'},
      {id: 3, host_id: 3, name: 'Dance Night', description: 'Its Friday guys', date: 2018028, location: '23 Wall Street, New York, New York'}
    ]),

   knex('event_attendee').insert([
      {id: 1, event_id: 1, user_id: 1, reply: 1},
      {id: 2, event_id: 1, user_id: 2, reply: 1},
      {id: 3, event_id: 2, user_id: 1, reply: 0},
      {id: 4, event_id: 2, user_id: 3, reply: 1}
    ]),

   knex('item').insert([
      {id: 1, name: 'pretzels', user_id: 1,  event_id: 1}, 
      {id: 2, name: 'bananas', user_id: 1,  event_id: 1}, 
      {id: 3, name: 'pb', user_id: 2,  event_id: 1}, 
      {id: 4, name: 'soy milk', user_id: 2,  event_id: 1},
      {id: 5, name: 'jelly', user_id: 3,  event_id: 2},
      {id: 6, name: 'cuties', user_id: 3,  event_id: 2}
    ])
  );
};
