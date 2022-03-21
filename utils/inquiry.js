const dbConn = require('../db/connection'); 
const cTable = require('console.table');

function getAllEmployees() {
  const sqlSelect = `SELECT e.id as 'Employee ID', e.first_name as 'First Name', e.last_name as 'Last Name', 
                      rl.title as 'Job Title', d.name AS Department, rl.salary as Salary,
                      CONCAT(mgr.first_name, ' ', mgr.last_name) AS Manager
                      FROM employee e 
                        LEFT JOIN employee mgr ON mgr.id = e.manager_id    
                        JOIN role rl ON e.role_id = rl.id
                        JOIN department d ON rl.department_id = d.id
                      ORDER BY e.id;`
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

//|||||||||||||||||||||||||||||||||||||||| INSERT / UPDATE ||||||||||||||||||||||||||||||||||||||||||||||
// Ready to make a insert operation per department id
function insertEmployeeOnTheFly(firstname, lastname, role_id, mgrId, element){
  const sqlInsertEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
  const params = [firstname, lastname, role_id, mgrId];
  dbConn.query(sqlInsertEmp, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    if (result.affectedRows >=1 ){
      // console.log("Role created on the fly");
      if (element % 2 == 0){
        console.log(`  >> Added ${firstname} ${lastname} to the database`); 
      }
      else{
        console.log(`\n  >> Added ${firstname} ${lastname} to the database`); 
      }
    }
  });
}


function insertEmployeeMrgContingent(targetEmp, element){
  // console.log('I am in insertMgrDepartment')
  var first = targetEmp.manager.split(' ')[0];
  var last  = targetEmp.manager.split(' ')[1];
  const sqlInsertDept = `INSERT INTO employee (first_name, last_name) VALUES (?,?);` //want manager_id extracted
  const params = [first, last];
   
  dbConn.query(sqlInsertDept, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // console.log('sssssssssssddddddddddddddddd')
    // console.log(result.insertId); // will be back
    if (result.affectedRows >= 1){
     
      if (element % 2 == 0){
        // console.log(`  >> Added ${targetEmp.firstname} ${targetEmp.lastname} to the database`);
        console.log(`  >> Added ${first} ${last} to the database`);  
      }
      else{
        console.log(`\n  >> Added ${first} ${last} to the database`); 
      }
      // -- create the new employee (mgr kind) now
      insertEmployeeOnTheFly(targetEmp.firstname, targetEmp.lastname, targetEmp.role_id, parseInt(result.insertId), element);
    }  
  });
  
}  

function insertEmployee(targetEmp, element){
  // -- query checking existance
  var first = targetEmp.manager.split(' ')[0];
  var last  = targetEmp.manager.split(' ')[1];
  // console.log(first + " " + last);
  const deptSelectOne = `SELECT id, first_name, last_name, role_id, manager_id
                        FROM employee WHERE first_name = ? and last_name = ?`                        
  const paramsSelectOne = [first, last];
  
  dbConn.query(deptSelectOne, paramsSelectOne, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // // console.log('iiiiiiiiiisssssssssssssssrrrrrrrrrrrrrrrr');
    // // console.log(rows) // will print []  
    // // console.log('lllllllllllllllllllllllllllllllllllllllll');
    // // console.log(rows.length)

    // if there is such manager with given name, create new record for manager  
    if (parseInt(rows.length) == 0 ){  
      // -- must create manager record if manager is new()
      // console.log(targetEmp.firstname + ' * ' + targetEmp.lastname + " * " + targetEmp.role_id + "*" + targetEmp.manager);
      insertEmployeeMrgContingent(targetEmp, 1 );
    }
    else{
      // there exists one resulted row
      // // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm');
      // // console.log(rows[0].id);
      var mgrId = parseInt(rows[0].id); // extract existing department id
      insertEmployeeOnTheFly(targetEmp.firstname, targetEmp.lastname, targetEmp.role_id, mgrId, element)
       
    }
   
 });
 
}

