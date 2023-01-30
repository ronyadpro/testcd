import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
    const [toggle, SetToggle] = useState(true);
    const handleToggle = () => {
        SetToggle(!toggle);
    };
    const [error, setError] = useState('');

    // ___________login__________

    const { register, handleSubmit } = useForm();
    // const [user, setUser] = useState({});
    // const navigate = useNavigate();
    const location = '/';

    const { login, forgetPass, setLoginError } = useAuth();
    const onLoginSubmit = async (data) => {
        login(data.phoneNumber, data.password);
    };

    // ______________forget password ____________
    const [number, setNumber] = useState(0);

    const handdleForget = () => {
        setError('');
        setLoginError('');

        if (number.length !== 11)
            setError('Size of mobile number should be 11');
        else {
            const codeWithNumber = `88${number}`;
            // console.log(codeWithNumber);
            forgetPass(codeWithNumber);
            SetToggle(!toggle);
        }
    };

    return (
        <div className="userlogin" id="userlogin">
            <h4 className="login-title">Sign in</h4>
            {toggle ? (
                <form id="frm_login" onSubmit={handleSubmit(onLoginSubmit)}>
                    <div className="row">
                        <div className="col-md-12 col-12 mb--15">
                            <label htmlFor="email">
                                Mobile Number{' '}
                                <span className="logintext">*</span>
                            </label>
                            <input
                                className="mb-0 form-control"
                                type="number"
                                name="login-name"
                                id="login-name"
                                placeholder="Mobile Number"
                                {...register('phoneNumber', {
                                    required: true
                                })}
                            />
                            <p className="logintext" id="errorloginname"></p>
                        </div>
                        <div className="col-12 mb--20">
                            <label htmlFor="password">
                                Password <span className="logintext">*</span>
                            </label>
                            <input
                                autoComplete="on"
                                className="mb-0 form-control"
                                type="password"
                                name="login-password"
                                id="login-password"
                                placeholder="Enter password"
                                {...register('password', { required: true })}
                            />
                            <p className="logintext" id="errorloginpass"></p>
                        </div>
                        <div className="col-md-12">
                            {/* <button onClick={signIn}>Sign in</button> */}
                            <input
                                className="btn btn-outlined"
                                value="Login"
                                type="submit"
                            />
                        </div>
                    </div>
                </form>
            ) : (
                // forget password
                <div className="userforget mt--20" id="userforget">
                    <h4 className="login-title">Forget Password</h4>
                    <div className="row">
                        <div className="col-md-12 col-12 mb--15">
                            <label htmlFor="email">
                                Mobile Number{' '}
                                <span className="logintext">*</span>
                            </label>
                            <input
                                className="mb-0 form-control"
                                type="number"
                                id="forget-name"
                                placeholder="Mobile Number"
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            {error && (
                                <p className="logintext" id="errorforgettext">
                                    {error}
                                </p>
                            )}
                        </div>
                        <div className="col-md-12">
                            <button
                                onClick={handdleForget}
                                className="btn btn-outlined"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="col-lg-12 mt--10">
                <b>
                    <button onClick={handleToggle}>
                        {toggle ? (
                            <div>
                                <span
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {'  '}
                                    Lost your password ?
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {' '}
                                    Sign in now
                                </span>
                            </div>
                        )}
                    </button>
                </b>
            </div>
        </div>
    );
};

export default LoginForm;
