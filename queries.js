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
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${name}", "${salary}", "${dept}")`, function (err, results) {
        if (err) throw err
        console.log('Role successfully added!')
      });
}

const addEmployees = (firstName, lastName, roleID, managerID) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`, function (err, results) {
        if (err) throw err
        console.log('Employee successfully added!')
      });
}

const updateEmployee = (roleName, employee) => {
    console.log(roleName)
    console.log(employee)
    db.query(`UPDATE employee SET role = "${roleName}" WHERE first_name = ${employee[0]} AND last_name = ${employee[1]}`, function (err, results) {
      if (err) throw err
      console.log('Employee role successfully updated!')
    });
}

// const test = () => {
//   var choices = [];
//   db.query("SELECT name FROM department", function (err, results) {
//     if (err) throw err
//       results.forEach(element => {
//       var {name: a} = element
//       choices.push(a)
//     })
//   });
// }

function test2 () {
  var choices = [];
  var result;
    db.query("SELECT name FROM department", function (err, results) {
      if (err) throw err
      results.forEach(element => {
      var {name: a} = element
      choices.push(a)
    })
    console.log(choices)
    return result = choices
  });
  return result
}

test2();

// prompt user for dept name
// list of existing depts shown in prompt listing
// enter dept name/select from list of existing depts
// match selected list choice to dept_id
// input retrieved dept_id to database :>

module.exports = {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployees, updateEmployee, db}