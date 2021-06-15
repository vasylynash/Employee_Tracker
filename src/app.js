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


    async mainMenu() {
        while (true) {
            let answer = await inquirer.prompt(initialChoice);

            switch (answer.initialChoice) {
                case "Add employee":
                    await this.addEmployee();
                    break;
                case "View all employees":
                    console.table(await reports_dao.viewAll());
                    break;
                case "Delete an employee":
                    await this.deleteEmployee();
                    break;
                case "Update employee role":
                    await this.updateEmployeeRole();
                    break;
                case "Update employee manager":
                    await this.updateManager();
                    break;
                case "Add department":
                    await this.createDepartment();
                    break;
                case "View all departments":
                    console.table(["ID", "Name"], (await deparment_dao.getAll()).map(department => {
                        return [department.id, department.name]
                    }));
                    break;
                case "Delete a department":
                    await this.deleteDepartment();
                    break;
                case "Add role":
                    await this.createRole();
                    break;
                case "View roles":
                    console.table(await role_dao.getAll());
                    break;
                case "Delete a role":
                    await this.deleteRole();
                    break;
                case "View employees by manager":
                    await this.findByManager();
                    break;
                case "View department budget":
                    console.table(await reports_dao.viewBudgets());
                    break;
                case "Exit":
                    await mysqlConnection.end();
                    return;
            }
        }
    };

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

    async deleteEmployee() {
        let answers = await inquirer.prompt(questions.selectEmployee);
        if (answers.employee) {
            await employee_dao.delete(answers.employee);
        }
    };

    async updateEmployeeRole() {
        let employee;
        let answers = await inquirer.prompt(questions.selectEmployee);
        if (answers.employee) {
            employee = answers.employee;
            answers = await inquirer.prompt(questions.selectRole);
            employee.setRole(answers.role);
            await employee_dao.save(employee);
        }
    };

    async updateManager() {
        let answers = await inquirer.prompt(questions.selectEmployee);
        const employee = answers.employee;
        if (employee) {
            answers = await inquirer.prompt(questions.selectManager);
            employee.setManager(answers.manager);
            await employee_dao.save(employee);
        }
    };

    async createDepartment() {
        let answers = await inquirer.prompt(questions.createDepartment);
        const department = new Department();
        department.name = answers.name;
        await deparment_dao.save(department);
    };

    async findByManager() {
        let answer = await inquirer.prompt(questions.selectManager);
        if (answer.manager) {
            console.table(["Name"], (await employee_dao.findByManager(answer.manager)).map(employee => {
                return [employee.firstName + " " + employee.lastName]
            }));
        }
    };

    async deleteDepartment() {
        let answer = await inquirer.prompt(questions.selectDepartment);
        await deparment_dao.delete(answer.department);
    };

    async createRole() {
        let answers = await inquirer.prompt(questions.createRole);
        const role = new Role();
        role.title = answers.title;
        role.salary = answers.salary;
        answers = await inquirer.prompt(questions.selectDepartment);
        console.log(answers);
        role.setDepartment(answers.department);
        console.log(role);
        await role_dao.save(role);
    };

    async deleteRole() {
        let answers = await inquirer.prompt(questions.selectRole);
        await role_dao.delete(answers.role);
    };
}

module.exports = App;
