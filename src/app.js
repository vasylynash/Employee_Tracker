const mysql = require('mysql');
const inquirer = require('inquirer');
const employeeDAO = require('./employee_dao');
const mysqlConnection = require('./mysql_connection');
const departmentDAO = require('./deparment_dao');
const Department = require("./department");
const Role = require("./role");
const roleDAO = require("./role_dao");
const employee_dao = require('./employee_dao');
const Employee = require('./employee');

(async () => {
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
    const employee = new Employee();
    employee.firstName = "Jane",
        employee.lastName = "Bautina",
        employee.roleId = 1;
    employee.managerId = 1;
    employee.id = 3;
    // await employee_dao.save(employee);
    console.log(await employee_dao.getAll());
    await employee_dao.delete(employee);
    console.log(await employee_dao.getAll());
    mysqlConnection.end();
})();