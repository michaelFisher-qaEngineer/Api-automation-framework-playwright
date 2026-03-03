
export class Utils {
    constructor(page) {
        this.page = page;
    }

    async getFormatDeliveryDate(daysAhead) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + daysAhead);
        const mm = String(deliveryDate.getMonth() + 1).padStart(2, '0');
        const dd = String(deliveryDate.getDate()).padStart(2, '0');
        const yyyy = String(deliveryDate.getFullYear());
        const formattedDeliveryDate = `${yyyy}-${mm}-${dd}`;
        return formattedDeliveryDate;
    }
}