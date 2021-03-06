import fetch from 'node-fetch';

export const requestHandler = async (url, fields = null) => {
    try {
        if (fields) {
            let params = fields;
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

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
    } catch (err) {
        console.log('Error encountered: ' + err);
        return null;
    }
}

export const requestHandlerSlack = async (url, text) => {
    const body = { text: text };
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        console.log('Slack send status: ' + res.status + ' ' + res.statusText);
        if (res.status !== 200) {
            console.log('Failed to post to Slack.');
        }
    } catch (err) {
        console.log('Slack Error: ' + err);
    }
}