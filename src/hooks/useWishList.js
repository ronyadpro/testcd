import { useState } from 'react';
import {
    favourite_add,
    favourite_remove,
    get_favourite_list
} from '../services/httpServices';

const useWishList = () => {
    const [wishList, setWishList] = useState([]);

    const getWishList = async (userId) => {
        const formData = {
            userid: userId
        };
        let wishData = [];

        //API CALL
        get_favourite_list(formData).then((res) => {
            if (res?.status?.responseCode === '1') {
                wishData = res.data.contents;
                setWishList(res.data.contents);
            }
        });

        return wishData;
    };

    const addWishList = async (bookCode, userId) => {
        const formData = {
            bookcode: bookCode,
            userid: userId
        };

        favourite_add(formData).then((res) => {
            if (res?.status?.responseCode === '1') {
                // console.log('successfully added');
            }
        });
    };
    const removeWishList = async (bookCode, userId, isAudioBook) => {
        const formData = {
            bookcode: bookCode,
            userid: userId,
            isaudiobook: isAudioBook
        };

        favourite_remove(formData).then((res) => {
            if (res?.status?.responseCode === '1') {
                const restWishList = wishList.filter(
                    (wish) => wish.bookcode !== bookCode
                );
                setWishList(restWishList);
            }
        });
    };

    return {
        wishList,
        getWishList,
        addWishList,
        removeWishList
    };
};

export default useWishList;
