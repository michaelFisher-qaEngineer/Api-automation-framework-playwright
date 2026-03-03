const {test, expect, page} = require('@playwright/test');
import {Utils} from '../utils/Utils';
/*
        6th  Test case - TC06_AddAffiliate
        -------
        1. Launch Browser (chrome)
        2. Open URL https://cloudberrystore.services/
        3. Click on 'My Account' 
        4. Login
        5. Click on Affiliate Link at the bottom of the page
        6. Add Affiliate Information
        7. Click on Continue
        8. Confirm Success
        */


test.only('TC06_AddAffiliate_API', async({ request}) => {

    const utils = new Utils(request);
    //step1: get the login page to establish token AND obtain login token:
    const loginPageResponse = await request.get("https://www.cloudberrystore.services/index.php?route=account/login&language=en-gb");

    //verify login page request succeed:
    expect(loginPageResponse.ok).toBeTruthy();

    //extract login token:
    const html = await loginPageResponse.text();
    const loginMatch = html.match(/login_token=([a-zA-Z0-9]+)/);
    expect(loginMatch).not.toBeNull();
    //get token string;
    const token = loginMatch[1];
    console.log('login token: ' + loginMatch);

    //call the POST login API:
    const loginRes = await request.post( `https://www.cloudberrystore.services/index.php?route=account/login.login&language=en-gb&login_token=${token}`, {
        form: {
                    email: 'michael.fisher.qaengineer@gmail.com',
                    password: '123321',
            },
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            'accept': 'application/json, text/javascript, */*; q=0.01'
            }
        }
    );
    expect(loginRes.ok()).toBeTruthy();

    //extract customer_token:
    let customerToken = null;
    const loginText = await loginRes.text();
    try {
        const loginJson = JSON.parse(loginText);

        if (loginJson && loginJson.redirect) {
        const ctMatch = String(loginJson.redirect).match(/customer_token=([a-zA-Z0-9]+)/);
        if (ctMatch) {
            customerToken = ctMatch[1];
        }
        }
    } catch (e) {
        // not JSON; ignore and try another path below
    }

      // Fallback: hit account page and parse customer_token from HTML
    if (!customerToken) {
        const accountRes = await request.get(
        "https://www.cloudberrystore.services/index.php?route=account/account&language=en-gb"
        );
        expect(accountRes.ok()).toBeTruthy();

        const accountHtml = await accountRes.text();
        const ctMatch = accountHtml.match(/customer_token=([a-zA-Z0-9]+)/);
        expect(ctMatch).not.toBeNull();
        customerToken = ctMatch[1];
    }

    console.log('customerToken: ' + customerToken);

    const affiliateRequest = await request.get(`https://www.cloudberrystore.services/index.php?route=account/affiliate&language=en-gb&customer_token=${customerToken}`)
    expect(affiliateRequest.ok()).toBeTruthy();

    //set affiliate info:
    const setAffiliateInfo = await request.post(`https://www.cloudberrystore.services/index.php?route=account/affiliate.save&language=en-gb&customer_token=${customerToken}`, {
        form: {
            company: 'Cascadia QA Solutions, LLC',
            website: 'www.fooo.com',
            tax: '9889',
            payment_method: 'paypal',
            paypal: 'mf@example.com',
            cheque: '',
            bank: '',
            agree: 1
        },
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            'accept': 'application/json, text/javascript, */*; q=0.01',
        },
    });

    expect(setAffiliateInfo.ok()).toBeTruthy();


    // const setAffiliateJson = setAffiliateInfo.json();
    // const getAffiliateInforesponse = await getAffiliateInfo.text();

    // console.log('setAffiliateJson:\n' + JSON.stringify(setAffiliateJson, null, 2));
    // expect(String(saveJson.success)).toContain('Success');
    const body = await setAffiliateInfo.text();
    console.log('affiliate.save status:', setAffiliateInfo.status());
    console.log('affiliate.save content-type:', setAffiliateInfo.headers()['content-type']);
    console.log('affiliate.save body (first 2400 chars):\n', body.slice(0, 2400));

    // Only parse JSON if it actually looks like JSON
    let setAffiliateJson = null;
    if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
        setAffiliateJson = JSON.parse(body);
        console.log('setAffiliateJson:\n' + JSON.stringify(setAffiliateJson, null, 2));
    } else {
        console.log('Not JSON (HTML response).');
    }


});
