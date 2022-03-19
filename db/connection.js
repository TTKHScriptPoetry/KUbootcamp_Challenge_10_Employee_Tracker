const mysql = require('mysql2');

// Connect to database
const dbconn = mysql.createConnection(
   {
     host: 'localhost',
     user: 'root',  // Your MySQL username,
     password: 'BietDanhM0i!',  // Your MySQL password
     database: 'companystaff'
   },
   console.log('Connected to the companystaff database.')
 );

 module.exports = dbconn;