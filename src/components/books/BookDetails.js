import axios from 'axios';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import useSubscription from '../../hooks/useSubscription';
import useWishList from '../../hooks/useWishList';
import { pixelCustomTruck, pixelTruck } from '../../lib/facebookPixel';
import { getBookInfo } from '../../services/httpServices';
import { addToWishlistPixel } from '../../utils/pixelEvents';
import AudioPlayer from '../audiobooks/audioplayer/AudioPlayer';
import AuthorBio from '../authors/AuthorsBio';
import Breadcrumb from '../common/Breadcrumb';
import SocialShare from '../custom/SocialShare/SocialShare';
import BookRow from '../home/BookRow';
import Reviews from '../reviews/Reviews';
import BookDetailsSkeleton from '../skeletons/BookDetailsSkeleton';

import Summary from './Summary';

const BookDetails = ({ bookContent }) => {
    const router = useRouter();
    const { asPath } = router;

    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const shareURL = `${origin}${asPath}`;
    // console.log(shereURL);

    const {
        bookdetails,
        publisher,
        author,
        category,
        genre,
        pricing,
        reviews,
        similar,
        categories,
        genres,
        subscription_info
    } = bookContent;
    console.log(subscription_info);
    const [loading, setLoading] = useState(true);
    const [userinfo, setUserinfo] = useState();
    const { isLoading, user } = useAuth();
    const [mylist, setMyList] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(0);
    const [subscriptionInfo, setsubscriptionInfo] = useState(subscription_info);

    const [addSubData, setAddSubData] = useState({});
    const { handleBookAdd, successAddedBookCode } = useSubscription();

    const [isImageError, setIsImageError] = useState(false);

    const [ip, setIP] = useState('');
    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );
        setIP(res.data.data.ip_addr);
    };

    useEffect(() => {
        if (isLoading === false) {
            setLoading(true);
            getData();
            // console.log(user);

            const formData = {
                bookcode: bookdetails.bookcode,
                msisdn: user?.msisdn || '',
                versionCode: 35
            };

            getBookInfo(formData).then((res) => {
                setMyList(res?.data?.bookdetails?.mylist || 0);
                setsubscriptionInfo(res?.data?.subscription_info);
                setIsInWishlist(res?.data?.bookdetails?.wishlist || 0);
            });

            setUserinfo(user);
            setLoading(false);
        }
    }, [user?.msisdn, addSubData, isLoading, successAddedBookCode]);

    const readerRedirect = () => {
        const pixelData = {
            bookcode: bookdetails.bookcode,
            content_name: bookdetails.name_en,
            user_id: user?.msisdn,
            price: pricing.bdt.price_en_disc
        };
        pixelCustomTruck('web_reader', pixelData);

        const readerUrl = process.env.NEXT_PUBLIC_READER_URL;
        // const readerUrl = 'http://localhost:3001/reader';
        const redirectTime = Date.now();
        const preEncriptStr = `${bookdetails.bookcode}////${redirectTime}////${ip}////${user?.msisdn}`; //this is split by '////' from reader app.
        // console.log(preEncriptStr);
        const encriptedUrl = CryptoJS.AES.encrypt(
            JSON.stringify(preEncriptStr),
            'eb$bdre@derb0!gh0r##'
        ).toString();
        // console.log(preEncriptStr);
        return `${readerUrl}/${encriptedUrl}`;
    };
    //Auth Checking

    //active tab sections
    const [activeSection, setActiveSection] = useState({
        summary: bookdetails.type === 'ebook' ? true : false,
        audio: bookdetails.type === 'ebook' ? false : true,
        author: false,
        review: false
    });

    const showReview = () => {
        // setToggleReview(true);
        setActiveSection({
            summary: false,
            audio: false,
            author: false,
            review: true
        });
    };
    const showSummery = () => {
        // setToggleReview(true);
        setActiveSection({
            summary: true,
            audio: false,
            author: false,
            review: false
        });
    };
    const showAudio = () => {
        // setToggleReview(true);
        setActiveSection({
            summary: false,
            audio: true,
            author: false,
            review: false
        });
    };

    const activeSectionFunc = (activeSec) => {
        if (activeSec === 'summary') {
            setActiveSection({
                summary: true,
                audio: false,
                author: false,
                review: false
            });
        } else if (activeSec === 'audio') {
            setActiveSection({
                summary: false,
                audio: true,
                author: false,
                review: false
            });
        } else if (activeSec === 'author') {
            setActiveSection({
                summary: false,
                audio: false,
                author: true,
                review: false
            });
        } else if (activeSec === 'review') {
            setActiveSection({
                summary: false,
                audio: false,
                author: false,
                review: true
            });
        }
    };

    //Cart Management
    const { addCart, cartItems } = useCartContext();
    const [bookInCart, setBookIncart] = useState(false);
    useEffect(() => {
        setBookIncart(bookdetails.bookcode in cartItems);
    }, [cartItems, bookdetails.bookcode]);

    const haddleCart = () => {
        const pricingUp = {
            bdt: {
                price_disc: pricing.bdt.price_disc,
                price_en_disc: pricing.bdt.price_en_disc
            },
            usd: {
                price: pricing.usd.price_en
            }
        };
        addCart(
            bookdetails.name_bn,
            author.author_bn,
            bookdetails.bookcode,
            bookdetails.cover,
            pricingUp
        );

        //Pixel
        const pixelData = {
            content_ids: [bookdetails.bookcode],
            content_name: bookdetails.name_en,
            content_type:
                bookdetails.audiotracks.length === 0 ? 'EBOOK' : 'AUDIO_BOOK',
            contents: [
                {
                    bookcode: bookdetails.bookcode,
                    bookname: bookdetails.name_en,
                    writer: author.author,
                    category: category.catcode
                }
            ],
            currency: 'BDT',
            value: pricing.bdt.price_en_disc
        };

        pixelTruck('AddToCart', pixelData);
    };
    const handleBuyNow = () => {
        haddleCart();
        // navigate('/cart', { state: { from: location } });
        router.push('/cart');
    };

    //WishList management

    const { wishList, addWishList, getWishList, removeWishList } =
        useWishList();
    const [isBookInWishList, setIsBookInWishlis] = useState(false);
    useEffect(() => {
        getWishList(user?.msisdn);

        setIsBookInWishlis(
            wishList
                .map((w) => {
                    return w.bookcode === bookdetails.bookcode ? true : false;
                })
                .includes(true)
        );
    }, [user]);

    const handdleRemoveWishList = () => {
        removeWishList(
            bookdetails.bookcode,
            user.msisdn,
            `${bookdetails.audiotracks.length > 0 ? '1' : 0}`
        );
        setIsInWishlist(0);
    };
    const handdleAddWishList = () => {
        if (!user.msisdn) {
            router.push('/signin');
            return;
        }
        if (isInWishlist === 0) {
            addWishList(bookdetails.bookcode, user.msisdn);
            setIsInWishlist(1);

            const bookInfo = {
                bookcode: bookdetails.bookcode,
                bookname: bookdetails.name_en,
                price: pricing.bdt.price_en_disc,
                type: bookdetails.audiotracks.length > 0 ? 'AUDIOBOOK' : 'EBOOK'
            };

            addToWishlistPixel(bookInfo);
        }
    };
    //Book Preview
    const handlePreview = () => {
        window.open(bookdetails?.previews.ebookpreview, '_blank');
    };

    const reviewsData = {
        reviews: reviews,
        bookcode: bookdetails?.bookcode,
        bookname: bookdetails?.name_bn
    };
    // viewContentPixel({bookinfo})

    // Subscription

    const handleBookAddtoSubsModel = (bookcode) => {
        handleBookAdd(bookcode);
    };

    if (loading) {
        return <BookDetailsSkeleton />;
    }

    return (
        <div>
            <Breadcrumb
                from={
                    bookdetails.language === 'bn'
                        ? bookdetails.name_bn
                        : bookdetails.name_en
                }
            />

            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mb--30 text-center pl-50 px-5">
                        <div className="book-details-image">
                            <Image
                                // className="bookdetail_img"
                                src={
                                    isImageError
                                        ? '/assets/image/no_img.jpg'
                                        : bookdetails.cover
                                }
                                alt={bookdetails.name_en}
                                width={140}
                                height={210}
                                layout="responsive"
                                blurDataURL
                                placeholder="blur"
                                quality={70}
                                priority={true}
                                onError={(e) => {
                                    setIsImageError(true);
                                }}
                            />
                        </div>

                        <div className="compare-wishlist-row ">
                            <div className="fb-like-share mt--30">
                                <SocialShare
                                    shareURL={bookdetails?.shareurl}
                                    title={bookdetails.name_bn}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="product-details-info">
                            <h3 className="product-title">
                                {bookdetails.language === 'bn'
                                    ? bookdetails.name_bn
                                    : bookdetails.name_en}
                            </h3>
                            <ul className="list-unstyled ">
                                <li className="font-weight-bold">
                                    Author
                                    <Link
                                        href={`/authordetails/${author.authorcode}`}
                                    >
                                        <a
                                            className="list-value"
                                            id="authorname"
                                        >
                                            <span className="ml--40">
                                                {bookdetails.language === 'bn'
                                                    ? author.author_bn
                                                    : author.author}
                                            </span>
                                        </a>
                                    </Link>
                                </li>

                                <li className="mt--15 ">
                                    <span className="font-weight-bold">
                                        Language
                                    </span>

                                    <span className="ml--20">
                                        {bookdetails.language === 'bn'
                                            ? 'বাংলা'
                                            : 'English'}
                                    </span>
                                </li>

                                <li className="list-value mt--15 font-weight-bold">
                                    Category{'  '}
                                    <Link
                                        href={`/contents/category/${category.catcode}`}
                                    >
                                        <a className="list-value  categoryname">
                                            <button
                                                type="button"
                                                className="category ml--20"
                                            >
                                                {bookdetails.language === 'bn'
                                                    ? category.catname_bn
                                                    : category.catname_en}
                                            </button>
                                        </a>
                                    </Link>
                                </li>

                                <li className="mt--15 lggenrelist">
                                    <div className="row">
                                        <div className="col-2 font-weight-bold">
                                            Genre
                                        </div>
                                        <div className="col-10">
                                            <span>
                                                {genre.map((gen) => (
                                                    <Link
                                                        href={`/contents/genre/${gen.genrecode}`}
                                                        key={gen.genrecode}
                                                    >
                                                        <a>
                                                            <button
                                                                type="button"
                                                                className="category mb--10"
                                                            >
                                                                {bookdetails.language ===
                                                                'bn'
                                                                    ? gen.genre_bn
                                                                    : gen.genre_en}
                                                            </button>
                                                        </a>
                                                    </Link>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                </li>

                                <li className="mt--15">
                                    <span className="font-weight-bold">
                                        Price
                                    </span>
                                    <span className="price-block">
                                        <span className="price-new ml--45">
                                            {pricing?.bdt.isdiscounted ? (
                                                <span>
                                                    {pricing?.bdt?.price_disc}
                                                    <del className="price-old">
                                                        {pricing?.bdt?.price}
                                                    </del>
                                                </span>
                                            ) : (
                                                <span>
                                                    {pricing?.bdt?.price}
                                                </span>
                                            )}

                                            <span className="bookpriceusd">
                                                {pricing?.usd?.price}
                                            </span>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <div className="rating-widget">
                                <div className="rating-block">
                                    {parseFloat(bookdetails.rating) > 0 ? (
                                        <ReactStars
                                            count={5}
                                            size={30}
                                            value={parseFloat(
                                                bookdetails.rating
                                            )}
                                            edit={false}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <Link href={'#lower_section'} passHref>
                                    <button
                                        onClick={showReview}
                                        style={{
                                            fontSize: '1.3em',
                                            fontWeight: 400
                                        }}
                                    >
                                        {reviews.length} Review {' | '} Write a
                                        review
                                    </button>
                                </Link>
                            </div>
                            <article className="product-details-article">
                                <h4 className="sr-only">Product Summery</h4>
                                <p className="mt--10">{bookdetails.summary}</p>
                            </article>
                            {/* <HashLink
                                smooth
                                to={`/book/${bookdetails.bookcode}`}
                            > */}
                            <Link href={'#lower_section'} passHref>
                                <div className="readmore mt-1">
                                    <button
                                        onClick={showSummery}
                                        style={{
                                            color: 'rgb(0,172,177)'
                                        }}
                                    >
                                        {' '}
                                        Read More &gt;{' '}
                                    </button>
                                </div>
                            </Link>

                            {/* </HashLink> */}
                            <div>
                                <div>
                                    {subscriptionInfo.is_bundle_book === 1 &&
                                    subscriptionInfo.is_subscribe === 1 &&
                                    subscriptionInfo.book_added === 1 ? (
                                        <div className="add-cart-btn mt--30">
                                            <button
                                                type="button"
                                                id="button-buynow"
                                                className="btn btn-outlined--primary ml--20"
                                                onClick={() =>
                                                    window.open(
                                                        readerRedirect(),
                                                        '_blank'
                                                    )
                                                }
                                            >
                                                Read The Book
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>
                                                {pricing.isfree !== '0' ||
                                                mylist !== 0 ||
                                                subscriptionInfo.book_added ===
                                                    1 ? (
                                                    <div className="add-cart-btn mt--30">
                                                        {user?.msisdn ? (
                                                            <div>
                                                                {bookdetails.type ===
                                                                'ebook' ? (
                                                                    <button
                                                                        type="button"
                                                                        id="button-buynow"
                                                                        className="btn btn-outlined--primary ml--20"
                                                                        onClick={() =>
                                                                            window.open(
                                                                                readerRedirect(),
                                                                                '_blank'
                                                                            )
                                                                        }
                                                                    >
                                                                        Read The
                                                                        Book
                                                                    </button>
                                                                ) : null}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                id="button-buynow"
                                                                className="btn btn-outlined--primary ml--20"
                                                                onClick={() =>
                                                                    router.push(
                                                                        '/signin'
                                                                    )
                                                                }
                                                            >
                                                                Please login to
                                                                read the book
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="add-to-cart-row">
                                                        {bookInCart ? (
                                                            <div className="add-cart-btn mt--30">
                                                                <button
                                                                    id="button-cart"
                                                                    className="btn btn-outlined--primary"
                                                                    disabled
                                                                    style={{
                                                                        backgroundColor:
                                                                            'rgb(0,172,177)',
                                                                        color: 'white'
                                                                    }}
                                                                >
                                                                    কার্টে যুক্ত
                                                                    হয়েছে
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="add-cart-btn mt--30">
                                                                <button
                                                                    onClick={
                                                                        haddleCart
                                                                    }
                                                                    id="button-cart"
                                                                    className="btn btn-outlined--primary"
                                                                >
                                                                    কার্টে যুক্ত
                                                                    করুন
                                                                </button>
                                                            </div>
                                                        )}

                                                        {bookInCart ? (
                                                            <div className="add-cart-btn mt--30 ">
                                                                <button
                                                                    type="button"
                                                                    id="button-buynow"
                                                                    className="btn btn-outlined--primary ml--20"
                                                                    disabled
                                                                    style={{
                                                                        backgroundColor:
                                                                            'rgb(0,172,177)',
                                                                        color: 'white'
                                                                    }}
                                                                >
                                                                    বইটি কিনুন
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="add-cart-btn mt--30">
                                                                <button
                                                                    type="button"
                                                                    id="button-buynow"
                                                                    className="btn btn-outlined--primary ml--20"
                                                                    onClick={
                                                                        handleBuyNow
                                                                    }
                                                                >
                                                                    বইটি কিনুন
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        {subscriptionInfo.is_bundle_book ===
                                            1 &&
                                            subscriptionInfo.is_subscribe ===
                                                1 &&
                                            subscriptionInfo.book_added === 0 &&
                                            bookdetails.type === 'ebook' &&
                                            mylist !== 1 && (
                                                <div className="mt--20">
                                                    <button
                                                        id="button-cart"
                                                        className="btn btn-outlined--primary"
                                                        onClick={() =>
                                                            handleBookAddtoSubsModel(
                                                                bookdetails.bookcode
                                                            )
                                                        }
                                                        style={{
                                                            width: '340px'
                                                        }}
                                                    >
                                                        Add this book
                                                    </button>
                                                    <p
                                                        style={{
                                                            fontSize: '.8rem'
                                                        }}
                                                    >
                                                        As you are subscribed
                                                        user you can add this
                                                        books
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        {subscriptionInfo.is_bundle_book ===
                                            1 &&
                                            subscriptionInfo.is_subscribe ===
                                                0 &&
                                            subscriptionInfo.book_added === 0 &&
                                            mylist !== 1 && (
                                                <div className="mt--20">
                                                    <button
                                                        id="button-cart"
                                                        className="btn btn-outlined--primary"
                                                        style={{
                                                            width: '340px'
                                                        }}
                                                        onClick={() =>
                                                            router.push(
                                                                '/subscribe'
                                                            )
                                                        }
                                                    >
                                                        {bookdetails.type ===
                                                        'audiobook'
                                                            ? 'বইটি শুনতে সাবস্ক্রিপশন করুন'
                                                            : 'বইটি পড়তে সাবস্ক্রিপশন করুন'}
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        {bookdetails?.audiotracks?.length > 0 &&
                                        user?.msisdn &&
                                        (subscriptionInfo.book_added === 1 ||
                                            mylist === 1 ||
                                            pricing.isfree === 1) ? (
                                            <Link
                                                href={'#lower_section'}
                                                passHref
                                            >
                                                <button
                                                    type="button"
                                                    id="button-buynow"
                                                    className="btn btn-outlined--primary mt--20"
                                                    onClick={showAudio}
                                                    style={{
                                                        width: '340px'
                                                    }}
                                                >
                                                    বইটি শুনুন
                                                </button>
                                            </Link>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="compare-wishlist-row mt--30">
                                {isInWishlist ? (
                                    <button
                                        onClick={handdleRemoveWishList}
                                        className="dotted-button"
                                    >
                                        <i
                                            className="fas fa-heart"
                                            style={{
                                                color: 'rgb(0,172,177)'
                                            }}
                                        ></i>
                                        <span
                                            id="wishlisttext"
                                            className="ml--5 mr--20"
                                        >
                                            Remove from Wish List
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handdleAddWishList}
                                        className="dotted-button"
                                    >
                                        <i className="fas fa-heart"></i>
                                        <span
                                            id="wishlisttext"
                                            className="ml--5 mr--20"
                                        >
                                            Add to Wish List
                                        </span>
                                    </button>
                                )}
                                {bookdetails?.ebook_preview !== '0' ? (
                                    <button
                                        className="ms-2 dotted-button"
                                        onClick={handlePreview}
                                    >
                                        <i className="fas fa-eye"></i>
                                        <span className="ml--5">
                                            Preview Book
                                        </span>
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        {/* _____ */}
                    </div>
                </div>
                <div className="container pt--30" id="lower_section">
                    <div className="col-lg-12">
                        <div className="sb-custom-tab review-tab mt--50 mtsm--30">
                            <ul
                                className="nav nav-tabs nav-style-2"
                                id="myTab2"
                                role="tablist"
                            >
                                {bookdetails.summary.length !== 0 && (
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <button
                                            className={`nav-link ${
                                                activeSection.summary
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            id="summery-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#summery"
                                            type="button"
                                            role="tab"
                                            aria-controls="summery"
                                            aria-selected={`"${activeSection.summary}"`}
                                            onClick={() => {
                                                activeSectionFunc('summary');
                                            }}
                                        >
                                            Summary
                                        </button>
                                    </li>
                                )}

                                {bookdetails?.audiotracks?.length ? (
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <button
                                            className={`nav-link ${
                                                activeSection.audio
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            id="audio-books-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#audio-books"
                                            type="button"
                                            role="tab"
                                            aria-controls="audio-books"
                                            aria-selected={`"${activeSection.audio}"`}
                                            onClick={() => {
                                                activeSectionFunc('audio');
                                            }}
                                        >
                                            Audio Book
                                        </button>
                                    </li>
                                ) : (
                                    ''
                                )}
                                {author.bio.length !== 0 && (
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <button
                                            className={`nav-link ${
                                                activeSection.author
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            id="author-details-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#author-details"
                                            type="button"
                                            role="tab"
                                            aria-controls="author-details"
                                            aria-selected={`"${activeSection.author}"`}
                                            onClick={() => {
                                                activeSectionFunc('author');
                                            }}
                                        >
                                            Author Details
                                        </button>
                                    </li>
                                )}

                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${
                                            activeSection.review ? 'active' : ''
                                        }`}
                                        id="review-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#review"
                                        type="button"
                                        role="tab"
                                        aria-controls="review"
                                        aria-selected={`"${activeSection.review}"`}
                                        onClick={() => {
                                            activeSectionFunc('review');
                                        }}
                                    >
                                        Review
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="tab-content space-db--20"
                            id="myTabContent"
                        >
                            <div
                                className={`tab-pane show ${
                                    activeSection.summary ? 'active' : ''
                                }`}
                                id="summery"
                                role="tabpanel"
                                aria-labelledby="summery-tab"
                            >
                                <Summary summary={bookdetails.summary} />
                            </div>
                            {/* {bookdetails?.audiotracks?.length &&
                            user?.msisdn &&
                            (subscriptionInfo.book_added === 1 ||
                                mylist === 1 ||
                                pricing.isfree == 1) ? (
                                <div
                                    className={`tab-pane show ${
                                        activeSection.audio ? 'active' : ''
                                    }`}
                                    id="audio-books"
                                    role="tabpanel"
                                    aria-labelledby="audio-books-tab"
                                >
                                    <AudioPlayer
                                        audiotracks={bookdetails?.audiotracks}
                                        previews={bookdetails?.previews}
                                        access={
                                            subscriptionInfo.book_added ||
                                            mylist
                                        }
                                    />
                                </div>
                            ) : (
                                
                            )} */}
                            <div
                                className={`tab-pane show ${
                                    activeSection.audio ? 'active' : ''
                                }`}
                                id="audio-books"
                                role="tabpanel"
                                aria-labelledby="audio-books-tab"
                            >
                                <AudioPlayer
                                    audiotracks={bookdetails?.audiotracks}
                                    previews={bookdetails?.previews}
                                    access={
                                        subscriptionInfo.book_added || mylist
                                    }
                                />
                            </div>
                            <div
                                className={`tab-pane show ${
                                    activeSection.author ? 'active' : ''
                                }`}
                                id="author-details"
                                role="tabpanel"
                                aria-labelledby="author-details-tab"
                            >
                                <AuthorBio bio={author.bio} />
                            </div>
                            <div
                                className={`tab-pane show ${
                                    activeSection.review ? 'active' : ''
                                }`}
                                id="review"
                                role="tabpanel"
                                aria-labelledby="review-tab"
                            >
                                <Reviews
                                    bookcode={bookdetails?.bookcode}
                                    user={user}
                                    reviewsData={reviewsData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt--30">
                {similar.map((books) =>
                    books.contents.length ? (
                        <BookRow
                            key={books.catcode}
                            title={books.catname_bn}
                            contents={books.contents}
                        />
                    ) : (
                        ''
                    )
                )}
            </div>
        </div>
    );
};

export default BookDetails;
