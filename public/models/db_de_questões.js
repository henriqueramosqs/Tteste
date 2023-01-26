const mysql = require('mysql')


var db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : <password>,
    database        : <database>
  });

module.exports = {
    db
}
