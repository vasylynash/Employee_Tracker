const Role = require("./role");
const mysqlConnection = require("./mysql_connection");

class RoleDAO {
    async getAll() {
        const query = "SELECT * FROM roles";
        const data = await mysqlConnection.query(query, {});
        return data.map(this.rowToObject);
    }

    rowToObject(row) {
        const role = new Role();
        role.title = row.title;
        role.salary = row.salary;
        role.id = row.id;
        role.department_id = row.department_id;
        return role;
    }

    async save(role) {
        if (!role.id) {
            const query = "INSERT INTO roles SET ?";
            const data = await mysqlConnection.query(query, { title: role.title, salary: role.salary, department_id: role.department_id });
            role.id = data.insertId;
        } else {
            const query = "UPDATE roles SET title = ?, salary = ?, department.id = ? WHERE id = ?";
            await mysqlConnection.query(query, [role.title, role.salary, role.department_id, role.id]);
        }
    }

    async delete(role) {
        const query = "DELETE FROM roles WHERE id = ?";
        await mysqlConnection.query(query, [role.id]);
        role.id = null;
    }

    async getRoleId(title) {
        const query = "SELECT id FROM roles WHERE title = ?";
        let roleId = await mysqlConnection.query(query, [title]);
        return roleId[0].id;
    }
}

module.exports = new RoleDAO();