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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate FROM famous_people  WHERE first_name=$1 OR last_name=$1 ", [nameToSearch],(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...");
    console.log("Found " + result.rows.length + " person(s) by the name " + nameToSearch);

    for (var i = 0; i < result.rows.length; i++){
      var id = Number([i]) + 1 ;
      var first = result.rows[i].first_name;
      var last = result.rows[i].last_name;
      var birthday = result.rows[i].birthdate;

      console.log("- " + id + ": " + first + " " + last + ", born " + birthday.toDateString())
    }

    client.end();
  });
});
