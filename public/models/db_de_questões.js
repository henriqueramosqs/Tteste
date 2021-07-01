const mysql = require('mysql')


var db  = mysql.createPool({
    connectionLimit : 10,
    host            : '<host>',
    user            : '<user>',
    password        : '<password>',
    database        : '<database>'
  });

module.exports = {
    db
}
