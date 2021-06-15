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
        employee.roleId = row.role_id;
        employee.managerId = row.manager_id;
        return employee;
    };

    async save(employee) {
        if (!employee.id) {
            const query = "INSERT INTO employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?";
            const data = await mysqlConnection.query(query, [employee.firstName, employee.lastName, employee.roleId, employee.managerId]);
            employee.id = data.insertId;
        } else {
            const query = "UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?";
            await mysqlConnection.query(query, [employee.firstName, employee.lastName, employee.roleId, employee.managerId, employee.id]);
        }
    };

    async delete(employee) {
        const query = "DELETE FROM employees WHERE id = ?";
        await mysqlConnection.query(query, [employee.id]);
        employee.id = null;
    };

    async findByManager(manager) {
        const query = "SELECT * FROM employees WHERE manager_id = ?;"
        const data = await mysqlConnection.query(query, [manager.id]);
        return data.map(this.rowToObject);
    };
}

module.exports = new EmployeeDAO();