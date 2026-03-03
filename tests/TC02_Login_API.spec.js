const {test, expect} = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../tests/test-data/CloydBerryStoreTestData.json')));
const users = dataset.Sheet1;

for(const data of users) {
    test(`TC02_Login_API-${data.username}`, async({request}) => {

        //step1: get the login page to establish token AND obtain login token:
        const loginPageResponse = await request.get("https://www.cloudberrystore.services/index.php?route=account/login&language=en-gb");

        //verify login page request succeed:
        expect(loginPageResponse.ok).toBeTruthy();

        //extract login token:
        const html = await loginPageResponse.text();
        const match = html.match(/login_token=([a-zA-Z0-9]+)/);
        expect(match).not.toBeNull();
        //get token string;
        const token = match[1];

        //call the POST login API:

const loginRes = await request.post( `https://www.cloudberrystore.services/index.php?route=account/login.login&language=en-gb&login_token=${token}`, {
    form: {
                email: data.username,
                password: data.password,
            },
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'accept': 'application/json, text/javascript, */*; q=0.01'
                }

            }
        );
        expect(loginRes.ok()).toBeTruthy();

    })
    
}