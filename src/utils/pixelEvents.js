import {
    pixelCustomTruck,
    pixelSingleTruck,
    pixelTruck
} from '../lib/facebookPixel';

export const initiateCheckoutPixel = (allCartItems) => {
    let total = 0;
    const data = {
        content_category: 'EBOOK',
        content_ids: Object.keys(allCartItems),
        contents: Object.values(allCartItems),
        currency: 'BDT',
        num_items: Object.keys(allCartItems).length,
        value: Object.keys(allCartItems)
            .map(
                (id) =>
                    total + parseInt(allCartItems[id].price.bdt.price_en_disc)
            )
            .reduce((a, b) => a + b, 0)
    };

    pixelTruck('InitiateCheckout', data);
};

export const addToWishlistPixel = (bookInfo) => {
    const data = {
        content_name: bookInfo.bookname,
        content_category: bookInfo.type,
        content_ids: [bookInfo.bookcode],
        contents: [bookInfo],
        currency: 'BDT',
        value: bookInfo.price
    };
    pixelTruck('AddToWishlist', data);
};

export const completeRegistrationPixel = () => {
    const data = {
        content_name: 'Boighor Registration',
        currency: 'BDT',
        status: true
    };

    pixelTruck('CompleteRegistration', data);
};

export const genreWisePixel = (bookinfo) => {
    pixelCustomTruck(`ViewBook_${bookinfo.genrecode}`, bookinfo);
};

export const viewContentPixel = (bookinfo) => {
    const data = {
        ...bookinfo,
        contents: [bookinfo]
    };
    pixelSingleTruck('ViewContent', data);
};
