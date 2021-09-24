const inquirer = require('inquirer');
const {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployees, db, updateEmployee} = require('./queries');

inquirer
    .prompt([
        {
            type: 'list',
            message: 'Select from the following actions:',
            name: 'actions',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },
        {
            type: 'Input',
            message: "Enter the department name:",
            name: 'department',
            when: (answers) => answers.actions === 'Add a department'
        },
        {
            type: 'input',
            message: "Enter the name of the new role:",
            name: 'roleName',
            when: (answers) => answers.actions === 'Add a role'
        },
        {
            type: 'input',
            message: "Enter the salary of the new role:",
            name: 'salary',
            when: (answers) => answers.actions === 'Add a role'
        },
        {
            type: 'input',
            message: "Enter the department for the role:",
            name: 'roleDept',
            when: (answers) => answers.actions === 'Add a role'
        },
        {
            type: 'input',
            message: "Enter the new employee's first name:",
            name: 'firstName',
            when: (answers) => answers.actions === 'Add an employee'
        },
        {
            type: 'input',
            message: "Enter the new employee's last name:",
            name: 'lastName',
            when: (answers) => answers.actions === 'Add an employee'
        },
        {
            type: 'input',
            message: "Enter the new employee's role:",
            name: 'employeeRole',
            when: (answers) => answers.actions === 'Add an employee'
        },
        {
            type: 'input',
            message: "Enter the new employee's manager:",
            name: 'employeeManager',
            when: (answers) => answers.actions === 'Add an employee'
        },
        {
            type: 'list',
            message: "Enter the name of the employee you want to update:",
            name: 'roleUpdateName',
            choices: async () => {
                const employees = await db.promise().query('SELECT first_name, last_name FROM employee')
                return employees[0].map(employee => employee.first_name)
            },
            when: (answers) => answers.actions === 'Update an employee role'
        },
        {
            type: 'list',
            message: "Enter the role you want to promote the employee to:",
            name: 'roleUpdate',
            choices: async () => {
                const employees = await db.promise().query('SELECT title FROM roles')
                return employees[0].map(employee => employee.title)
            },
            when: (answers) => answers.actions === 'Update an employee role'
        },
    ])
    .then((answers) => {
    switch (answers.actions) {
        case("View all departments"):
            viewDepartments();
            break;
        case("View all roles"):
            viewRoles();
            break;
        case("View all employees"):
            viewEmployees();
            break;
    }

    if (answers.department) {
        addDepartment(answers.department);
    } else if (answers.roleUpdateName) {
        updateEmployee(answers.roleUpdate, answers.roleUpdateName)
    } else if (answers.roleName) {
        addRole(answers.roleName, answers.salary, answers.roleDept)
    } else if (answers.firstName) {
        addEmployees(answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager)
    }
})