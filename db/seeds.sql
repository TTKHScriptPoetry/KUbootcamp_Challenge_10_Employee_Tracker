INSERT INTO department (id, name)
VALUES
  (11, 'Engineering'),
  (22, 'Finance'),
  (33, 'Legal'), 
  (44, 'Service'), 
  (55, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES
  (1110, 'Engineer', '120000', 11),
  (1111, 'Lead Engineer', '150000', 11),
  (2220, 'Accountant', '125000', 22),
  (2221, 'Account Manager', '160000', 22),
  (3330, 'Lawyer', '190000', 33),
  (3331, 'Lagal Team Lead', '250000', 33),
  (4440, 'Customer Service', '60000', 44),
  (4441, 'Customer Service Manager', '75000', 44),
  (5550, 'Salesperson', '80000', 55),
  (5551, 'Sales Manager', '80000', 55);
   
INSERT INTO employee (first_name, last_name, id, manager_id, role_id)
VALUES
  ('John', 'Doe', 1, NULL, 5551),
  ('Mike', 'Chan', 2, 1, 5550),
  ('Ashley', 'Rodriguez', 3, NULL, 1111),
  ('Kevin', 'Tupik', 4, 3, 1110),
  ('Kunal', 'Singh', 5, NULL, 2221),
  ('Malia', 'Brown', 6, 5, 2220),
  ('Sarah', 'Lourd', 7, NULL, 3331),
  ('Tom', 'Allen', 8, 7, 3330),
  ('Swanson', 'Maria', 9, NULL, 4441),
  ('San', 'Kasick', 10, 9, 4440);
  