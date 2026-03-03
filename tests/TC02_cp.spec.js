const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../tests/test-data/CloydBerryStoreTestData.json')));
const users = dataset.Sheet1;

for (const data of users) {

  test(`TC02_Login_API-${data.username}`, async ({ request }) => {

    // Step 1: GET login page to obtain login token
    const loginPageResponse = await request.get(
      "https://www.cloudberrystore.services/index.php?route=account/login&language=en-gb"
    );

    // Verify login page request succeeded
    expect(loginPageResponse.ok()).toBeTruthy();

    // Extract login token from HTML
    const html = await loginPageResponse.text();

    // FIXED: capture the full token, not just 1 character
    const match = html.match(/login_token=([a-zA-Z0-9]+)/);

    expect(match).not.toBeNull();

    const token = match[1];
    console.log("Extracted token:", token);

    // Step 2: POST login API
    const loginRes = await request.post(
      `https://www.cloudberrystore.services/index.php?route=account/login.login&language=en-gb&login_token=${token}`,
      {
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

    // Validate login response
    expect(loginRes.ok()).toBeTruthy();

    const json = await loginRes.json();
    console.log(json);

  });

}
