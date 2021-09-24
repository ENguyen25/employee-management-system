INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Marketing"),
       ("Accounting"),
       ("Technology"),
       ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES ("Graphic Designer", 80000.00, 2),
       ("Executive Director", 100000.00, 5),
       ("Social Media Manager", 80000.00, 2),
       ("Accountant", 80000.00, 3),
       ("Developer", 100000.00, 4),
       ("Program Manager", 90000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Crystal", "Chan", 1, null),
       ("Evelyn", "Nguyen", 2, 1),
       ("Melissa", "Gonzalez", 3, 1),
       ("Tracy", "Chung", 4, 1),
       ("Linh", "Nguyen", 5, 2),
       ("Lynn", "Miyashita", 6, 2);

