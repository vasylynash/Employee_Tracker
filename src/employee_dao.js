const Employee = require("./employee");
const mysqlConnection = require("./mysql_connection");

class EmployeeDAO {

    async getAll() {
        const query = "SELECT * FROM employees";
        const data = await mysqlConnection.query(query, {});
        return data.map(this.rowToObject);
    };

    rowToObject(row) {
        const employee = new Employee();
        employee.firstName = row.first_name;
        employee.lastName = row.last_name;
        employee.id = row.id;
        return employee;
    }
}

module.exports = new EmployeeDAO();