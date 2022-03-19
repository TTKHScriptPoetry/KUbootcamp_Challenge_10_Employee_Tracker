const express = require('express');
const db = require('./db/connection');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // pivot point
// app.use('/api', apiRoutes);

 
// //  // -- Query Actions - Testing purpose only
db.query(`SELECT * FROM department`, (err, rows) => {  
   console.log(rows);
}); 
// // 
// // // GET a single department -- If there are no errors, the err response returns as null
// // db.query(`SELECT * FROM department WHERE id = ?`, 1, (err, row) => {
// //    if (err) {
// //      console.log(err);
// //    }
// //    console.log(row);
// //  });
// // 

app.use((req, res) => {
   res.status(404).end();
 });

// This will start the Express.js server on port 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });

// // Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// Out put in order:
// Connected to the election database.
// Server running on port 3001
// Example app listening at http://localhost:3001/ 