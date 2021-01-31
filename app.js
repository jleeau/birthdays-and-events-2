const fetch = require(`node-fetch`);

require(`dotenv`).config();

// Constants
const bambooURL = `https://${process.env.BAMBOO_API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.BAMBOO_SUBDOMAIN}/v1/`;




console.log(`Starting...`);



// Make request
const requestHandler = async (url, fields) => {
    try {
        params = { fields: fields };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        let res = await fetch(url, {
            method: `GET`,
            headers: {
                accept: `application/json`
            }
        });
        
        if (res.status === 200) {
            return await res.json();
        } else {
            console.log(`Failed to fetch from BambooHR (${res.status}): ${res.headers.get('X-BambooHR-Error-Message')}`);
            return null;       
        }
    } catch(err) {
        console.log('Error encountered: ' + err);
        return null;
    }
}


let getEmployeeData = async(employeeId, fields = null) => {
    try {
        let url = new URL(bambooURL + `employees/` + employeeId);
        return await requestHandler(url, fields);
    } catch(err) {
        console.log(err);
    }
}


let main = async () => {
    let dir = await getEmployeeData(`directory`);
    console.log(dir);
}

main();

// Birthdays

// Work Anniversaries

// Holidays

// Annual Leave


