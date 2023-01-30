import { useEffect, useState } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState({});

    const addCart = (title, author, bookcode, imgUrl, price) => {
        const item = {
            title,
            author,
            bookcode,
            imgUrl,
            price
        };

        const items = { ...getCartItems() };
        items[bookcode] = item;
        setCartItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    };
    const removeItem = (bookcode) => {
        const items = Object.assign({}, cartItems);
        if (items[bookcode]) {
            delete items[bookcode];
            setCartItems(items);

            localStorage.setItem('items', JSON.stringify(items));
        }
    };

    const getCartItems = () => {
        if (localStorage.getItem('items')) {
            setCartItems(JSON.parse(localStorage.getItem('items')));
            return JSON.parse(localStorage.getItem('items'));
        } else return {};
    };

    const removeAllCartItem = () => {
        localStorage.removeItem('items');
        setCartItems({});
    };
    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
    }, []);

    return {
        addCart,
        removeItem,
        cartItems,
        setCartItems,
        removeAllCartItem
    };
};

export default useCart;

// //price Calulation
// let totalPrice = 0;
// let priceList = Object.keys(items).map(
//     (id) => totalPrice + parseInt(items[id].price.bdt.price_en_disc)
// ); //return [20,45,74,85]
// totalPrice = priceList.reduce((a, b) => a + b, 0); //sum all list items

// const cartInfo = {};
// cartInfo.items = items;
// cartInfo.totalPrice = totalPrice;
