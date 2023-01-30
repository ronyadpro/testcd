import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withProtected } from '../../src/hooks/route';
import useCartContext from '../../src/hooks/useCartContext';
// import { pixelTruck } from '../../src/lib/facebookPixel';
import { paymentStatusCheckBkash } from './../../src/services/httpServices';
//http://boighor.com/?paymentID=TR00115I1670305888452&status=success&apiVersion=1.2.0-beta

const Checkpurchase = ({ user }) => {
    const router = useRouter();
    const { paymentID, status, orderid } = router?.query;
    // console.log(paymentID, status);
    const [ip, setIP] = useState('');
    // const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );

        setIP(res.data.data?.ip_addr);
    };

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
                userid: user?.msisdn,
                fromsrc: 'web',
                sptransactionid: paymentID,
                orderid: orderid,
                ip_addr: ip
            };

            if (status === 'success') {
                paymentStatusCheckBkash(data).then((res) => {
                    if (res?.status?.responseCode === '1') {
                        // setStatus(res?.data?.status);

                        setMessage(res?.data?.message);
                        setContents(res?.data?.contents);

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

                        // pixelTruck('Purchase', pixelData);
                    }
                    setLoading(false);
                });
                removeAllCartItem();
            } else {
                setLoading(false);
            }
        }
    }, [ip, user, paymentID]);

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
        <div
            className="text-center pt--80"
            style={{ width: '100%', height: '68vh' }}
        >
            {status !== 'success' ? (
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

export default withProtected(Checkpurchase);
