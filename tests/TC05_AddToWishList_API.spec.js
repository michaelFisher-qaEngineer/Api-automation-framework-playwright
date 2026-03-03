const {test, expect} = require('@playwright/test');
import {Utils} from '../utils/Utils';


		// 1. Launch Browser (chrome)
		// 2) Open URL: https://cloudberrystore.services/
		// 3. Click on 'My Account' Dropmenu
		// 4. Click on 'Login' option - //button[normalize-space()='Login']
		// 5. Enter valid email address into the 'E-Mail Address' field
		// 6. Enter valid password into the 'Password' field
		// 7. Click on 'Login' button - //button[normalize-space()='Login']
		// 3. Click on Laptops and NoteBooks
		// 4. Click on Show all Laptops and NoteBooks -//a[normalize-space()='Show All
		// 5. Find HP LP3065
		// 5. Click on Add on heart - add to wishlist -
		// Confirm Success - //div[@class='alert alert-success alert-dismissible']

test('TC05_AddToWishList_API', async({ request}) => {

    const utils = new Utils(request);
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

    //open HP LP3065 page:
    const prodPage = await request.get(`https://www.cloudberrystore.services/index.php?route=product/product&language=en-gb&product_id=47&path=18`, {
        form: {
            product_id: '47',
            path: '18',
        }
    })
    expect(prodPage.ok()).toBeTruthy();

    const addToWishList = await request.post(`https://www.cloudberrystore.services/index.php?route=account/wishlist.add&language=en-gb`, {
        form: {
            product_id: '47',
        }
    })
    expect(addToWishList.ok()).toBeTruthy();
    const addToWishListRespose = await addToWishList.text();
    expect(addToWishListRespose).toContain('Success: You have added', 'HP LP3065', 'wish list');
});