function insertDepartmentOrganic(dept_name, element){
  const sqlInsertDept = `INSERT INTO department (name) VALUES (?);`
  // const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
  // const params = [body.first_name, body.last_name, body.industry_connected];
  const params = [dept_name];
   
  dbConn.query(sqlInsertDept, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return 0;
    }
    // console.log(result.insertId); // will be back
    if (result.affectedRows >= 1){
      if (element % 2 == 0){
        console.log(`  >> Added ${dept_name} to the database`); 
      }
      else{
        console.log(`\n  >> Added ${dept_name} to the database`); 
      }
      // console.log('The newly created department id per insertion: ' + result.insertId)      
    }    
  });
}

function insertDepartmentRoleContingent(targetRole, element){
  console.log('I am in insertDepartment')
  const sqlInsertDept = `INSERT INTO department (name) VALUES (?);`
  const params = [targetRole.department];
   
  dbConn.query(sqlInsertDept, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // console.log('sssssssssssddddddddddddddddd')
    // console.log(result.insertId); // will be back
    if (result.affectedRows >= 1){
      // console.log('The newly created department id per insertion: ' + result.insertId)
      
      if (element % 2 == 0){
        console.log(`  >> Added ${targetRole.department} to the database`); 
      }
      else{
        console.log(`\n  >> Added ${targetRole.department} to the database`); 
      }
      // -- create the new role now
      insertRoleOnTheFly(targetRole.title, targetRole.salary, parseInt(result.insertId), element);
    }  
  });
  
} // end of insertDepartment(dept_name, element)

// Ready to make a insert operation per department id
function insertRoleOnTheFly(title, salary, deptId, element){
  const sqlInsertRole = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`
  const params = [title, salary, deptId];
  dbConn.query(sqlInsertRole, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    if (result.affectedRows >=1 ){
      // console.log("Role created on the fly");
      if (element % 2 == 0){
        console.log(`  >> Added ${title} to the database`); 
      }
      else{
        console.log(`\n  >> Added ${title} to the database`); 
      }
    }
  });
}

// Make an implicit insertion via department name breakdown
function insertRole(targetRole, element){
  const deptSelectOne = `SELECT name, id FROM department WHERE name = ?`
  const paramsSelectOne = targetRole.department
  // var insertId = '';
  // -- Query Actions  -- console.log(rows); // prints [ { name: 'Finance' } ] or [] if no record returned
  dbConn.query(deptSelectOne, paramsSelectOne, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log('iiiiiiiiiisssssssssssssssrrrrrrrrrrrrrrrr');
    console.log(rows) // will print [] if department is new
    console.log('lllllllllllllllllllllllllllllllllllllllll');
    console.log(rows.length)
    // if there is no department match
    if (parseInt(rows.length) == 0 ){  
      // -- create department
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzztttttttttttt');
      // -- call insertDepartment()
      console.log(targetRole.title + ' * ' + targetRole.salary + " * " + targetRole.department);
      insertDepartmentRoleContingent(targetRole, 1 );
      // insertId = insertDepartment(targetRole, 1);
      // console.log('cccccccccccccccccccccccccccccccc');
      // console.log(insertId);
      // insertRoleOnTheFly(title, salary, insertId, element);
    }
    else{
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm');
      console.log(rows[0].id);
      var deptId = parseInt(rows[0].id); // extract existing department id
      insertRoleOnTheFly(targetRole.title, targetRole.salary, deptId, element)
      // insertRoleOnTheFly(title, salary, deptId, element);
    }
   
 });
 
}



 // // const sqlInsertRole = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`
  // // const params = [title, salary, department];
  // // dbConn.query(sqlInsertRole, params, (err, result) => {
  // //   if (err) {
  // //     console.log(err.message);
  // //     return;
  // //   }
  // //   if (element % 2 == 0){
  // //     console.log(`  >> Added ${title} to the database`); 
  // //   }
  // //   else{
  // //     console.log(`\n  >> Added ${title} to the database`); 
  // //   }
  // // });

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

module.exports = { getAllDepartment, getAllRoles, getAllEmployees, insertDepartmentOrganic, insertRole, insertEmployee };

