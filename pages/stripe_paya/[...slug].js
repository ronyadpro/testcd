import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { withProtected } from '../../src/hooks/route';
import { paymentStatusCheckStripe } from '../../src/services/httpServices';
const CheckStatus = () => {
    const router = useRouter();
    const slug = router?.query.slug || [];
    console.log(slug);
    const [status, userid, orderid, transectionid] = slug;

    const [statusx, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    //creating function to load ip address from the API
    const [ip, setIP] = useState('');
    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );
        setIP(res.data.data.ip_addr);
    };

    useEffect(() => {
        setLoading(true);
        getData();
        if (ip) {
            const data = {
                userid: userid,
                fromsrc: 'web',
                sptransactionid: transectionid,
                orderid: orderid,
                ip_addr: ip
            };

            paymentStatusCheckStripe(data).then((res) => {
                if (res?.status?.responseCode === '1') {
                    setStatus(res?.data?.status);
                    setMessage(res?.data?.message);
                    setContents(res?.data?.contents);
                }
                setLoading(false);
            });
        }
    }, [ip, userid]);

    if (loading) {
        return (
            <div className="text-center">
                <div className="my--80 ">
                    <h1 className=" text-danger">{status?.toUpperCase()}</h1>
                    <h5>Loading</h5>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            {status === 'failed' ? (
                <div className="my--80 ">
                    <h1 className=" text-danger">{status?.toUpperCase()}</h1>
                    <h5>{message}</h5>
                </div>
            ) : (
                <div className="mt--50 ">
                    <h1 className=" text-success">{status?.toUpperCase()}</h1>
                    <h5>{message}</h5>
                    <div className="container mt--80 ">
                        <h3>My New purchase books</h3>
                        <div className="shop-product-wrap row d-flex justify-content-center mt--20">
                            {contents?.map((book) => (
                                <div
                                    key={book.bookcode}
                                    className="col-lg-2 col-sm-6 col-6"
                                    data-testid="book-container"
                                >
                                    <div className="product-card mb--30">
                                        <div className="product-grid-content">
                                            <div className="product-card--body">
                                                <Link
                                                    href={`/book/${book?.bookcode}`}
                                                    passHref
                                                >
                                                    <div className="card-image p-10 ">
                                                        <div className="imgttt">
                                                            <Image
                                                                className="image-wrapper"
                                                                src={book.cover}
                                                                alt={
                                                                    book.bookname
                                                                }
                                                                width={140}
                                                                height={210}
                                                                layout="responsive"
                                                                blurDataURL
                                                                placeholder="blur"
                                                                quality={70}
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="product-header mt--15">
                                                    <h3
                                                        style={{
                                                            textOverflow:
                                                                'ellipsis',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        title={book.bookname}
                                                    >
                                                        <Link
                                                            href={`/book/${book.bookcode}`}
                                                        >
                                                            {book.bookname
                                                                .length > 14
                                                                ? `${book.bookname.slice(
                                                                      0,
                                                                      14
                                                                  )} ...`
                                                                : book.bookname}
                                                        </Link>
                                                    </h3>
                                                    <p className="author">
                                                        {book.writer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="mt--15 mb--80">
                <Link
                    href="/"
                    passHref
                    style={{ display: 'block', marginTop: '40px' }}
                >
                    <button className="btn btn-primary ">
                        Go to the home page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default withProtected(CheckStatus);
