import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { withProtected } from '../../src/hooks/route';
import { subscriptionRequestStatusCheck } from '../../src/services/httpServices';

const checksubscription = ({ user }) => {
    const router = useRouter();
    const { status } = router?.query;
    console.log(status);
    // console.log(paymentID, status);
    const [ip, setIP] = useState('');
    // const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [contents, setContents] = useState([]);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'SUCCEEDED') {
            const subscription_requestid = localStorage.getItem(
                'subscription_requestid'
            );
            const data = {
                fromsrc: 'web',
                userid: user.msisdn,
                subscription_requestid
            };
            console.log(data);
            subscriptionRequestStatusCheck(data).then((res) => {
                if (
                    res.status.responseCode === '1' &&
                    res.data.status === 'success'
                ) {
                    setLoading(false);
                    setApiSuccess(true);
                    // router.push('/bundle_books');
                } else {
                    setLoading(true);
                }
            });
        }
    }, [status]);

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

    if (status === 'CANCELED' || status === 'FAILED') {
        return (
            <div>
                <div className="container">
                    <div className="my--80 text-center">
                        <h1 className=" text-danger">{'Failed'}</h1>
                        <h5>Subscription Failed. Please try again!</h5>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="container">
                {loading ? (
                    <div className="my--80 text-center">
                        <h1 className=" text-danger">Loading</h1>
                        <h5> Please wait...!</h5>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default withProtected(checksubscription);
