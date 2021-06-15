
class Employee {
    id;
    firstName;
    lastName;
    roleId;
    managerId;

    setManager(employee) {
        if (!employee) {
            this.managerId = null;
            return;
        }
        if (!employee.id) {
            throw new Error("Employee is not saved");
        }
        this.managerId = employee.id;
    };

    setRole(role) {
        if (!role || !role.id) {
            throw new Error("Role must be chosen");
        }
        this.roleId = role.id;
    };
}

module.exports = Employee;