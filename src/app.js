const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require("console.table");
const employeeDAO = require('./employee_dao');
const mysqlConnection = require('./mysql_connection');
const departmentDAO = require('./deparment_dao');
const Department = require("./department");
const Role = require("./role");
const roleDAO = require("./role_dao");
const employee_dao = require('./employee_dao');
const Employee = require('./employee');
const employeeQuestions = require('./questions').addEmployeeQuestions;
const initialChoice = require("./questions").initialChoice;
const role_dao = require('./role_dao');
const { addEmployeeQuestions } = require('./questions');
const reports_dao = require('./reports_dao');

// (async () => {
// console.log(JSON.stringify(await employeeDAO.getAll()));
// const role = new Role();
// role.title = "Manager";
// role.salary = 120, 000;
// role.departmentId
// department.name = "Sales2";
// department.id = 2;
// await departmentDAO.delete(department);
// const employee = await employee_dao.getById(1);
// console.log(employee);
// const manager = await employee.getManager();
// console.log(manager);
//     const employee = new Employee();
//     employee.firstName = "Jane",
//         employee.lastName = "Bautina",
//         employee.roleId = 1;
//     employee.managerId = 1;
//     employee.id = 3;
//     // await employee_dao.save(employee);
//     console.log(await employee_dao.getAll());
//     await employee_dao.delete(employee);
//     console.log(await employee_dao.getAll());
//     mysqlConnection.end();
//     console.log(await role_dao.getAll());
// })();

// inquirer
//     .prompt(employeeQuestions)
//     .then(async (answers) => {
//         console.log(answers);
//         let title = answers.role;
//         let id = await role_dao.getId(title);
//         console.log(id);
//         let names = answers.manager.split(" ");
//         let managerId = await employee_dao.getId(names[0], names[1]);
//         console.log(managerId);
//         // const employee = new Employee();
//         let employee = {
//             firstName: answers.firstName,
//             lastName: answers.lastName,
//             roleId: id,
//             managerId: managerId,
//         }
//         console.log(employee);
//     })


function addEmployee() {
    inquirer.prompt(addEmployeeQuestions)
        .then(async (answers) => {
            let title = answers.role;
            let role = await role_dao.findByTitle(title);
            let manager;
            if (answers.manager === "None") {
                manager = null;
            } else {
                let names = answers.manager.split(" ");
                manager = await employee_dao.findByName(names[0], names[1]);
            }
            const employee = new Employee();
            employee.firstName = answers.firstName;
            employee.lastName = answers.lastName;
            employee.setRole(role);
            employee.setManager(manager);
            await employee_dao.save(employee);
            console.table(await reports_dao.viewAll());
        })
}



inquirer
    .prompt(initialChoice)
    .then(async (answer) => {
        // console.log(answer);
        switch (answer.initialChoice) {
            case "Add employee":
                addEmployee();

                break;
            case "View all employees":

                console.table(await reports_dao.viewAll());
            default:
                break;
        }
    })