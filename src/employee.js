
class Employee {
    id;
    firstName;
    lastName;
    roleId;
    managerId;

    async getManager() {
        const employee_dao = require("./employee_dao");
        if (!this.managerId) {
            return null;
        } else {
            return await employee_dao.getById(this.managerId);
        }
    }
}

module.exports = Employee;