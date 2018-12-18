const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var nameToSearch = process.argv[2];

// client.query('select * from famous_people;',
//   function(err, results) {
//       if (err) {
//         console.log("Error", err);
//       } else {
//         console.log(results.rows);
//       }
//         client.end();
//     }
//   );

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT $1::int AS number", ["1"], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].number); //output: 1
//     client.end();
//   });
// });

// regular query:
/* SELECT first_name, last_name, birthdate
    WHERE first_name = 'Paul' OR last_name = 'Paul'
*/

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate FROM famous_people  WHERE first_name=$1 OR last_name=$1 ", [nameToSearch],(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...")
    console.log(result.rows); //output: 1


    client.end();
  });
});


// Searching ...
// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'