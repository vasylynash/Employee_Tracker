const employee_dao = require("./employee_dao");

class Employee {
    id;
    firstName;
    lastName;
    roleId;
    managerId;

    async getManager() {
        if (!this.managerId) {
            return null;
        } else {
            return await employee_dao.getById(this.managerId);
        }
    }
}

module.exports = Employee;