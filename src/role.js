class Role {
    id;
    title;
    salary;
    departmentId;

    setDepartment(department) {
        if (!department.id) {
            throw new Error("No department with the chosen id");
        }
        this.departmentId = department.id;
    }


}



module.exports = Role;