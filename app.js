import { getEmployee, getHolidays, postToSlack } from './utils/bambooUtils.js';

console.log(`Starting at ${new Date()}...`);

let main = async () => {
    // Fetch list of every employee
    let dir = await getEmployee(`directory`);
    if (dir && dir.employees && dir.employees.length > 0) {
        let employeeIds = [];
        // Add all directory employees to the list
        for (let employee of dir.employees) {
            employeeIds.push(employee.id);
        }
        console.log(`Found ${employeeIds.length} employees.`);

        // Go through each employee and check if they're worth posting for birthday/work anniversary
        let birthdays = [];
        let annis = [];
        if (employeeIds && employeeIds.length > 0) {
            for (let id of employeeIds) {
            //for (let i = 1; i < 3; i++) {
              //  let id = employeeIds[i];
                let employee = await getEmployee(id);
                if (employee.status === `Active`) {
                    if (checkBirthday(employee.birthday)) {
                        birthdays.push(employee);
                    }
                    if (checkHireDate(employee.hireDate)) {
                        annis.push(employee);
                    }
                }
            }
            console.log(`Birthdays today: ${birthdays.length}`);
            console.log(`Anniversaries today: ${annis.length}`);

            if (birthdays.length > 0) {
                createPost(birthdays, 'birthday');
            }
            if (annis.length > 0) {
                createPost(annis, 'anniversary');
            }
        }
    }

    /*
    let holidays = await getHolidays();
    console.log(holidays);
    */
}

main();


// Check birthdays of employees
let checkBirthday = (birthday) => {
    if (birthday !== null) {
        let fBday = new Date(`${birthday}-${new Date().getFullYear()}`).toDateString();
        let today = new Date().toDateString();
        // console.log(`Checking birthday... ${fBday} vs. ${today}`);
        if (fBday === today) {
            return true;
        }
        return false;
    }
    return null;
}

// Check work anniversaries of employees
let checkHireDate = (hireDate) => {
    // Check only if employee has been hired for more than 30 days
    if (hireDate !== null && new Date(hireDate) < new Date().setDate(-30)) {
        let fHdate = new Date(`${hireDate.substring(5)}-${new Date().getFullYear()}`).toDateString();

        // To find the work anniversary, Math.abs() the below
        // console.log(parseInt(hireDate.substring(0, 4)));
        // console.log(new Date().getFullYear());
        
        let today = new Date().toDateString();
        // console.log(`Checking work anniversaries... ${fHdate} vs. ${today}`);
        if (fHdate === today) {
            return true;
        }
        return false;
    }
    return null;
}


let createPost = (employees, type) => {
    console.log(`Posting ${type} messages...`);
    for (let employee of employees) {
        let name = employee.preferredName ? `${employee.preferredName} ${employee.lastName}` : `${employee.firstName} ${employee.lastName}`;
        let message = buildSlackMessage(name, type);
        if (message && message.length > 0) {
            sendPostToSlack(message);
        }
    }

}


let buildSlackMessage = (name, type) => {
    let post;
    if (type === 'birthday') {
        post = `<!channel> *Happy Birthday to ${name}*!
        :clapping::star2::tada::birthday::balloon:    Hope you have a great day!    :star2::tada::birthday::balloon::clapping:`;
    } else if (type === 'anniversary') {
        post = `<!channel> *Happy Work Anniversary to ${name}*!
        :clapping::sparkles::champagne::star2::100::star:    Great to have you on the team!    :sparkles::champagne::star2::100::star::clapping:`;
    }

    return post;
}


let sendPostToSlack = async (text) => {
    await postToSlack(text);
}


// Holidays

// Annual Leave


