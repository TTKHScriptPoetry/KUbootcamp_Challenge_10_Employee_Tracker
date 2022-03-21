class Employee {
   constructor(firstname, lastname, role_id, manager) {  
    //  this.id = id; // taken care by auto-increment
     this.firstname = firstname;
     this.lastname = lastname;   
     this.role_id = role_id;
     this.manager = manager;  
   //   this.manager_id = manager_id;
   } // end of constructor   
}

module.exports = Employee;



