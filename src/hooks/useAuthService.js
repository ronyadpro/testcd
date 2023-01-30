import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { loginReq, login_social, signupReq } from '../services/httpServices';
import { completeRegistrationPixel } from '../utils/pixelEvents';
var FormData = require('form-data');
const useAuthService = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [duplicate, setDuplicate] = useState('');
    const [successSignup, setSuccessSignup] = useState('');
    const [forgetMsg, setForgetMsg] = useState('');
    const [loginError, setLoginError] = useState('');
    useEffect(() => {
        setIsLoading(true);
        const userval = getCurrentUser();
        if (userval) {
            setUser(userval);
            // console.log('from useEffect', userval);
        }
        setIsLoading(false);
    }, []);
    const singup = (phoneNumber) => {
        setDuplicate('');
        setSuccessSignup('');

        const formData = {
            retrieve: 0,
            msisdn: phoneNumber
        };
        signupReq(formData).then((res) => {
            if (res?.status === 'signup') {
                setSuccessSignup(res?.message);
                completeRegistrationPixel();
            } else if (res?.status === 'duplicate') {
                setDuplicate(res?.message);
            }
        });
    };
    const forgetPass = (phoneNumber) => {
        setForgetMsg('');
        setDuplicate('');
        setSuccessSignup('');
        if (phoneNumber.length < 11) {
            setLoginError('Size of mobile number should be 11');
            return;
        }

        const formData = {
            retrieve: 1,
            msisdn: phoneNumber
        };

        signupReq(formData).then((res) => {
            // console.log(res);
            if (res?.status === 'forget') {
                setForgetMsg(res?.message);
            } else {
                setLoginError(res?.message);
            }
        });
    };

    const login = (phoneNumber, password) => {
        // console.log(phoneNumber, password);
        setLoginError('');
        const bodyFormData = new FormData();
        if (String(phoneNumber).length < 11) {
            setLoginError('Size of mobile number should be 11');
            return;
        }
        if (String(password).length < 6) {
            setLoginError('Your password is wrong!');
            return;
        }

        const formData = {
            msisdn: `88${String(phoneNumber)}`,
            password: String(password)
        };

        setIsLoading(true);
        loginReq(formData).then((res) => {
            // console.log(res);
            if (res?.data.token) {
                //encrypt text
                const ciphertext = CryptoJS.AES.encrypt(
                    JSON.stringify(res?.data),
                    process.env.NEXT_PUBLIC_LOGIN_SECRET
                ).toString();
                localStorage.setItem('userInfo', ciphertext);
                setUser(res?.data);
            } else {
                setLoginError('Your phone number or password is wrong!');
            }
            setIsLoading(false);
        });
    };

    const socialLogin = (userInfo) => {
        setLoginError('');

        const formData = {
            msisdn: userInfo.id,
            source: userInfo.provider,
            fullname: userInfo.name,
            email: userInfo.email,
            imgurl: userInfo.profilePicURL
        };
        login_social(formData).then((res) => {
            if (res?.token) {
                //encrypt text
                const ciphertext = CryptoJS.AES.encrypt(
                    JSON.stringify(res),
                    process.env.NEXT_PUBLIC_LOGIN_SECRET
                ).toString();
                localStorage.setItem('userInfo', ciphertext);
                setUser(res);
                setIsLoading(false);
                completeRegistrationPixel();
            } else {
                setLoginError('Something went worng');
            }
        });
    };

    const logout = () => {
        setIsLoading(true);
        setUser({});
        localStorage.removeItem('userInfo');
        setIsLoading(false);
    };
    const getCurrentUser = () => {
        const ciphertext = localStorage.getItem('userInfo');
        if (ciphertext) {
            const bytes = CryptoJS.AES.decrypt(
                ciphertext,
                process.env.NEXT_PUBLIC_LOGIN_SECRET
            );
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    };

    return {
        user,
        isLoading,
        successSignup,
        singup,

        duplicate,
        login,
        socialLogin,
        getCurrentUser,
        forgetPass,
        forgetMsg,
        loginError,
        setLoginError,
        logout
    };
};
export default useAuthService;
