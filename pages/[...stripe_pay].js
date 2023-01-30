import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useCartContext from '../src/hooks/useCartContext';
import { pixelTruck } from '../src/lib/facebookPixel';
import { paymentStatusCheckStripe } from '../src/services/httpServices';
import PageNotFound from './404';
const CheckStatus = ({ user }) => {
    const router = useRouter();

    const { status, userid, orderid, transactionid } = router?.query;

    const [ip, setIP] = useState('');
    // const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );
        setIP(res.data.data.ip_addr);
    };
    //http://localhost:3000/pwallet/checkpurchase?invoice=51465465sfdgasd&orderid=45z4s6vf4zsd

    //Show Cart
    const { cartItems, removeAllCartItem } = useCartContext();
    const [allCartItems, setAllCartItems] = useState(cartItems);

    let total = 0;
    useEffect(() => {
        setAllCartItems(cartItems);
    }, [cartItems]);

    useEffect(() => {
        setLoading(true);
        getData();
        if (ip) {
            const data = {
                userid: userid,
                fromsrc: 'web',
                sptransactionid: transactionid,
                orderid: orderid,
                ip_addr: ip
            };

            if (status === 'success') {
                paymentStatusCheckStripe(data).then((res) => {
                    if (res?.status?.responseCode === '1') {
                        // setStatus(res?.data?.status);
                        setMessage(res?.data?.message);
                        setContents(res?.data?.contents);
                        // console.log(res.data);

                        //pixel added
                        const pixelData = {
                            content_ids: res?.data?.contents.map(
                                (item) => item.bookcode
                            ),
                            contents: res?.data?.contents,
                            content_type: 'EBOOK',
                            currency: 'BDT',
                            value: Object.keys(allCartItems)
                                .map(
                                    (id) =>
                                        total +
                                        parseInt(
                                            allCartItems[id].price.bdt
                                                .price_en_disc
                                        )
                                )
                                .reduce((a, b) => a + b, 0)
                        };

                        pixelTruck('Purchase', pixelData);
                    }
                    setLoading(false);
                });
                removeAllCartItem();
            } else {
                setLoading(false);
            }
        }
    }, [ip, user, transactionid]);

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

    if (!status) {
        return <PageNotFound />;
    }

    return (
        <div
            className="text-center pt--80"
            style={{ width: '100%', minHeight: '100vh' }}
        >
            {status === 'canceled' ? (
                <div className="mt--80 ">
                    <h1 className=" text-danger">{status?.toUpperCase()}</h1>
                    <h5>Book purchase failed. Please try again!</h5>
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
                    <button className="btn btn-primary mb--80">
                        Go to the home page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CheckStatus;
