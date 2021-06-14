const deparment_dao = require("./deparment_dao");
const employee_dao = require("./employee_dao");
const role_dao = require("./role_dao");

const employees = async function () {
    let arr = await employee_dao.getAll();
    return arr.map(el => [el.firstName, el.lastName].join(" ")).concat("None");
};

const roles = async function () {
    let arr = await role_dao.getAll();
    return arr.map(el => el.title);
};

const departments = async function () {
    let arr = await deparment_dao.getAll();
    return arr.map(el => el.name);
}

const initialChoice = [{
    type: "list",
    message: "What would you like to do?",
    name: "initialChoice",
    choices: [
        "Add employee",
        "View all employees",
        "Delete an employee",
        "Update employee role",
        "Update employee manager",
        "Add department",
        "View all departments",
        "Delete a department",
        "View employees by manager",
        "Add role",
        "View roles",
        "Delete a role",
        "View department budget",
        "Exit"
    ]
}];

const addEmployeeQuestions = [
    {
        type: "input",
        message: "Enter employee's first name",
        name: "firstName",
    },
    {
        type: "input",
        message: "Enter employee's last name",
        name: "lastName",
    },
    {
        type: "list",
        message: "Select employee's role",
        name: "role",
        choices: roles,
    },
    {
        type: "list",
        message: "Select employee's manager",
        name: "manager",
        choices: employees,
    }
];

const deleteEmployeeSelection = [
    {
        type: "list",
        message: "Select employee to delete",
        name: "employee",
        choices: employees,
    }
];

const updateEmployeeRoleSelection = [
    {
        type: "list",
        message: "Select employee to update",
        name: "employee",
        choices: employees,
    }
];

const updateEmployeeManagerSelection = [
    {
        type: "list",
        message: "Select employee to update",
        name: "employee",
        choices: employees,
    },
    {
        type: "list",
        message: "Select a manager",
        name: "manager",
        choices: employees,
    }
];

const addDepartmentQuestions = [
    {
        type: "input",
        message: "Enter department name",
        name: "name",
    }
];

const deleteDepartmentSelection = [
    {
        type: "list",
        message: "Select department to delete",
        name: "department",
        choices: departments,
    }
];

const addRoleQuestions = [
    {
        type: "input",
        message: "Enter role title",
        name: "title",
    },
    {
        type: "input",
        message: "Enter salary",
        name: "salary",
    }
];

const deleteRoleSelection = [
    {
        type: "list",
        message: "Select role to delete",
        name: "role",
        choices: roles,
    }
];

module.exports = {
    initialChoice,
    addEmployeeQuestions,
    deleteEmployeeSelection,
    updateEmployeeRoleSelection,
    updateEmployeeManagerSelection,
    addDepartmentQuestions,
    deleteDepartmentSelection,
    addRoleQuestions,
    deleteRoleSelection
}