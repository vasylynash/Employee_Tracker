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
// const employeeQuestions = require('./questions').addEmployeeQuestions;
const initialChoice = require("./questions").initialChoice;
const role_dao = require('./role_dao');
// const { addEmployeeQuestions, deleteEmployeeSelection, updateEmployeeRoleSelection, updateRoleSelection } = require('./questions');
const reports_dao = require('./reports_dao');
const questions = require("./questions");
const { selectRole } = require('./questions');
const deparment_dao = require('./deparment_dao');
// const Employee = require("./employee");

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

class App {

    // addEmployee() {
    //     inquirer.prompt(addEmployeeQuestions)
    //         .then(async (answers) => {
    //             const employee = new Employee();
    //             employee.firstName = answers.firstName;
    //             employee.lastName = answers.lastName;
    //             employee.setRole(answers.role);
    //             employee.setManager(answers.manager);
    //             await employee_dao.save(employee);
    //             console.table(await reports_dao.viewAll());
    //             this.mainMenu();
    //         })
    // }


    mainMenu() {
        inquirer
            .prompt(initialChoice)
            .then(async (answer) => {
                switch (answer.initialChoice) {
                    case "Add employee":
                        this.addEmployee();
                        break;
                    case "View all employees":
                        console.table(await reports_dao.viewAll());
                        break;
                    case "Delete an employee":
                        this.deleteEmployee();
                        break;
                    case "Update employee role":
                        this.updateEmployeeRole();
                        break;
                    case "Update employee manager":
                        this.updateManager();
                        break;
                    case "Add department":
                        this.createDepartment();
                        break;
                    case "Exit":
                        mysqlConnection.end();
                    default:
                        break;
                }
            })
    }

    async addEmployee() {
        const employee = new Employee();
        let answers = await inquirer.prompt(questions.createEmployee);
        employee.firstName = answers.firstName;
        employee.lastName = answers.lastName;
        answers = await inquirer.prompt(questions.selectRole);
        employee.setRole(answers.role);
        answers = await inquirer.prompt(questions.selectManager);
        employee.setManager(answers.manager);
        await employee_dao.save(employee);
        this.mainMenu();
    };

    deleteEmployee() {
        inquirer.prompt(questions.selectEmployee).then(
            async (answers) => {
                if (answers.employee) {
                    await employee_dao.delete(answers.employee);
                }
                this.mainMenu();
            }
        );
    };

    updateEmployeeRole() {
        let employee;
        inquirer.prompt(questions.selectEmployee).then(answers => {
            if (answers.employee) {
                employee = answers.employee;
                inquirer.prompt(questions.selectRole).then(async (answers) => {
                    employee.setRole(answers.role);
                    await employee_dao.save(employee);
                    this.mainMenu();
                });
            } else {
                this.mainMenu();
            }
        })
    };

    async updateManager() {
        let answers = await inquirer.prompt(questions.selectEmployee);
        const employee = answers.employee;
        if (employee) {
            answers = await inquirer.prompt(questions.selectManager);
            employee.setManager(answers.manager);
            await employee_dao.save(employee);
        }
        this.mainMenu();
    }

    async createDepartment() {
        let answers = await inquirer.prompt(questions.createDepartment);
        const department = new Department();
        department.name = answers.name;
        await deparment_dao.save(department);
        this.mainMenu()
    }
}

module.exports = App;
