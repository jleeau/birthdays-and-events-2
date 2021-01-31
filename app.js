import { getEmployee, getHolidays } from './utils/bambooUtils.js';

console.log(`Starting...`);

let main = async () => {
    // Fetch list of every employee
    let dir = await getEmployee(`directory`);
    if (dir && dir.employees && dir.employees.length > 0) {
        let employeeIds = [];
        // Add all directory employees to the list
        for (let employee of dir.employees) {
            employeeIds.push(employee.id);
        }
        
        // Go through each employee and check if they're worth posting for birthday/work anniversary
        let employees = [];
        if (employeeIds && employeeIds.length > 0) {
            for (let id of employeeIds) {
                let employee = await getEmployee(id);
                if (employee.status === `Active` && (employee.hireDate != null || employee.birthday != null)) {
                    // placeholder if condition -> check if hireDate and birthday is equal to today (util method)
                    employees.push(employee);
                }
            }
            console.log(employees.length);
        }
    }

    // let holidays = await getHolidays();
    // console.log(holidays);
}

main();

// Birthdays

// Work Anniversaries

// Holidays

// Annual Leave


