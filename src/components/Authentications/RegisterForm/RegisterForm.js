import React, { useState } from 'react';
// import 'react-phone-number-input/style.css';
import useAuth from '../../../hooks/useAuth';

const RegisterForm = ({ SetLoginForm }) => {
    const [number, setNumber] = useState(0);
    const [error, setError] = useState('');
    const { singup } = useAuth();
    const handleSingup = () => {
        setError('');

        if (number.length !== 11)
            setError('Size of mobile number should be 11');
        else {
            const codeWithNumber = `88${number}`;
            // console.log(codeWithNumber);
            singup(codeWithNumber);
            SetLoginForm(true);
        }
    };
    return (
        <div className="usersignup" id="usersignup">
            <h4 className="login-title">Sign up</h4>
            <div className="row">
                <div className="col-md-12 col-12 mb--15">
                    <label htmlFor="email">
                        Mobile Number <span className="logintext">*</span>
                    </label>
                    <input
                        className="mb-0 form-control"
                        type="numner"
                        id="signup-name"
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
                    <button onClick={handleSingup} className="btn btn-outlined">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
