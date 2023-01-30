import dataFetcher from './dataFetcher';
import makeAxiosReqbyJSON from './makeAxiosReqbyJSON';
import makeAxiosRequest from './makeAxiosRequest';

//home
export function getHomePaginated(formData) {
    return dataFetcher('getHomePaginated', formData);
}
export function getHomePaginatedAxios(formData) {
    return makeAxiosRequest('getHomePaginated', formData);
}

//Promotion
export function getPromoDetails(formData) {
    return dataFetcher('getPromoDetails', formData);
}

//Book Info
export function getBookInfo(formData) {
    // console.log(formData);
    return dataFetcher('getBookInfo', formData);
}
//Audio Book
export function getAudioBooks(formData) {
    return dataFetcher('getAudioBooks', formData);
}

//Author List
export function getAuthorList(formData) {
    return dataFetcher('getAuthorList', formData);
}

//Author Info
export function getAuthorInfo(formData) {
    return dataFetcher('getAuthorInfo', formData);
}

//Filter Books
export function getBooksByCategory(formData) {
    return dataFetcher('getBooksByCategory', formData);
}
export function getBooksByGenre(formData) {
    return dataFetcher('getBooksByGenre', formData);
}
export function getBooksBySection(formData) {
    return dataFetcher('getBooksBySection', formData);
}
export function getBooksByPublication(formData) {
    return dataFetcher('getBooksByPublication', formData);
}

//subscribe

export function getBundlePaginated(formData) {
    return dataFetcher('getBundlePaginated', formData);

}

export function getBundlePaginatedAxios(formData) {
    return makeAxiosRequest('getBundlePaginated', formData);
}


export function getBundleBooksBySection(formData) {
    return dataFetcher('getBundleBooksBySection', formData);
}
export function getSubscriptionScheme(formData) {
    return dataFetcher('getSubscriptionScheme', formData);
}
export function subscriptionBookAddRequest(formData) {
    return dataFetcher('subscriptionBookAddRequest', formData);
}

export function subscriptionRequest(data) {
    return makeAxiosReqbyJSON('subscription/subscriptionRequest', data);
}
export function subscriptionRequestStatusCheck(data) {
    return makeAxiosReqbyJSON(
        'subscription/subscriptionRequestStatusCheck',
        data
    );
}
export function checkUserSubscriptionHistory(data) {
    return makeAxiosReqbyJSON(
        'subscription/checkUserSubscriptionHistory',
        data
    );
}
export function subscriptionCancelledRequest(data) {
    return makeAxiosReqbyJSON(
        'subscription/subscriptionCancelledRequest',
        data
    );
}

//Footer info
export function getAppInfo(formData) {
    return dataFetcher('getAppInfo', formData);
}

//Wish List
export function get_favourite_list(formData) {
    return makeAxiosRequest('get_favourite_list', formData);
}
export function favourite_add(formData) {
    return makeAxiosRequest('favourite_add', formData);
}
export function favourite_remove(formData) {
    return makeAxiosRequest('favourite_remove', formData);
}

//Search
export function search(formData) {
    return makeAxiosRequest('search', formData);
}
export function search_quick(formData) {
    return makeAxiosRequest('search_quick', formData);
}
//Reviews
export function postReview(formData) {
    return makeAxiosRequest('postReview', formData);
}

//Author
export function followAuthor(formData) {
    return makeAxiosRequest('followAuthor', formData);
}
export function unFollowAuthor(formData) {
    return makeAxiosRequest('unFollowAuthor', formData);
}
//Author Info
export function getAuthorInfoReq(formData) {
    return dataFetcher('getAuthorInfo', formData);
}

//Auth Service
export function loginReq(formData) {
    return makeAxiosRequest('login', formData);
}
export function login_social(formData) {
    return makeAxiosRequest('login_social', formData);
}
export function signupReq(formData) {
    return makeAxiosRequest('signup', formData);
}

//Account
export function getuserinfo(formData) {
    return makeAxiosRequest('getuserinfo', formData);
}
export function updateuserinfo(formData) {
    return makeAxiosRequest('updateuserinfo', formData);
}
export function ownedBooklist(formData) {
    return makeAxiosRequest('ownedBooklist', formData);
}
export function getMyBooks(formData) {
    return makeAxiosRequest('getMyBooks', formData);
}

//Feedback
export function feedback(formData) {
    return makeAxiosRequest('feedback', formData);
}
//Payment
export function promovalidation(data) {
    return makeAxiosReqbyJSON('promocode/promovalidation', data);
}
export function initCheckOut(data) {
    return makeAxiosReqbyJSON('checkout/initCheckOut', data);
}

export function paymentStatusCheckBkash(data) {
    return makeAxiosReqbyJSON('checkout/paymentStatusCheckBkash', data);
}
export function paymentStatusCheckPwallet(data) {
    return makeAxiosReqbyJSON('checkout/paymentStatusCheckPwallet', data);
}
export function paymentStatusCheckStripe(data) {
    return makeAxiosReqbyJSON('checkout/paymentStatusCheckStripe', data);
}
export function paymentStatusCheckCard(data) {
    return makeAxiosReqbyJSON('checkout/paymentStatusCheckCard', data);
}
