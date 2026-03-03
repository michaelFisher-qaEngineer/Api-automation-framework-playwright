const {test, expect} = require('@playwright/test');
import {Utils} from '../utils/Utils'

test('TC03_AddToCart_API', async({ request}) => {
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
    const cartBody = await cartResponse.text();
    expect(cartBody).toContain('HP LP3065');

});
