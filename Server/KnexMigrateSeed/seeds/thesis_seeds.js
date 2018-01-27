
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
        {id: 1, host_id: 1, name: 'My Birthday Party', description: 'Come to my birthday please', date: '02-13-2017', location: '23 Orchard Street'},
        {id: 2, host_id: 2, name: 'Bar Mitzvah', description: 'Yeah, Hi', date: '04-16-2018', location: '8 Pine Road'},
        {id: 3, host_id: 3, name: 'Dance Night', description: 'Its Friday guys', date: '08-19-2018', location: '23 Wall Street, New York, New York'}
      ])
    );
};
