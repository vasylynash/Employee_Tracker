const deparment_dao = require("./deparment_dao");
const employee_dao = require("./employee_dao");
const role_dao = require("./role_dao");

// const employees = async function () {
//     let arr = await employee_dao.getAll();
//     return arr.map(el => [el.firstName, el.lastName].join(" ")).concat("None");
// };

const employees = async function () {
    let arr = await employee_dao.getAll();
    return arr.map(employee => ({
        name: [employee.firstName, employee.lastName].join(" "),
        value: employee
    })).concat({ name: "None", value: null });
};

const roles = async function () {
    let arr = await role_dao.getAll();
    return arr.map(role => ({
        name: role.title,
        value: role
    }));
};

const departments = async function () {
    let arr = await deparment_dao.getAll();
    return arr.map(department => ({
        name: department.name,
        value: department
    }));;
}
module.exports = {
    initialChoice: [{
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
    }],

    createEmployee: [
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
        // {
        //     type: "list",
        //     message: "Select employee's role",
        //     name: "role",
        //     choices: roles,
        // },
        // {
        //     type: "list",
        //     message: "Select manager",
        //     name: "manager",
        //     choices: employees,
        // }
    ],

    selectEmployee: [
        {
            type: "list",
            message: "Select employee",
            name: "employee",
            choices: employees,
        }
    ],

    // const updateEmployeeRoleSelection = [
    //     {
    //         type: "list",
    //         message: "Select employee to update",
    //         name: "employee",
    //         choices: employees,
    //     }
    // ];

    selectRole: [
        {
            type: "list",
            message: "Select role",
            name: "role",
            choices: roles
        }
    ],

    selectManager: [
        // {
        //     type: "list",
        //     message: "Select employee to update",
        //     name: "employee",
        //     choices: employees,
        // },
        {
            type: "list",
            message: "Select a manager",
            name: "manager",
            choices: employees,
        }
    ],

    createDepartment: [
        {
            type: "input",
            message: "Enter department name",
            name: "name",
        }
    ],

    selectDepartment: [
        {
            type: "list",
            message: "Select department",
            name: "department",
            choices: departments,
        }
    ],

    createRole: [
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
    ],

    // deleteRoleSelection: [
    //     {
    //         type: "list",
    //         message: "Select role to delete",
    //         name: "role",
    //         choices: roles,
    //     }
    // ]
}
// module.exports = {
//     initialChoice,
//     addEmployeeQuestions,
//     deleteEmployeeSelection,
//     updateEmployeeRoleSelection,
//     updateEmployeeManagerSelection,
//     addDepartmentQuestions,
//     deleteDepartmentSelection,
//     addRoleQuestions,
//     deleteRoleSelection,
//     updateRoleSelection

// }

// module.exports = questions;