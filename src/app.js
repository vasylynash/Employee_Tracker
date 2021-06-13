const mysql = require('mysql');
const inquirer = require('inquirer');
const employeeDAO = require('./employee_dao');
const mysqlConnection = require('./mysql_connection');

(async () => {
    console.log(JSON.stringify(await employeeDAO.getAll()));
    mysqlConnection.end();
})();