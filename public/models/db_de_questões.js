const mysql = require('mysql')
// const db = mysql.createConnection({
//     host:"sql131.main-hosting.eu",
//     user:"u659347430_henrique3107",
//     password:"Megareaper3107!",
//     database:"u659347430_questoes"
// })

var db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'sql131.main-hosting.eu',
    user            : 'u659347430_henrique3107',
    password        : 'Megareaper3107!',
    database        : 'u659347430_questoes'
  });

module.exports = {
    db
}