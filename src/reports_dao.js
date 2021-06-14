const mysqlConnection = require("./mysql_connection");

class ReportsDAO {
    async viewAll() {
        //     let query = 'SELECT employees.id, CONCAT (employees.first_name, " ", employees.last_name) AS "Name" , roles.title AS "Role", roles.salary AS "Salary", departments.name AS "Department" FROM employee_tracker_db.employees';
        //     query += ' JOIN roles ON roles.id = employees.role_id ';
        //     query += 'JOIN departments ON departments.id = roles.department_id;'

        const query = `SELECT employees.id AS "ID",
		CONCAT (employees.first_name, " ", employees.last_name) AS "Name" ,
        roles.title AS "Role",
		roles.salary AS "Salary",
        departments.name AS "Department",
        CONCAT (manager.first_name, " ", manager.last_name) AS "Manager"
FROM employees
LEFT OUTER JOIN roles ON roles.id = employees.role_id
LEFT OUTER JOIN departments ON departments.id = roles.department_id
LEFT OUTER JOIN employees manager ON employees.manager_id = manager.id;`;


        const data = await mysqlConnection.query(query, {});
        return data;
    }
}

module.exports = new ReportsDAO();