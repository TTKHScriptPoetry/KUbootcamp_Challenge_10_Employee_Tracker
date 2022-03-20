const inquirer = require('inquirer');
const Department = require('./lib/Department');
const VW_DEPT_ALL = "VIEW ALL DEPARTMENTS";
const VW_ROLE_ALL = "VIEW ALL ROLES";
const VW_EMP_ALL = "VIEW ALL EMPLOYEES";
const ADD_DEPT = "ADD A DEPARTMENT";
const ADD_ROLE = "ADD A ROLE";
const ADD_EMP = "ADD AN EMPLOYEE";
const EDIT_EMP_ROLE = "UPDATE AN EMPLOYEE ROLE";
const { getAllDepartment, getAllRoles } = require('./utils/inquiry.js'); 

var options = [];
options.push(VW_DEPT_ALL);
options.push(VW_ROLE_ALL);
options.push(VW_EMP_ALL);
options.push(ADD_DEPT);
options.push(ADD_ROLE);
options.push(ADD_EMP);
options.push(EDIT_EMP_ROLE);
var mainAction = '';

const prompEngrTeamMember = () => { 
   // // if (!profileData.teammembers) {
   // //    profileData.teammembers = [];
   // // }
   return  inquirer
     .prompt([
         {
            type: 'confirm',
            name: 'confirmAddMember', 
            message: 'Would you like to go back to the Main Menu?',
            default: false
         }
      ])
     .then(engrMemberData => {
         // // profileData.teammembers.push(engrMemberData);
         // var engineer = new Engineer(engrMemberData.name, engrMemberData.id, engrMemberData.email, engrMemberData.github);
         // engineerTeam.push(engineer);
         if (engrMemberData.confirmAddMember) {
            // return prompEngrTeamMember(profileData);
            promtMainMenu();
         }
         else {
            console.log("The End");
            // inquirer
            // .prompt({
            //    type: 'confirm',
            //    name: 'confirmWantIntern', 
            //    message: 'Would you like to add an Intern Team Member? [No to End]',
            //    default: false
            // })
            // .then(ansCont => {
            //    if(ansCont.confirmWantIntern){
            //       return prompInternTeamMember(profileData);
            //    }
            //    else{
            //       peekResult();
            //    }
            // })
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
            // // inquirer
            // //    .prompt({
            // //       type: 'confirm',
            // //       name: 'confirmMenu', 
            // //       message: 'Would you like to go back to the Main Menu?',
            // //       default: false
            // //    })
            // //    .then(({ confirmMenu }) => {
            // //       this.promtMainMenu(appName = false);
            // //    });
            break;
         case VW_ROLE_ALL:
            getAllRoles();
            break;
         default:
            promtMainMenu();   
      }
         
   });
};

promtMainMenu();

// const promtMainMenu01 = () => {
// //    console.log(`
// //   .-------------------------------------------------------------------------.
// //   |                     Welcome to Employee Tracking App                    |
// //   '-------------------------------------------------------------------------'
// //    `);
//    
//    return inquirer.prompt([
//       {
//          type: 'list',
//          message: 'What would you like to do?',
//          name: 'action',
//          // choices: [VW_DEPT_ALL, VW_ROLE_ALL, VW_EMP_ALL, ADD_DEPT, ADD_ROLE, ADD_EMP, EDIT_EMP_ROLE]
//          choices: options
//       }
//    ])
//    .then(({ action }) => {
//       console.log("Action in prompt: " + action);
//       mainAction = action;
//       return mainAction;
//          
//    });
// };   

// promtMainMenu01()
//    .then(action => {
//       // console.log("Action value: " + mainAction.action);
//       // console.log("mainmenu value: " + mainAction.mainmenu);
//       var picked = action; 
//       switch (picked) {
//          case VW_DEPT_ALL:
//             getAllDepartment();
//             inquirer
//                .prompt({
//                   type: 'confirm',
//                   name: 'confirmMenu', 
//                   message: 'Would you like to go back to the Main Menu?',
//                   default: false
//                })
//                .then(({ confirmMenu }) => {
//                   this.checkEndOfBattle();
//                });
//             break;
//          case VW_ROLE_ALL:
//             getAllRoles();
//             break;
//          default:
//             promtMainMenu();   
//       }
//      
//    })
//    .catch(err => {
//       // Prompt couldn't be rendered in the current environment
//       if (err.isTtyError) 
//       {
//          console.log("Your console environment is not supported!")
//       } else {
//          console.log(err)
//       }
//    });


