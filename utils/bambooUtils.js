import { requestHandler } from './fetchUtils.js';
import dotenv from 'dotenv';        // Import .env for use here
dotenv.config();

// Constants
const bambooURL = `https://${process.env.BAMBOO_API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.BAMBOO_SUBDOMAIN}/v1/`;
const employeeFields = `preferredName,firstName,lastName,birthday,hireDate,status`;


// Fetch employee data by Id
export const getEmployee = async (employeeId) => {
    let url = new URL(bambooURL + `employees/` + employeeId);
    let fields = {
        fields: employeeFields
    }

    try {
        return await requestHandler(url, fields);
    } catch (err) {
        console.log(err);
    }
}


// Fetch all time off and holidays between two dates
export const getHolidays = async () => {
    let url = new URL(bambooURL + `time_off/whos_out/`);
    let fields = {
        start: `2020-12-24`,
        end: `2020-12-26`
    }

    try {
        return await requestHandler(url, fields);
    } catch (err) {
        console.log(err);
    }
}