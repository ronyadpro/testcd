import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { feedback } from '../../../services/httpServices';
import Breadcrumb from '../Breadcrumb';

const Contact = () => {
    const { user } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState();
    useEffect(() => {
        setPhoneNumber(user.loginsrc === null ? user.msisdn.slice(2, 13) : '');
    }, [user]);
    const [option, setOption] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [success, setSucess] = useState('');

    const router = useRouter();
    const handleSubmit = () => {
        setError('');
        setSucess('');
        if (!user.msisdn) {
            router.push('/signin');
            return;
        } else {
            if (option === 'select' || !option) {
                setError('Please select the type.');
                return;
            }
            if (!msg) {
                setError('Please write your feedback.');
                return;
            }

            if (!phoneNumber) {
                setError('Please give your phone number');
                return;
            }
            if (phoneNumber.length !== 11) {
                setError('Your phone number is incorrect!');
                return;
            }
            setError('');

            const formData = {
                userid: user.msisdn,
                appversion: 2,
                mobileno: phoneNumber,
                type: option,
                feedback: msg
            };

            //API Call
            feedback(formData).then((res) => {
                if (res.status.responseCode === '1') {
                    setSucess(
                        "We'll get back to you soon. Stay with us, Thanks"
                    );

                    setMsg('');
                    setPhoneNumber(
                        user.loginsrc === null ? user.msisdn.slice(2, 13) : ''
                    );
                }
            });
        }
    };
    return (
        <div>
            <Breadcrumb from={'Contact'} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="contact_adress mt--20">
                            <div className="address_wrapper">
                                <div className="address">
                                    <div className="icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <p>
                                            <span>Address:</span> E.B. Solutions
                                            Ltd (A concern of EBS Group)
                                            <br />
                                            House 32 (7th Floor), Road 2,
                                            Dhanmondi
                                            <br />
                                            Dhaka 1205,Bangladesh
                                        </p>
                                    </div>
                                </div>
                                <div className="address">
                                    <div className="icon">
                                        <i className="far fa-envelope"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <p>
                                            <span>Email: </span>{' '}
                                            info@boighor.com{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className="address">
                                    <div className="icon">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <p>
                                            <span>Phone:</span> +8801905536011{' '}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-12  mt-md--0">
                        <div className="contact_form">
                            <h3 className="ct_title">Send Us a Message</h3>
                            <div id="contact-form" className="contact-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <select
                                                name="feedbackissue"
                                                id="feedbackissue"
                                                form="feedbackissue"
                                                onChange={(e) => {
                                                    setOption(e.target.value);
                                                }}
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                    padding: '10px',
                                                    width: '50%',
                                                    marginTop: '10px',
                                                    Border: '1px solid #eceff8'
                                                }}
                                            >
                                                <option value="select">
                                                    Select type
                                                </option>
                                                <option value="help">
                                                    What can we help you with?
                                                </option>
                                                <option value="general">
                                                    General
                                                </option>
                                                <option value="techinical">
                                                    Techinical
                                                </option>
                                                <option value="content">
                                                    Content
                                                </option>
                                                <option value="payment">
                                                    Payment
                                                </option>
                                            </select>
                                            <div id="errorfeedbackselect"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label
                                                htmlFor="PhoneNumner"
                                                className="form-label"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="PhoneNumner"
                                                value={phoneNumber}
                                                placeholder="01..."
                                                style={{
                                                    width: '50%',
                                                    display: 'block'
                                                }}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Your Message</label>
                                            <textarea
                                                id="msgfeedback"
                                                name="con_message"
                                                className="form-control"
                                                value={msg}
                                                onChange={(e) =>
                                                    setMsg(e.target.value)
                                                }
                                            ></textarea>
                                            {error && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                    style={{
                                                        padding: '5px 20px'
                                                    }}
                                                >
                                                    {error}
                                                </div>
                                            )}
                                            {success && (
                                                <div
                                                    className="alert alert-success"
                                                    role="alert"
                                                    style={{
                                                        padding: '5px 20px'
                                                    }}
                                                >
                                                    {success}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-btn">
                                            <button
                                                type="submit"
                                                value="submit"
                                                id="submit"
                                                className="btn btn-black"
                                                name="submit"
                                                onClick={handleSubmit}
                                            >
                                                send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
