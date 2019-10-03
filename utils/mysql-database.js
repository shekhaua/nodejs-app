const mysql = require('mysql2');


// todo: remove this
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs_training',
  password: '',
  port : 3306
});

module.exports = pool.promise();