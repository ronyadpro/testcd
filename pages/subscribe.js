import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../src/components/common/Loading';
import useAuth from '../src/hooks/useAuth';
import {
    getSubscriptionScheme,
    subscriptionCancelledRequest,
    subscriptionRequest
} from '../src/services/httpServices';
const subscribe = () => {
    const [packs, setPack] = useState([]);
    const [cancelCode, setCancelCode] = useState('');
    const [modalshow, setModalshow] = useState(false);

    const router = useRouter();
    const { isLoading, user } = useAuth();

    useEffect(() => {
        if (isLoading === false) {
            const data = {
                msisdn: user.msisdn
            };

            return getSubscriptionScheme(data).then((res) => {
                console.log(res.data);
                setPack(res.data);
            });
        }
    }, [user?.msisdn, isLoading, cancelCode]);

    const [activeGetway, setActiveGetway] = useState({});
    useEffect(() => {
        getSetting();
    }, []);

    const getSetting = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/getappsettings?fromsrc=web`
        );

        setActiveGetway(data.data);
        // setActiveGetway
    };

    //For Bkash subsciption
    const handleSubscription = async (packCode) => {
        if (!user.msisdn) {
            router.push('/signin');
            return;
        }
        const formData = {
            fromsrc: 'web',
            userid: user.msisdn,
            sub_pack_id: packCode
        };
        console.log(formData);
        const res = await subscriptionRequest(formData);
        localStorage.setItem(
            'subscription_requestid',
            res?.data.subscription_requestid
        );
        if (res.status.responseCode === '1') {
            window.open(res?.data.paymentUrl, '_self');
        }
    };
    const [loading, setLoading] = useState(false);
    // For Single bundle Purches
    const handleBundle = async (packCode) => {
        if (!user.msisdn) {
            router.push('/signin');
            return;
        }

        let paymentHtml = ``;
        console.log(activeGetway);
        if (activeGetway?.pay_portwallet_sub === '1') {
            console.log('ok');
            paymentHtml =
                paymentHtml.concat(`  <button type="button"  class="btn my-2 btn-portwallet border ">
                        <img src="/assets/image/local-payment1.png" />
                    </button> `);
        }

        if (activeGetway?.pay_bkash_sub === '1') {
            paymentHtml =
                paymentHtml.concat(`<button type="button" class="btn my-2 btn-bkash border ">
                        <img src="/assets/image/bkash_payment_logo1.png" />
                    </button>`);
        }
        if (activeGetway?.pay_city_sub === '1') {
            paymentHtml =
                paymentHtml.concat(` <button type="button" class="btn my-2 btn-card border ">
                        <img src="/assets/image/city.png"/>
                    </button>`);
        }

        let paymetType = '';
        Swal.fire({
            title: 'Select your payment method',
            html: paymentHtml,
            showCancelButton: true,
            confirmButtonText: 'Conform',
            confirmButtonColor: '#00ACB1',
            didOpen: () => {
                const bkash = document.querySelector('.btn-bkash');
                const card = document.querySelector('.btn-card');
                const portwallet = document.querySelector('.btn-portwallet');

                bkash?.addEventListener('click', () => {
                    card.classList.remove('border-info', 'border-3');
                    portwallet.classList.remove('border-info', 'border-3');
                    bkash.classList.add('border-info', 'border-3');
                    paymetType = 'bkash';
                });
                card?.addEventListener('click', () => {
                    bkash.classList.remove('border-info', 'border-3');
                    portwallet.classList.remove('border-info', 'border-3');
                    card.classList.add('border-info', 'border-3');

                    paymetType = 'card';
                });
                portwallet?.addEventListener('click', () => {
                    card.classList.remove('border-info', 'border-3');
                    bkash.classList.remove('border-info', 'border-3');
                    portwallet.classList.add('border-info', 'border-3');
                    paymetType = 'portwallet';
                });
            }
        }).then(async (result) => {
            setLoading(true);
            if (result.isConfirmed) {
                if (paymetType === '') {
                    handleBundle(packCode);
                    return;
                }
                const formData = {
                    fromsrc: 'web',
                    userid: user.msisdn,
                    sub_pack_id: packCode,
                    paymenttype: paymetType
                };
                const res = await subscriptionRequest(formData);
                localStorage.setItem(
                    'subscription_requestid',
                    res?.data.subscription_requestid
                );
                if (res.status.responseCode === '1') {
                    window.open(res?.data.paymentUrl, '_self');
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
    };
    const handleCancleSubs = (bookcode) => {
        if (!user.msisdn) {
            router.push('/signin');
            return;
        }

        const formData = {
            fromsrc: 'web',
            userid: user.msisdn,
            sub_pack_id: cancelCode
        };

        subscriptionCancelledRequest(formData).then((res) => {
            console.log(res);
            if (res.data.status === 'success') {
                setCancelCode('');
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div
            className="container mb-5"
            style={{
                color: '#4B5563'
            }}
        >
            <h3
                className="mt-5 text-center "
                style={{
                    fontWeight: 600,
                    color: '#374151'
                }}
            >
                আপনার <span style={{ color: '#01ABB0' }}>পছন্দের বই </span> গুলো
                পড়ুন,শুনুন সারা <br /> মাস জুড়ে বই ঘর এ সাবসক্রিপশন করে{' '}
            </h3>

            <div className="row justify-content-center mt-5">
                {packs?.map((pack) => (
                    <div
                        key={pack.sub_pack_id}
                        className="col-12 col-lg-6   mt-3"
                    >
                        <div
                            className="card h-100 px-5 d-flex flex-column justify-content-between"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px'
                            }}
                        >
                            <div className="text-center">
                                <p
                                    style={{
                                        marginTop: '46px'
                                    }}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: pack.sub_pack_name
                                        }}
                                    ></div>
                                </p>
                                <h4
                                    style={{
                                        marginTop: '17px',
                                        color: '#01ABB0',
                                        fontSize: '40px',
                                        fontWeight: 700
                                    }}
                                >
                                    {pack.pack_price_bn} টাকা
                                </h4>
                                <p
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 400,
                                        marginTop: '13px'
                                    }}
                                >
                                    যা যা রয়েছে
                                </p>
                            </div>
                            <div
                                className="mx-auto"
                                style={{
                                    marginTop: '25px'
                                }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: pack.details_bn
                                    }}
                                ></div>
                            </div>
                            <div className="my-4  d-flex justify-content-center align-items-end">
                                {pack.is_subscribed === 1 ? (
                                    <button
                                        className="px-5 py-2 text-white"
                                        style={{
                                            backgroundColor: '#10B981',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            borderRadius: '30px'
                                        }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#cancelModal"
                                        onClick={() =>
                                            setCancelCode(pack.sub_pack_id)
                                        }
                                    >
                                        unsubscribe
                                    </button>
                                ) : (
                                    <button
                                        disabled={pack.is_disabled === 1}
                                        className={`px-5 py-2 text-white `}
                                        style={{
                                            backgroundColor: '#01ABB0',

                                            fontSize: '16px',
                                            fontWeight: 600,
                                            borderRadius: '30px',
                                            opacity:
                                                pack.is_disabled === 1
                                                    ? '30%'
                                                    : '100%'
                                        }}
                                        onClick={() =>
                                            handleBundle(pack.sub_pack_id)
                                        }
                                    >
                                        সাবসক্রিপশন করুন
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className="modal fade show"
                id="cancelModal"
                tabIndex="-1"
                aria-labelledby="cancelModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="cancelModalLabel"
                            >
                                Unsubscribe
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Are you sure?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    borderRadius: '30px'
                                }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: '#10B981',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    borderRadius: '30px'
                                }}
                                onClick={handleCancleSubs}
                                data-bs-dismiss="modal"
                            >
                                Agree
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default subscribe;
