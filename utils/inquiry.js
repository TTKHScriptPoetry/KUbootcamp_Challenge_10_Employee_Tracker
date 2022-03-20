const dbConn = require('../db/connection'); 

// function getAllDepartment() {
//     // -- Query Actions  
//     dbConn.query(`SELECT * FROM department`, (err, rows) => { 
//       if (err) {
//          console.log(err.message);
//          return;
//       }
//       else{
//          console.log(rows);
//       }
//    }); 
//   
// }

function getAllDepartment() {
   // -- Query Actions  
    dbConn.promise().query(`SELECT name as Department_Name, id as Department_ID FROM department`)
     .then ( ([rows]) => {
         console.log("\n");
         console.table(rows);
         console.log("\n");
     })
     .catch(console.log)
   //   .then( () => dbConn.end());
};
 
// function getAllRoles01() {
//    // -- Query Actions  
//    dbConn.promise().query(`SELECT role.title as Job_Title, role.id as Role_Id, role.salary as 
//          Salary, name as Department_Name FROM role
//          LEFT JOIN department ON role.id = department.id 
//          GROUP BY role.id DESC`, (err, rows) => { 
//      if (err) {
//         console.log(err.message);
//         return;
//      }
//      else{
//         console.log("\n");
//         console.table(rows);
//      }
//   });  
// }

function getAllRoles(){
   const sqlSelectAll = `SELECT e.title as Job_Title, e.id as Role_Id, d.name as Department_Name, e.salary as Salary  
                        FROM role e LEFT JOIN department d ON d.id = department_id`
                  
   dbConn.query(sqlSelectAll, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("\n");
      console.table(rows);
    });
}

module.exports = { getAllDepartment, getAllRoles };