const {test, expect} = require('@playwright/test');
import {Utils} from '../utils/Utils'


/*
Test case - Complete Purchase
-------
1. Launch Browser (chrome)
2. Open URL  https://cloudberrystore.services/
3. Click on Laptops and NoteBooks
4. Click on Show all Laptops and NoteBooks
5. Select an item "HP LP3065"
6. Set Delivery Date
7. Click on Add to Cart
9. Go to Checkount
10. Login
11. Complete Checkout forms
12. Submit order
13. Validate Order COnfirmation
9. Close WebDriver
*/

test('TC05_CompletePurchase_API', async({ request}) => {
    const utils = new Utils(request);
    //start a session
    const homeRes = await request.get('https://www.cloudberrystore.services/index.php?route=product/product&language=en-gb&product_id=47&path=18');
    expect(homeRes.ok()).toBeTruthy();

    //add HP laptop:
    const prodRes = await request.get('https://www.cloudberrystore.services/index.php?route=checkout/cart.add&language=en-gb');
    expect(prodRes.ok()).toBeTruthy();

    //set delivery date to 5 ahead:
    const formattedDeliveryDate = utils.getFormatDeliveryDate(5);

    //POST to add to cart:
    const prodAdd = await request.post(`https://www.cloudberrystore.services/index.php?route=checkout/cart.add&language=en-gb`,
        {
            form: {
                product_id: '47',
                quantity: '1',
                'option[225]': formattedDeliveryDate
            },
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'accept': 'application/json, text/javascript, */*; q=0.01'
            }
        }
    )
    expect(prodAdd.ok()).toBeTruthy();

    //verify item in shopping cart:
    const cartResponse = await request.get(`https://www.cloudberrystore.services/index.php?route=checkout/cart&language=en-gb`);
    expect(cartResponse.ok()).toBeTruthy();

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

    //select address:
    const selectAddress = await request.get(`https://www.cloudberrystore.services/index.php?route=checkout/shipping_address.address&language=en-gb&address_id=31`);
    expect (selectAddress.ok()).toBeTruthy();
    const selectAddressBody = await selectAddress.text();
    expect(selectAddressBody).toContain('Success: You have changed shipping address!');

    //select shipping method:
    const openShippingMethod = await request.get(`https://www.cloudberrystore.services/index.php?route=checkout/shipping_method.quote&language=en-gb`);
    expect (openShippingMethod.ok()).toBeTruthy();
    const selectShippingMethod = await request.post(`https://www.cloudberrystore.services/index.php?route=checkout/shipping_method.save&language=en-gb`, {
        form: {
            shipping_method: 'flat.flat',
            },
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            'accept': 'application/json, text/javascript, */*; q=0.01'
            }
        }
    );
    expect(selectShippingMethod.ok()).toBeTruthy();
    const selectShippingMethodBody = await selectShippingMethod.text();
    expect(selectShippingMethodBody).toContain('Success: You have changed shipping method!')

    //select payment method:
    const openPaymentMethod = await request.get(`https://www.cloudberrystore.services/index.php?route=checkout/payment_method.getMethods&language=en-gb`);
    expect (openPaymentMethod.ok()).toBeTruthy();
    const selectPaymentMethod = await request.post(`https://www.cloudberrystore.services/index.php?route=checkout/payment_method.save&language=en-gb`, {
        form: {
            payment_method: 'cod.cod',
        }
    })
    expect(selectPaymentMethod.ok()).toBeTruthy();
    const selectPaymentMethodBody = await selectPaymentMethod.text();
    expect(selectPaymentMethodBody).toContain('Success: You have changed payment method!')

    //submit order
    const submitOrder = await request.get(`https://www.cloudberrystore.services/index.php?route=extension/opencart/payment/cod.confirm&language=en-gb`);
    expect (submitOrder.ok()).toBeTruthy();
    const submitOrderSubmit = await request.get(`https://www.cloudberrystore.services/index.php?route=checkout/success&language=en-gb`);
    expect (submitOrderSubmit.ok()).toBeTruthy();
    const submitOrderSubmitBody = await submitOrderSubmit.text();
    expect(submitOrderSubmitBody).toContain('Your order has been placed!');
});

