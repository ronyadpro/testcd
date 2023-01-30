import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Breadcrumb from './../../common/Breadcrumb';
import SocialButton from './SocialButton';
const SigninPage = () => {
    const [loginForm, SetLoginForm] = useState(true);

    const handleButton = () => {
        SetLoginForm(!loginForm);
    };
    const {
        user,
        successSignup,
        duplicate,
        forgetMsg,
        socialLogin,
        loginError,
        setLoginError
    } = useAuth();
    const router = useRouter();

    // if (user?.msisdn) {
    //     Router.back();
    // }

    const handleSocialLogin = (user) => {
        const userLogInfo = { ...user._profile, provider: 'facebook' };
        socialLogin(userLogInfo);
        Router.back();
    };

    const handleGoogleLogin = (user) => {
        const userLogInfo = { ...user._profile, provider: 'google' };
        socialLogin(userLogInfo);
        Router.back();
    };

    const handleSocialLoginFailure = (err) => {
        // setLoginError('You closed the login window');
        // console.error('error', err);
    };

    const options = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // required
        auto_select: false, // optional
        cancel_on_tap_outside: false, // optional
        context: 'signin' // optional
    };
    // useEffect(() => {
    //     googleOneTap(options, async (response) => {
    //         console.log(response);
    //         const res = await fetch('/api/google-login', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 token: response.credential
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         const data = await res.json();
    //         console.log('Data' + data);
    //     });

    //send token to the api
    // }, []);

    // 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

    return (
        <div>
            {/* <section className="breadcrumb-section">
                <h2 className="sr-only">Site Breadcrumb</h2>
                <div className="container">
                    <div className="breadcrumb-contents">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        href="/"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Sign in
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section> */}
            <Breadcrumb from={'Sign in'} />
            <div className="contaniner">
                <main className="page-section inner-page-sec-padding-bottom mt--80">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
                                <div className="login-form">
                                    {loginForm ? (
                                        <LoginForm />
                                    ) : (
                                        <RegisterForm
                                            SetLoginForm={SetLoginForm}
                                        />
                                    )}

                                    <div className="col-lg-12 mt--10">
                                        <b>
                                            <button onClick={handleButton}>
                                                {loginForm ? (
                                                    <div>
                                                        New to Boighor?{' '}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    'bold'
                                                            }}
                                                        >
                                                            {'  '}
                                                            Create An Account
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Already account ?{' '}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    'bold'
                                                            }}
                                                        >
                                                            {' '}
                                                            Sign in
                                                        </span>
                                                    </div>
                                                )}
                                            </button>
                                        </b>
                                    </div>
                                    <div className="mt--15">
                                        {loginError && (
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                {loginError}
                                            </div>
                                        )}
                                        {duplicate && (
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                {duplicate}
                                            </div>
                                        )}
                                        {successSignup && (
                                            <div
                                                className="alert alert-success"
                                                role="alert"
                                            >
                                                {successSignup}
                                            </div>
                                        )}
                                        {forgetMsg && (
                                            <div
                                                className="alert alert-warning"
                                                role="alert"
                                            >
                                                {forgetMsg}
                                            </div>
                                        )}
                                    </div>

                                    <div className="social-login">
                                        <div className="col-lg-12 mt--10">
                                            <div className="row">
                                                <div
                                                    className="col-6"
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <SocialButton
                                                        provider="facebook"
                                                        appId="858852647653713"
                                                        onLoginSuccess={
                                                            handleSocialLogin
                                                        }
                                                        onLoginFailure={
                                                            handleSocialLoginFailure
                                                        }
                                                        key={'facebook'}
                                                        onInternetFailure={() => {
                                                            return true;
                                                        }}
                                                    >
                                                        <div className="loginBtn loginBtn--facebook">
                                                            <img
                                                                className="fb-icon"
                                                                src="/assets/image/icon/fbicon.png"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="buttonText"
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                Facebook
                                                            </span>
                                                        </div>
                                                    </SocialButton>
                                                </div>
                                                <div
                                                    className="col-6"
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <SocialButton
                                                        provider="google"
                                                        appId="826750594674-m0kakalt4mb00nngse822ddkgnsk0gs5.apps.googleusercontent.com"
                                                        onLoginSuccess={
                                                            handleGoogleLogin
                                                        }
                                                        onLoginFailure={
                                                            handleSocialLoginFailure
                                                        }
                                                        key={'google'}
                                                        // scope={
                                                        //     'https://www.googleapis.com/auth/user.gender.read'
                                                        // }
                                                    >
                                                        <div
                                                            id="googleBtn"
                                                            className="customGPlusSignIn"
                                                        >
                                                            <img
                                                                className="google-icon"
                                                                src="/assets/image/icon/logoGoogle.svg"
                                                                alt=""
                                                            />
                                                            <span className="buttonText">
                                                                Google
                                                            </span>
                                                        </div>
                                                    </SocialButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SigninPage;
