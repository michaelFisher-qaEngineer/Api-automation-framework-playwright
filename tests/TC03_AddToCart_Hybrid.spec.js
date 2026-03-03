const {test, expect, context, page} = require('@playwright/test');
import {Utils} from '../utils/Utils'

test('TC03_AddToCart_Hybrid', async({ request, page, context}) => {
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

    //verify in UI:
    //extract cookies from API:
    const state = await request.storageState();

    //inject cookies into browser context:
    if(state.cookies && state.cookies.length > 0) {
        await context.addCookies(state.cookies);
    }

    await page.goto('https://www.cloudberrystore.services/index.php?route=checkout/cart&language=en-gb');
    await expect(page.locator('#output-cart').getByText('HP LP3065')).toBeVisible();

});
