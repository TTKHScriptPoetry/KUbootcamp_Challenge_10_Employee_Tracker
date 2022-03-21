const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const VW_DEPT_ALL = "VIEW ALL DEPARTMENTS";
const VW_ROLE_ALL = "VIEW ALL ROLES";
const VW_EMP_ALL = "VIEW ALL EMPLOYEES";
const ADD_DEPT = "ADD A DEPARTMENT";
const ADD_ROLE = "ADD A ROLE";
const ADD_EMP = "ADD AN EMPLOYEE";
const EDIT_EMP_ROLE = "UPDATE AN EMPLOYEE ROLE";
const { getAllDepartment, getAllRoles, getAllEmployees, insertDepartmentOrganic, insertRole, insertEmployee, getAllEmployeesName } = require('./utils/inquiry.js'); 

var options = [];
options.push(VW_DEPT_ALL);
options.push(VW_ROLE_ALL);
options.push(VW_EMP_ALL);
options.push(ADD_DEPT);
options.push(ADD_ROLE);
options.push(ADD_EMP);
options.push(EDIT_EMP_ROLE);
// var employeeFullNames = [];
let deptHall = [];
let roleBlock = [];
let employeeHall = [];

const promptAddEmployee = () => { 
   return  inquirer
     .prompt([
         {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name? (Required)",
            validate: firstnameInput => {
               const atleast5alphachars = /^[a-zA-Z\s]{4,}$/
               if(!atleast5alphachars.test(firstnameInput))
               {
                  console.log(`\n  ( Please provide at least 4 non-numeric and non-special characters only for the first-name input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name? (Required)",
            validate: lastnameInput => {
               const atleast5alphachars = /^[a-zA-Z\s]{4,}$/
               if(!atleast5alphachars.test(lastnameInput))
               {
                  console.log(`\n  ( Please provide at least 4 non-numeric and non-special characters only for the last-name input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'title',
            message: "What is the employee's role? (Required)",
            validate: roleInput => {
               const atleast4alphachars = /^[a-zA-Z\s]{4,}$/
               if(!atleast4alphachars.test(roleInput))
               {
                  console.log(`\n  (at least 4 non-numeric and non-special characters only for the role/title input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager? (Required)",
            validate: (mgrInput) => {
               // [a-zA-Z]{3,} meaning 3 or more ASCII letters, apostrophe, and dot count
               // ^ - start of string // $ - end of string.              
               const atleast3alphachars = /^([a-zA-Z.']{2,}\s[a-zA-Z.']{1,})\s?([a-zA-Z.']{1,})?$/   // Could take in a mid name/ second surname
               if(!atleast3alphachars.test(mgrInput))
               {
                  console.log(`\n  ( Please provide at least: \n   2 non-numeric characters for First Name \n   1 non-numeric character for Last Name  )\n( Apostrophe (') and dot (.) are allowed as special characters )`);
                  return false;               
               } else if (mgrInput.includes("'.") || mgrInput.includes(".'") || mgrInput.includes("..") || mgrInput.includes("''")){
                  console.log(`\n  ( Please provide at least 2 non-numeric characters for the first name )\n  ( Apostrophe (') and dot (.) cannot be adjacent nor consecutive )`);
                  return false; 
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAddEmployee', 
            message: 'Would you like to add another employee?',
            default: false
         }
      ])
     .then(employeeData => {
         var employee = new Employee(employeeData.firstname, employeeData.lastname, employeeData.role_id, employeeData.manager);
         employeeHall.push(employee); 
         // console.log(employeeHall[0]); // prints 
         // console.log('dddddddddddddddddddddddddd');
         // console.log(employeeData.department);
         // console.log('cccccccccccccccccccccccccc');
         // console.log(employeeData.confirmAddEmployee);
         if (employeeData.confirmAddEmployee) {
            // console.log('cccccccccccccccccccccccccc');
            // console.log(employeeData.confirmAddEmployee);
            return promptAddEmployee();
         }
         else {
            // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            // console.log(employeeHall[0].manager);
            for (var i = 0; i < employeeHall.length; i++){
               // console.log('I am in For Loop for ' + employeeHall[i].manager);
               insertEmployee(employeeHall[i], i + 1);
               peekResult();
            }
            
            // // inquirer
            // // .prompt({
            // //    type: 'confirm',
            // //    name: 'confirmWantMenu', 
            // //    message: 'Would you like to go to the Main Menu? [No to End]',
            // //    default: false
            // // })
            // // .then(ansCont => {
            // //    if(ansCont.confirmWantMenu){
            // //       return promtMainMenu(appName = false);
            // //    }
            // //    else{
            // //       // peekResult();
            // //       console.log("Thank you for using Employee Tracker. Goodbye!");
            // //    }
            // // })
         }
      });
}

const promptAddRole = () => { 
   return  inquirer
     .prompt([
         {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role? (Required)',
            validate: roleInput => {
               const atleast3alphachars = /^[a-zA-Z\s]{3,}$/
               if(!atleast3alphachars.test(roleInput))
               {
                  console.log(`\n  ( Please provide at least 3 non-numeric and non-special characters only for the role-name input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role? (Required)',
            validate: salaryInput => {
               const positivedecimal = /^\d+(\.\d{1,2})?$/
               if(!positivedecimal.test(salaryInput))
               {
                  console.log(`\n  ( Please provide numeric decimal only for the salary input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'department',
            message: 'Which department does the role belong to? (Required)',
            validate: deptInput => {
               const atleast5alphachars = /^[a-zA-Z\s]{5,}$/
               if(!atleast5alphachars.test(deptInput))
               {
                  console.log(`\n  ( Please provide at least 5 non-numeric and non-special characters only for the department-name input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAddRole', 
            message: 'Would you like to add another role?',
            default: false
         }
      ])
     .then(roleData => {
         // profileData.teammembers.push(roleData);
         var role = new Role(roleData.title, roleData.salary, roleData.department);
         roleBlock.push(role); 
        
         if (roleData.confirmAddRole) {
            // console.log('cccccccccccccccccccccccccc');
            // console.log(roleData.confirmAddRole);
            return promptAddRole();
         }
         else {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            console.log(roleBlock[0].department);
            for (var i = 0; i < roleBlock.length; i++){
               console.log('I am in For Loop for ' + roleBlock[i].title);
               insertRole(roleBlock[i], i + 1);
            }
            
            // // inquirer
            // // .prompt({
            // //    type: 'confirm',
            // //    name: 'confirmWantMenu', 
            // //    message: 'Would you like to go to the Main Menu? [No to End]',
            // //    default: false
            // // })
            // // .then(ansCont => {
            // //    if(ansCont.confirmWantMenu){
            // //       return promtMainMenu(appName = false);
            // //    }
            // //    else{
            // //       // peekResult();
            // //       console.log("Thank you for using Employee Tracker. Goodbye!");
            // //    }
            // // })
         }
      });
}

const promptAddDepartment = () => { 
   return  inquirer
     .prompt([
         {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department? (Required)',
            validate: departmentInput => {
               const atleast3alphachars =  /^[a-zA-Z0-9\s]{5,}$/ ///^[a-zA-Z\s]{3,}$/
               if(!atleast3alphachars.test(departmentInput))
               {
                  console.log(`\n  (Please provide at least 5 alpha-numeric and non-special characters only for the department-name input )`);
                  return false;               
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAddDept', 
            message: 'Would you like to add another department?',
            default: false
         }
      ])
     .then(deptData => {
         // profileData.teammembers.push(deptData);
         var dept = new Department(deptData.department);
         deptHall.push(dept); 
         // console.log(deptHall[0]); // prints Department { name: 'Security' }
         // console.log('dddddddddddddddddddddddddd');
         // console.log(deptData.department);
         // console.log('cccccccccccccccccccccccccc');
         // console.log(deptData.confirmAddDept);
         if (deptData.confirmAddDept) {
            // console.log('cccccccccccccccccccccccccc');
            // console.log(deptData.confirmAddDept);
            return promptAddDepartment();
         }
         else {
            for (var i = 0; i < deptHall.length; i++){
               // console.log('I am in For Loop for ' + deptHall[i].name);
               // insertDepartment(deptHall[i].name, i + 1);
               insertDepartmentOrganic(deptHall[i].name, i + 1);
            }
            
            inquirer
            .prompt({
               type: 'confirm',
               name: 'confirmWantMenu', 
               message: 'Would you like to go to the Main Menu? [No to End]',
               default: false
            })
            .then(ansCont => {
               if(ansCont.confirmWantMenu){
                  return promtMainMenu(appName = false);
               }
               else{
                  peekResult();
                  console.log("Thank you for using Employee Tracker. Goodbye!");
               }
            })
         }
      });
}

function peekResult(){
   getAllEmployees();
   getAllRoles();
   getAllDepartment();

   // for (var i = 0; i < deptHall.length; i++){
   //    insertDepartment(deptHall[i]);
   // }

   // console.log(roleBlock);  
   // console.log(employeeHall);  
}

const promptEditRolePerEmployee = ({ employeeFullNames }) => {
   return  inquirer
     .prompt([
         {
            type: 'list',
            name: 'fullname',
            message: "Which employee's role do you want to update? ",
            choices: employeeFullNames
         }
         // ,
         // {
         //    type: 'confirm',
         //    name: 'confirmPickAnotherEmployee', 
         //    message: 'Would you like to add another department?',
         //    default: false
         // }
      ])
     .then(empData => {
         var id = empData.fullname.split('-')[0]
         console.log ('extracted id')
         console.log (id)
    
         if (empData.confirmPickAnotherEmployee) {
            // console.log('cccccccccccccccccccccccccc');
            // console.log(empData.confirmPickAnotherEmployee);
            return promptEditRolePerEmployee();
         }
         else {
            for (var i = 0; i < deptHall.length; i++){
               // console.log('I am in For Loop for ' + deptHall[i].name);
               // insertDepartment(deptHall[i].name, i + 1);
               insertDepartmentOrganic(deptHall[i].name, i + 1);
            }
            
            inquirer
            .prompt({
               type: 'confirm',
               name: 'confirmWantMenu', 
               message: 'Would you like to go to the Main Menu? [No to End]',
               default: false
            })
            .then(ansCont => {
               if(ansCont.confirmWantMenu){
                  return promtMainMenu(appName = false);
               }
               else{
                  peekResult();
                  console.log("Thank you for using Employee Tracker. Goodbye!");
               }
            })
         }
      });


}

const promtMainMenu = (appName) => {
   if (appName){
      console.log(`
     .-------------------------------------------------------------------------.
     |                     Welcome to Employee Tracking App                    |
     '-------------------------------------------------------------------------'
      `);
   }
   return inquirer.prompt([
      {
         type: 'list',
         message: 'What would you like to do?',
         name: 'action',
         choices: options
      }
   ])
   .then(({ action }) => {
      // console.log("Action in prompt: " + action);
      // var picked = action; 
      switch (action) {
         case VW_DEPT_ALL:
            getAllDepartment();
            // new Promise(resolve => setTimeout(resolve, 5000));
            inquirer
               .prompt({
                  type: 'confirm',
                  name: 'confirmMenu', 
                  message: 'Would you like to go back to the Main Menu?',
                  default: false
               })
               .then(({ confirmMenu }) => {
                  if (confirmMenu){
                     promtMainMenu(appName = false);
                  }
                  else{
                     console.log("Thank you for using Employee Tracker. Goodbye!");
                  }
                  
               });
            break;
         case VW_ROLE_ALL:
            getAllRoles();
            break;
         case VW_EMP_ALL:
            getAllEmployees();
            break;
         case ADD_DEPT:
            promptAddDepartment();
            break;
         case ADD_ROLE:
            promptAddRole();
            break;
         case ADD_EMP:
            promptAddEmployee();
            break; 
         case EDIT_EMP_ROLE:
            // promptEditEmployeeRole();
            employeeFullNames = getAllEmployeesName();
            // console.log('----------------');
            // console.log(employeeFullNames);
            // // promptEditRolePerEmployee(employeeFullNames);
            break;               
         default:
            promtMainMenu();   
      }
         
   });
   
};

promtMainMenu(appName = true);

 
 