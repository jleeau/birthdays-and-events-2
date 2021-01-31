import fetch from 'node-fetch';

export const requestHandler = async (url, fields) => {
    try {
        let params = { fields: fields };
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