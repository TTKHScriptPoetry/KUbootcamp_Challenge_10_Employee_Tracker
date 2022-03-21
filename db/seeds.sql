INSERT INTO department (id, name)
VALUES
  (11, 'Engineering'),
  (12, 'Finance'),
  (13, 'Legal'), 
  (14, 'Service'), 
  (15, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES
  (1110, 'Engineer', '120000.00', 11),
  (1111, 'Lead Engineer', '150000.00', 11),
  (1112, 'Accountant', '125000.00', 12),
  (1113, 'Account Manager', '160000.00', 12),
  (1114, 'Lawyer', '190000', 13),
  (1115, 'Lagal Team Lead', '250000.00', 13),
  (1116, 'Customer Service', '60000.00', 14),
  (1117, 'Customer Service Manager', '75000.00', 14),
  (1118, 'Salesperson', '80000.00', 15),
  (1119, 'Sales Manager', '80000.00', 15);
   
INSERT INTO employee (first_name, last_name, id, manager_id, role_id)
VALUES
  ('John', 'Doe', 1, NULL, 1119),
  ('Mike', 'Chan', 2, 1, 1118),
  ('Ashley', 'Rodriguez', 3, NULL, 1111),
  ('Kevin', 'Tupik', 4, 3, 1110),
  ('Kunal', 'Singh', 5, NULL, 1113),
  ('Malia', 'Brown', 6, 5, 1112),
  ('Sarah', 'Lourd', 7, NULL, 1115),
  ('Tom', 'Allen', 8, 7, 1114),
  ('Swanson', 'Maria', 9, NULL, 1117),
  ('San', 'Kasick', 10, 9, 1116);
  