const inquirer = require('inquirer');
const VW_DEPT_ALL = "VIEW ALL DEPARTMENTS";
const VW_ROLE_ALL = "VIEW ALL ROLES";
const VW_EMP_ALL = "VIEW ALL EMPLOYEES";
const ADD_DEPT = "ADD A DEPARTMENT";
const ADD_ROLE = "ADD A ROLE";
const ADD_EMP = "ADD AN EMPLOYEE";
const EDIT_EMP_ROLE = "UPDATE AN EMPLOYEE ROLE";
const db = require('./db/connection'); 

var options = [];
options.push(VW_DEPT_ALL);
options.push(VW_ROLE_ALL);
options.push(VW_EMP_ALL);
options.push(ADD_DEPT);
options.push(ADD_ROLE);
options.push(ADD_EMP);
options.push(EDIT_EMP_ROLE);
var mainAction = '';

const promtMainMenu = () => {
   console.log(`
  .-------------------------------------------------------------------------.
  |                     Welcome to Employee Tracking App                    |
  '-------------------------------------------------------------------------'
   `);
   
   return inquirer.prompt([
      {
         type: 'list',
         message: 'What would you like to do?',
         name: 'action',
         // choices: [VW_DEPT_ALL, VW_ROLE_ALL, VW_EMP_ALL, ADD_DEPT, ADD_ROLE, ADD_EMP, EDIT_EMP_ROLE]
         choices: options
      } 
       
   ])
   .then(({ action }) => {
      console.log("Action in prompt: " + action);
      mainAction = action;
      return mainAction;
   });
};

promtMainMenu()
   .then(action => {
      console.log("Action value: " + action);
      if (action === VW_DEPT_ALL){
         // prompEngrTeamMember();  
         console.log("------------------------");
         console.log("VW_DEPT_ALL = " + action);
      }
      else {
         console.log("Expect behavior: " + "everything else");
         // prompInternTeamMember();
      }
     
   })
   .catch(err => {
      // Prompt couldn't be rendered in the current environment
      if (err.isTtyError) 
      {
         console.log("Your console environment is not supported!")
      } else {
         console.log(err)
      }
   });

// // //  // -- Query Actions - Testing purpose only
// db.query(`SELECT * FROM department`, (err, rows) => {  
//    console.log(rows);
// }); 
// 
// // GET a single department -- If there are no errors, the err response returns as null
// db.query(`SELECT * FROM department WHERE id = ?`, 11, (err, row) => {
//    if (err) {
//      console.log(err);
//    }
//    console.log(row);
//  });

