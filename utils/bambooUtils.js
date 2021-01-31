import { requestHandler } from './fetchUtils.js';
import dotenv from 'dotenv';        // Import .env for use here
dotenv.config();

// Constants
const bambooURL = `https://${process.env.BAMBOO_API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.BAMBOO_SUBDOMAIN}/v1/`;
const fields = `firstName,lastName`;

// Fetch employee data by Id
export const getEmployee = async(employeeId) => {
    try {
        let url = new URL(bambooURL + `employees/` + employeeId);
        return await requestHandler(url, fields);
    } catch(err) {
        console.log(err);
    }
}