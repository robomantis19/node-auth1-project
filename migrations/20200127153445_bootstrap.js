
exports.up = function(knex) {
  return knex.schema.createTable('user', user => { 
      user.increments();


      user
      .string('uname', 128)
      .notNullable()
      .unique();
      user.string('pass', 128).notNullable();
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('user');
};
