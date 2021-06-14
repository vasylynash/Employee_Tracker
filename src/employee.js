
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

    setManager(employee) {
        if (!employee) {
            this.managerId = null;
        }
        if (!employee.id) {
            throw new Error("Employee is not saved");
        }
        this.managerId = employee.id;
    }

    setRole(role) {
        if (!role || !role.id) {
            throw new Error("Role must be chosen");
        }
        this.roleId = role.id;
    }
}

module.exports = Employee;