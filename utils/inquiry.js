const dbConn = require('../db/connection'); 
const cTable = require('console.table');

function getAllEmployees() {
  const sqlSelect = `SELECT e.id as 'Employee ID', e.first_name as 'First Name' , e.last_name as 'Last Name',  
                      rl.title as 'Job Title', rl.salary as Salary, e.manager_id as Manager
                      FROM role rl  
                      LEFT JOIN department d ON rl.department_id = d.id
                      LEFT JOIN employee e   ON rl.id = e.role_id
                      ORDER BY e.id ASC`
  // -- Query Actions  
  dbConn.promise().query(sqlSelect)
    .then ( ([rows]) => {
    const table = cTable.getTable(rows);
    console.log("\n");
    console.log(table);
    
  })
    .catch(console.log);
}

function getAllDepartment() {
  // -- Query Actions  
  dbConn.promise().query(`SELECT name as 'Department Name', id as 'Department ID' FROM department`)
    .then ( ([rows]) => {
      const table = cTable.getTable(rows);
      console.log("\n");
      console.log(table);
    })
    .catch(console.log);
}
   
 
function getAllRoles() {
  const sqlSelectAll = `SELECT rl.title as 'Job Title', rl.id as 'Role Id', d.name as 'Department Name', rl.salary as Salary  
                        FROM role rl LEFT JOIN department d ON d.id = department_id`
  // -- Query Actions  
  dbConn.promise().query(sqlSelectAll)
    .then ( ([rows]) => {
    const table = cTable.getTable(rows);
    console.log("\n");
    console.log(table);
    
  })
    .catch(console.log);
}

// // function getAllRoles(){
// //    const sqlSelectAll = `SELECT e.title as 'Job Title', e.id as 'Role Id', d.name as 'Department Name', e.salary as Salary  
// //                         FROM role e LEFT JOIN department d ON d.id = department_id`
// //                   
// //    dbConn.query(sqlSelectAll, (err, rows) => {
// //       if (err) {
// //         console.log(err.message);
// //         return;
// //       }
// //       console.log("\n");
// //       const table = cTable.getTable(rows)
// //       console.log(table);
// //     });
// // }

module.exports = { getAllDepartment, getAllRoles, getAllEmployees };