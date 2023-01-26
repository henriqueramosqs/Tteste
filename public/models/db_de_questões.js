const mysql = require('mysql')


var db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'megareaper3107',
    database        : 'questoes'
  });

module.exports = {
    db
}
