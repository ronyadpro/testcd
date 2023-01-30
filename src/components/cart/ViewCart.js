import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BarWave } from 'react-cssfx-loading';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import { initCheckOut, promovalidation } from '../../services/httpServices';
import { initiateCheckoutPixel } from '../../utils/pixelEvents';
import Breadcrumb from '../common/Breadcrumb';

import { BsFillInfoCircleFill } from 'react-icons/bs';
// Better way to reduce bundle size
// import BarWave from "react-cssfx-loading/lib/BarWave";
const ViewCart = () => {
    const { cartItems, removeItem } = useCartContext();
    const [allCartItems, setAllCartItems] = useState({});
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [subTotalPriceDollar, setSubTotalPriceDollar] = useState(0);
    const [termsChecked, setTermsChecked] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [netTotal, setNetTotal] = useState(0);
    const [netTotalDollar, setNetTotalDollar] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [userMsg, setUserMsg] = useState('');
    const [discMsg, setDiscMsg] = useState('');
    const [discData, setDisData] = useState({});
    const [activeGetway, setActiveGetway] = useState({});
    const checkedRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        getSetting();
    }, []);

    const getSetting = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/getappsettings?ip_addr=87.88.44.141&fromsrc=web`
        );

        setActiveGetway(data.data);
        // setActiveGetway
    };

    useEffect(() => {
        setAllCartItems(cartItems);
    }, [cartItems]);

    useEffect(() => {
        let total = 0;
        setSubTotalPrice(
            Object.keys(allCartItems)
                .map(
                    (id) =>
                        total +
                        parseInt(allCartItems[id].price.bdt.price_en_disc)
                )
                .reduce((a, b) => a + b, 0)
        );

        setNetTotal(
            Object.keys(allCartItems)
                .map(
                    (id) =>
                        total +
                        parseInt(allCartItems[id].price.bdt.price_en_disc)
                )
                .reduce((a, b) => a + b, 0)
        );
        let dollar = 0;
        setSubTotalPriceDollar(
            Object.keys(allCartItems)
                .map(
                    (id) =>
                        dollar + parseFloat(allCartItems[id].price.usd.price)
                )
                .reduce((a, b) => a + b, 0)
        );
        let netDollarTotal = 0;
        setNetTotalDollar(
            Object.keys(allCartItems)
                .map(
                    (id) =>
                        netDollarTotal +
                        parseInt(allCartItems[id].price.usd.price)
                )
                .reduce((a, b) => a + b, 0)
        );
        // console.log(totalPrice);
    }, [allCartItems]);

    //IP ADDTESS
    const [ip, setIP] = useState('');

    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );
        setIP(res.data.data.ip_addr);
    };
    useEffect(() => {
        getData();
    }, [ip]);

    const handleRemove = (bookcode) => {
        removeItem(bookcode);
        const items = Object.assign({}, allCartItems);
        setAllCartItems(delete items[bookcode]);
        setDiscount(0);
        setDisData({});
    };
    // -----------------------------check out----------------------
    const { user } = useAuth();
    const [coupon, setCoupon] = useState('');

    const handleApplyCoupon = () => {
        if (!user.msisdn) {
            router.push('/signin');
            return;
        }
        const items = Object.values(allCartItems);
        let newitem = items.map(function (item) {
            return {
                bookcode: item.bookcode,
                price: item.price.bdt.price_en_disc
            };
        });

        const data = {
            userid: user.msisdn,
            fromsrc: 'web',
            details: {
                totalamount: subTotalPrice,
                type: 'cart',
                promocode: coupon,
                items: newitem
            }
        };

        promovalidation(data).then((res) => {
            if (res?.data?.status === 'success') {
                setNetTotal(res?.data?.netpayable);
                setDiscount(res?.data?.discount_amount);
            }
            setDisData(res?.data);
        });
    };

    const [selectedPayment, setSelectedPayment] = useState('portwallet');
    const [loading, setLoading] = useState(false);

    const payment = () => {
        setLoading(true);
        if (!user.msisdn) {
            router.push('/signin');
            setLoading(false);
            return;
        }

        setShowWarning(false);
        setTermsChecked(checkedRef.current.checked);
        if (!checkedRef.current.checked) {
            setShowWarning(true);
            setLoading(false);
            return;
        }
        const items = Object.values(allCartItems);
        let newitem = items.map(function (item) {
            return {
                bookcode: item.bookcode,
                price: item.price.bdt.price_en_disc
            };
        });
        const data = {
            userid: user.msisdn,
            fromsrc: 'web',
            ip_addr: ip,
            details: {
                totalamount:
                    selectedPayment === 'stripe'
                        ? parseFloat(subTotalPriceDollar.toFixed(2)) +
                          parseFloat(
                              parseFloat(
                                  (parseFloat(subTotalPriceDollar).toFixed(2) *
                                      2.9) /
                                      100 +
                                      0.3
                              ).toFixed(2)
                          )
                        : netTotal,
                paymenttype: selectedPayment,
                type: 'cart',
                promocode: selectedPayment === 'stripe' ? '' : coupon,
                items: newitem
            }
        };
        // console.log(data)
        initCheckOut(data).then((res) => {
            initiateCheckoutPixel(allCartItems);
            if (selectedPayment === 'card') {
                localStorage.setItem('city-orderid', res?.data.orderid);
            }
            // console.log(res);
            setLoading(false);
            window.open(res?.data.paymenturl, '_self');
        });
    };

    //English to Bangla
    var finalEnglishToBanglaNumber = {
        0: '০',
        1: '১',
        2: '২',
        3: '৩',
        4: '৪',
        5: '৫',
        6: '৬',
        7: '৭',
        8: '৮',
        9: '৯'
    };

    String.prototype.getDigitBanglaFromEnglish = function () {
        var retStr = this;
        for (var x in finalEnglishToBanglaNumber) {
            retStr = retStr.replace(
                new RegExp(x, 'g'),
                finalEnglishToBanglaNumber[x]
            );
        }
        return retStr;
    };
    return (
        <div>
            <Breadcrumb from={'Cart'} />
            <main className="cart-page-main-block inner-page-sec-padding-bottom">
                <div className="cart_area cart-area-padding  ">
                    <div className="container">
                        {/* <div className="page-section-title">
                            <h1>Cart</h1>
                        </div> */}
                        {Object.keys(allCartItems).length > 0 ? (
                            <div id="cartbook">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div id="cartitemlist">
                                                <div className="cartitemlist">
                                                    <div className="cart-table table-responsive mb--40">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th className="pro-remove tblcouponth">
                                                                        Remove
                                                                    </th>
                                                                    <th className="pro-thumbnail">
                                                                        Cover
                                                                    </th>
                                                                    <th className="pro-title">
                                                                        Book
                                                                    </th>
                                                                    <th className="pro-subtotal">
                                                                        Total
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.keys(
                                                                    allCartItems
                                                                ).map(
                                                                    (
                                                                        bookcode
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                bookcode
                                                                            }
                                                                        >
                                                                            <td className="pro-remove">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleRemove(
                                                                                            bookcode
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {' '}
                                                                                    <i className="fas fa-trash-alt "></i>
                                                                                </button>
                                                                            </td>
                                                                            <td className="pro-thumbnail">
                                                                                <Link
                                                                                    href={`/book/${bookcode}`}
                                                                                >
                                                                                    <a>
                                                                                        <img
                                                                                            src={
                                                                                                allCartItems[
                                                                                                    bookcode
                                                                                                ]
                                                                                                    .imgUrl
                                                                                            }
                                                                                            alt=""
                                                                                        />
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td className="pro-title">
                                                                                <Link
                                                                                    href={`/book/${bookcode}`}
                                                                                >
                                                                                    {
                                                                                        allCartItems[
                                                                                            bookcode
                                                                                        ]
                                                                                            .title
                                                                                    }
                                                                                </Link>
                                                                            </td>
                                                                            <td className="pro-price">
                                                                                <span className="amount">
                                                                                    ৳
                                                                                    {parseInt(
                                                                                        allCartItems[
                                                                                            bookcode
                                                                                        ]
                                                                                            .price
                                                                                            .bdt
                                                                                            .price_en_disc
                                                                                    )
                                                                                        .toString()
                                                                                        .getDigitBanglaFromEnglish()}
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize:
                                                                                                '0.8rem'
                                                                                        }}
                                                                                    >
                                                                                        (
                                                                                        {
                                                                                            '$'
                                                                                        }
                                                                                        {
                                                                                            allCartItems[
                                                                                                bookcode
                                                                                            ]
                                                                                                .price
                                                                                                .usd
                                                                                                .price
                                                                                        }

                                                                                        )
                                                                                    </span>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="cart-summary">
                                                <div className="cart-summary-wrap">
                                                    <h4>
                                                        <span>
                                                            Cart Summary
                                                        </span>
                                                    </h4>
                                                    <p>
                                                        Sub Total{' '}
                                                        <span
                                                            id="txt_subtotal"
                                                            className="text-denger"
                                                        >
                                                            {selectedPayment ===
                                                            'stripe'
                                                                ? `$${subTotalPriceDollar.toFixed(
                                                                      2
                                                                  )}`
                                                                : `৳${subTotalPrice
                                                                      .toString()
                                                                      .getDigitBanglaFromEnglish()}`}
                                                        </span>
                                                    </p>

                                                    {selectedPayment ===
                                                    'stripe' ? (
                                                        <p
                                                            className="mt-2"
                                                            id="discountheading"
                                                            title="This payment will be processed 
through Stripe  and it requires a 
 processing fee"
                                                        >
                                                            Fees{' '}
                                                            <BsFillInfoCircleFill />
                                                            <span
                                                                id="txt_subtotal"
                                                                className="text-denger"
                                                            >
                                                                $
                                                                {parseFloat(
                                                                    (parseFloat(
                                                                        subTotalPriceDollar
                                                                    ).toFixed(
                                                                        2
                                                                    ) *
                                                                        2.9) /
                                                                        100 +
                                                                        0.3
                                                                ).toFixed(2)}
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className="mt-2"
                                                            id="discountheading"
                                                        >
                                                            Discount{' '}
                                                            <span
                                                                id="txt_discount"
                                                                className="text-primary"
                                                            >
                                                                -৳
                                                                {discount
                                                                    .toString()
                                                                    .getDigitBanglaFromEnglish()}
                                                            </span>
                                                        </p>
                                                    )}

                                                    <h2 className=" mt-3">
                                                        Total{' '}
                                                        <span
                                                            id="txt_total"
                                                            className="text-denger"
                                                        >
                                                            {selectedPayment ===
                                                            'stripe'
                                                                ? `$${parseFloat(
                                                                      parseFloat(
                                                                          subTotalPriceDollar.toFixed(
                                                                              2
                                                                          )
                                                                      ) +
                                                                          parseFloat(
                                                                              parseFloat(
                                                                                  (parseFloat(
                                                                                      subTotalPriceDollar
                                                                                  ).toFixed(
                                                                                      2
                                                                                  ) *
                                                                                      2.9) /
                                                                                      100 +
                                                                                      0.3
                                                                              ).toFixed(
                                                                                  2
                                                                              )
                                                                          )
                                                                  ).toFixed(2)}`
                                                                : ` ৳${netTotal
                                                                      .toString()
                                                                      .getDigitBanglaFromEnglish()}`}
                                                        </span>
                                                    </h2>

                                                    {selectedPayment !==
                                                        'stripe' && (
                                                        <div>
                                                            <p className="mt--30">
                                                                {' '}
                                                                Enter your
                                                                coupon code if
                                                                you have one
                                                            </p>
                                                            <div className="row mt-2">
                                                                <div className="col-lg-7 ">
                                                                    <input
                                                                        required=""
                                                                        type="text"
                                                                        name="couponcode"
                                                                        placeholder="Coupon code"
                                                                        id="text_coupon"
                                                                        onBlur={(
                                                                            e
                                                                        ) =>
                                                                            setCoupon(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col-lg-5">
                                                                    <div className="coupon-btn">
                                                                        <input
                                                                            type="submit"
                                                                            id="btn_coupon"
                                                                            className="btn-outlined "
                                                                            name="apply_coupon"
                                                                            value="Apply coupon"
                                                                            onClick={
                                                                                handleApplyCoupon
                                                                            }
                                                                            disabled={
                                                                                selectedPayment ===
                                                                                'stripe'
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    {discData?.status ===
                                                                    'fail' ? (
                                                                        <p
                                                                            className="text-danger"
                                                                            id="text_invalid_coupon"
                                                                        >
                                                                            {
                                                                                discData?.message
                                                                            }
                                                                        </p>
                                                                    ) : (
                                                                        <p
                                                                            className="text-success"
                                                                            id="text_invalid_coupon"
                                                                        >
                                                                            {
                                                                                discData?.usermsg
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className="cart_totals mt--20"
                                                style={{
                                                    paddingLeft: '30px'
                                                }}
                                            >
                                                <div className="row">
                                                    <div className="col-lg-12 mt--20">
                                                        <h5
                                                            style={{
                                                                float: 'right'
                                                            }}
                                                        >
                                                            Select a Payment
                                                            Method
                                                        </h5>
                                                    </div>
                                                    {activeGetway?.pay_portwallet ===
                                                        '1' && (
                                                        <div className="col-lg-12 mt--10">
                                                            <div className="card localpayment">
                                                                <button
                                                                    style={
                                                                        selectedPayment ===
                                                                        'portwallet'
                                                                            ? {
                                                                                  border: '3px solid rgb(51, 51, 51)'
                                                                              }
                                                                            : {}
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedPayment(
                                                                            'portwallet'
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src="/assets/image/local-payment1.png"
                                                                        alt="pay_portwallet"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeGetway?.pay_stripe ===
                                                        '1' && (
                                                        <div className="col-lg-12 mt--10">
                                                            <div className="card stripe">
                                                                <button
                                                                    style={
                                                                        selectedPayment ===
                                                                        'stripe'
                                                                            ? {
                                                                                  border: '3px solid rgb(51, 51, 51)'
                                                                              }
                                                                            : {}
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedPayment(
                                                                            'stripe'
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src="/assets/image/stripepayment1.png"
                                                                        alt="pay_stripe"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeGetway?.pay_bkash ===
                                                        '1' && (
                                                        <div className="col-lg-12 mt--20">
                                                            <div className="card stripe ">
                                                                <button
                                                                    style={
                                                                        selectedPayment ===
                                                                        'bkash'
                                                                            ? {
                                                                                  border: '3px solid rgb(51, 51, 51)'
                                                                              }
                                                                            : {}
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedPayment(
                                                                            'bkash'
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src="/assets/image/bkash_payment_logo1.png"
                                                                        alt="pay_stripe"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeGetway?.pay_city ===
                                                        '1' && (
                                                        <div className="col-lg-12 mt--10">
                                                            <div className="card stripe ">
                                                                <button
                                                                    style={
                                                                        selectedPayment ===
                                                                        'card'
                                                                            ? {
                                                                                  border: '3px solid rgb(51, 51, 51)'
                                                                              }
                                                                            : {}
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedPayment(
                                                                            'card'
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src="/assets/image/city.png"
                                                                        alt="pay_stripe"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="term-block mt--20 ">
                                                    <input
                                                        className="mr--5"
                                                        type="checkbox"
                                                        id="check_tc"
                                                        ref={checkedRef}
                                                        onClick={(e) =>
                                                            setTermsChecked(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <label htmlFor="accept_terms2 ">
                                                        I agree with BoiGhor{' '}
                                                        <Link href="/info/terms">
                                                            <a
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                Terms and
                                                                Condition
                                                            </a>
                                                        </Link>{' '}
                                                        and{' '}
                                                        <Link href="/info/refund-policy">
                                                            <a
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                Refund Policy
                                                            </a>
                                                        </Link>
                                                    </label>
                                                </div>
                                                <button
                                                    className="place-order w-100"
                                                    id="btn_proceed_to_checkout"
                                                    onClick={payment}
                                                >
                                                    {loading ? (
                                                        <div
                                                            style={{
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            {' '}
                                                            <BarWave
                                                                color="#FFFF"
                                                                width="35px"
                                                                heigth="8px"
                                                                duration="3s"
                                                            />
                                                        </div>
                                                    ) : (
                                                        'Place order'
                                                    )}
                                                </button>
                                                {showWarning && (
                                                    <div
                                                        className="alert alert-warning mt--15"
                                                        role="alert"
                                                    >
                                                        Please accept with our
                                                        Terms and Condition
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-lg-12">
                                <div id="cartnobook">
                                    <div className="col-lg-12 mt--80 text-center pb-lg--90">
                                        <h4>
                                            You don&apos;t have any book in your
                                            cart
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <div>
                <div
                    className="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header">
                        <img src="..." className="rounded mr-2" alt="..." />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button
                            type="button"
                            className="ml-2 mb-1 close"
                            data-dismiss="toast"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCart;
