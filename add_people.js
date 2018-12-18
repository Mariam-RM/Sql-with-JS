const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: settings
})


//part1

// knex.select('first_name','last_name','birthdate').from('famous_people')
//   .where('first_name', '=', 'Paul')
//   .orWhere('last_name', '=', 'Paul')
//   .asCallback(function(err, rows) {
//     if (err) return console.error(err);
//     console.log(rows);
//   })

//part2

const newEntry = {
  'first_name': process.argv[2],
  'last_name': process.argv[3],
  'birthdate': process.argv[4]
}

knex('famous_people')
  .insert (
    newEntry
   )
  .then(()=> knex.destroy())



knex.select('first_name','last_name','birthdate').from('famous_people')
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log(rows);
  })



// knex.select('name').from('users')
//   .where('id', '>', 20)
//   .andWhere('id', '<', 200)
//   .limit(10)
//   .offset(x)
//   .asCallback(function(err, rows) {
//     if (err) return console.error(err);
//     knex.select('id').from('nicknames')
//       .whereIn('nickname', _.pluck(rows, 'name'))
//       .asCallback(function(err, rows) {
//         if (err) return console.error(err);
//         console.log(rows);
//       });
//   });


//   knex.select('name')
//   .from('users')
//   .where('id', '>', 20)
//   .andWhere('id', '<', 200)
//   .limit(10)
//   .offset(x)
//   .then(function(rows) {
//     return _.pluck(rows, 'name');
//   })
//   .then(function(names) {
//     return knex.select('id').from('nicknames').whereIn('nickname', names);
//   })
//   .then(function(rows) {
//     console.log(rows);
//   })
//   .catch(function(error) {
//     console.error(error)
//   });