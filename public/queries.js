const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'evel',
      database: 'employees_db'
    },
  );

const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err
        const table = cTable.getTable(results)
        console.table(table);
      });
}

const viewRoles = () => {
    db.query('SELECT roles.id, roles.title, roles.salary, department.name FROM roles JOIN department ON department.id = roles.department_id', function (err, results) {
        if (err) throw err
        const table = cTable.getTable(results)
        console.table(table);
      });
}

const viewEmployees = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, employee.manager_id FROM employee JOIN roles ON roles.id = employee.role_id', function (err, results) {
        if (err) throw err
        const table = cTable.getTable(results)
        console.table(table);
      });
}

const addDepartment = (department) => {
    db.query(`INSERT INTO department (name) VALUES ("${department}")`, function (err, results) {
        if (err) throw err
        console.log('Department successfully added!')
      });
}

const addRole = (name, salary, dept) => {
    db.query(`INSERT INTO roles (title, salary, department_id)
    SELECT "${name}", "${salary}", id
    FROM department WHERE name = "${dept}"`, function (err, results) {
        if (err) throw err
        console.log('Role successfully added!')
      });
}

const addEmployees = (firstName, lastName, roleName, managerName) => {
    let manager = managerName.split(' ')
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    SELECT "${firstName}", "${lastName}", roles.id, employee.id
    FROM roles, employee WHERE title = "${roleName}" AND first_name = "${manager[0]}"`, function (err, results) {
        if (err) throw err
        console.log('Employee successfully added!')
      });
}

const updateEmployee = async (roleName, employee) => {
    const employer = employee.split(' ')
    const role = await db.promise().query(`SELECT id FROM roles WHERE title = "${roleName}"`)
    const query = await db.promise().query(`UPDATE employee SET role_id = ${role[0][0].id} WHERE first_name = "${employer[0]}"`)
    console.log('Employee successfully updated!')
}



module.exports = {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployees, updateEmployee, db}