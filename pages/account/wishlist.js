import React from 'react';
import WishList from '../../src/components/account/WishList';
import AccountLayout from '../../src/components/layout/AccountLayout';

const wishlist = () => {
    return <WishList />;
};
wishlist.Layout = AccountLayout;
export default wishlist;
