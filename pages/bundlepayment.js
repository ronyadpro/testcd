import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loading from '../src/components/common/Loading';
import { withProtected } from '../src/hooks/route';
import useAuth from '../src/hooks/useAuth';
import { subscriptionRequestStatusCheck } from '../src/services/httpServices';

const bundlepayment = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { type, status, paymentID, orderid, invoice, spTransID } =
        router.query;
    console.log(type, status, paymentID, orderid, invoice, spTransID);
    const [loading, setLoading] = useState(true);
    const [apiSuccess, setApiSuccess] = useState(false);

    useEffect(async () => {
        setLoading(true);
        if (
            status === 'SUCCEEDED' ||
            status == 'success' ||
            status === 'SUCCESS' ||
            status === 'ACCEPTED'
        ) {
            let data = {
                userid: user.msisdn,
                orderid: localStorage.getItem('subscription_requestid'),
                sptransactionid: '',
                paymentType: ''
            };
            if (type === 'bkash') {
                (data.paymentType = 'bkash'),
                    (data.sptransactionid = paymentID);
            } else if (type === 'portwallet') {
                (data.paymentType = 'portwallet'),
                    (data.sptransactionid = invoice);
            } else if (type === 'card') {
                (data.paymentType = 'card'), (data.sptransactionid = spTransID);
            }

            const res = await subscriptionRequestStatusCheck(data);
            if (
                res.status.responseCode === '1' &&
                res.data.status === 'success'
            ) {
                setApiSuccess(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [type, user]);

    if (apiSuccess) {
        return (
            <div>
                <div className="container">
                    <div className="my--80 text-center">
                        <h1 className=" text-success">
                            {'Successfully Subscribed'}
                        </h1>

                        <div className="mt--30 mb--80">
                            <Link
                                href="/bundle_books"
                                passHref
                                style={{ display: 'block', marginTop: '40px' }}
                            >
                                <button className="btn btn-primary mb--80">
                                    Go to the Bundle Books
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="container">
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {typeof status !== 'undefined' ? (
                            <div className="container">
                                <div className="my--80 text-center">
                                    <h1 className=" text-danger">{'Failed'}</h1>
                                    <h5>
                                        Book purchase failed. Please try again!
                                    </h5>

                                    <div className="mt--30 mb--80">
                                        <Link
                                            href="/subscibe"
                                            passHref
                                            style={{
                                                display: 'block',
                                                marginTop: '40px'
                                            }}
                                        >
                                            <button className="btn btn-primary mb--80">
                                                Go to the Subscibe page
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default withProtected(bundlepayment);
