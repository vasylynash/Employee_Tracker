const Department = require("./department");
const mysqlConnection = require("./mysql_connection");

class DepartmentDAO {
    async getAll() {
        const query = "SELECT * FROM departments";
        const data = await mysqlConnection.query(query, {});
        return data.map(this.rowToObject);
    };

    rowToObject(row) {
        const department = new Department();
        department.name = row.name;
        department.id = row.id;
        return department;
    };

    async save(department) {
        if (!department.id) {
            const query = "INSERT INTO departments SET ?";
            const data = await mysqlConnection.query(query, { name: department.name });
            department.id = data.insertId;
        } else {
            const query = "UPDATE departments SET name = ? WHERE id = ?";
            await mysqlConnection.query(query, [department.name, department.id]);
        }
    };

    async delete(department) {
        const query = "DELETE FROM departments WHERE id = ?";
        await mysqlConnection.query(query, [department.id]);
        department.id = null;
    };
}

module.exports = new DepartmentDAO();