import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsHeadphones } from 'react-icons/bs';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import useSubscription from '../../hooks/useSubscription';
import { pixelTruck } from '../../lib/facebookPixel';
const BookCard = ({ book }) => {
    const { addCart, cartItems, removeItem } = useCartContext();
    const [bookInCart, setBookIncart] = useState(false);
    const [isImageError, setIsImageError] = useState(false);

    useEffect(() => {
        setBookIncart(book.bookcode in cartItems);
    }, [cartItems, book.bookcode]);

    const handleCart = () => {
        const pricing = {
            bdt: {
                price_disc: book.bdt_disc,
                price_en_disc: book.bdt_disc_eng
            },
            usd: {
                price: book.usd
            }
        };
        addCart(
            book.bookname_bn,
            book.writer_bn,
            book.bookcode,
            book.bookcover,
            pricing
        );

        //Pixel
        const pixelData = {
            content_ids: [book.bookcode],
            content_name: book.bookname,
            content_type: parseInt(book.adb) === 0 ? 'EBOOK' : 'AUDIO_BOOK',
            contents: [
                {
                    bookcode: book.bookcode,
                    bookname: book.bookname,
                    writer: book.writer,
                    category: book.catcode
                }
            ],
            currency: 'BDT',
            value: book.bdt_disc_eng
        };

        pixelTruck('AddToCart', pixelData);
    };
    const router = useRouter();
    const handleClick = () => {
        router.push(
            `/book/${book.bookcode}/${book.bookname.replace(/ /g, '-')}`
        );
    };

    //subscription

    const routeFrom = router.asPath.split('/')[2];

    const { handleBookAdd, successAddedBookCode } = useSubscription();
    const [bundleAdded, setBundleAdded] = useState(book?.book_added || 0);
    const handleSubBookAdded = (bookid) => {
        handleBookAdd(bookid);
    };

    const { user } = useAuth();
    useEffect(() => {
        if (successAddedBookCode === book.bookcode) {
            setBundleAdded(1);
        }
    }, [successAddedBookCode]);
    useEffect(() => {
        if (!user?.msisdn) {
            setBundleAdded(0);
        }
    }, [user?.msisdn]);
    return (
        <div className="col-lg-2 col-sm-6 col-6" data-testid="book-container">
            <div className="product-card mb--30">
                <div className="product-grid-content">
                    <div
                        className="product-card--body"
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-image p-10">
                            <Link
                                href={`/book/${
                                    book?.bookcode
                                }/${book.bookname.replace(/ /g, '-')}`}
                                passHref
                            >
                                <div className="book-image">
                                    {book?.adb !== '1' ? (
                                        <Image
                                            className="image-wrapper"
                                            src={
                                                isImageError
                                                    ? '/assets/image/no_img.jpg'
                                                    : book.bookcover
                                            }
                                            alt={book.bookname_bn}
                                            width={140}
                                            height={210}
                                            layout="responsive"
                                            blurDataURL
                                            placeholder="blur"
                                            quality={40}
                                            priority={true}
                                            onError={(e) => {
                                                setIsImageError(true);
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            className="image-wrapper"
                                            src={
                                                isImageError
                                                    ? '/assets/image/no_img.jpg'
                                                    : book.bookcover
                                            }
                                            alt={book.bookname_bn}
                                            width={172}
                                            height={172}
                                            layout="responsive"
                                            blurDataURL
                                            placeholder="blur"
                                            quality={40}
                                            priority={true}
                                            onError={(e) => {
                                                setIsImageError(true);
                                            }}
                                        />
                                    )}
                                </div>
                            </Link>

                            {book?.adb !== '1' ? (
                                <div>
                                    {routeFrom !== 'bundleSection' ? (
                                        <div className="hover-contents">
                                            <div className="hover-btns">
                                                {bookInCart ||
                                                book.bdt_eng == '0' ? (
                                                    <button
                                                        className="single-btn"
                                                        style={{
                                                            fontSize: '1.3rem',
                                                            margin: '0 2px'
                                                        }}
                                                        onClick={handleClick}
                                                    >
                                                        <i className="fas fa-solid fa-check"></i>
                                                    </button>
                                                ) : (
                                                    <div className="single-btn">
                                                        <button
                                                            onClick={handleCart}
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        >
                                                            <i
                                                                className="fas fa-cart-plus "
                                                                title="Add  to cart"
                                                                style={{
                                                                    fontSize:
                                                                        '22px',
                                                                    color: '#2d6e8e'
                                                                }}
                                                            ></i>
                                                            {/* <img
                                                    src="/icons/add-cart.png"
                                                    alt="add-cart"
                                                    className="add-cart-card"
                                                /> */}
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="single-btn">
                                                    {' '}
                                                    <FacebookShareButton
                                                        hashtag="#Boighor"
                                                        url={`https://boighor.com/book/${book.bookcode}`}
                                                    >
                                                        <FacebookIcon
                                                            size={28}
                                                            round
                                                        />
                                                    </FacebookShareButton>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {bundleAdded === 0 ? (
                                                <button
                                                    style={{
                                                        position: 'absolute',
                                                        top: '4%',
                                                        right: '-1.8%',
                                                        color: '#0081B4',
                                                        width: '3em'
                                                    }}
                                                    onClick={() =>
                                                        handleSubBookAdded(
                                                            book?.bookcode
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src="/icons/plus-bookmark.png"
                                                        alt="pay_stripe"
                                                    />
                                                    {/* <BsFillBookmarkPlusFill size={38} /> */}
                                                </button>
                                            ) : (
                                                <button
                                                    style={{
                                                        position: 'absolute',
                                                        top: '4%',
                                                        right: '-1.8%',
                                                        color: '#82CD47',
                                                        width: '3em'
                                                    }}
                                                >
                                                    <img
                                                        src="/icons/check-bookmark.png"
                                                        alt="pay_stripe"
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <button
                                        style={{
                                            position: 'absolute',
                                            bottom: '10%',
                                            left: '15%',
                                            backgroundColor: '#01ABB0',
                                            color: 'white',
                                            padding: '3px 6px 5px 6px',

                                            borderRadius: '52px',
                                            opacity: '0.8'
                                        }}
                                        onClick={() =>
                                            router.push(
                                                `/book/${
                                                    book.bookcode
                                                }/${book.bookname.replace(
                                                    / /g,
                                                    '-'
                                                )}`
                                            )
                                        }
                                    >
                                        <BsHeadphones size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="product-header mt--10">
                            <h3
                                // style={{
                                //     textOverflow: 'ellipsis',
                                //     overflow: 'hidden',
                                //     whiteSpace: 'nowrap',
                                //     padding: '2px'
                                // }}
                                title={book.bookname_bn}
                            >
                                <Link
                                    href={`/book/${
                                        book.bookcode
                                    }/${book.bookname.replace(/ /g, '-')}`}
                                    as={`/book/${
                                        book.bookcode
                                    }/${book.bookname.replace(/ /g, '-')}`}
                                >
                                    {/* {book.bookname_bn.length > 14
                                        ? `${book.bookname_bn.slice(0, 14)} ...`
                                        : book.bookname_bn} */}
                                    {book.bookname_bn}
                                </Link>
                            </h3>
                            {book.writercode && (
                                <Link
                                    href={`/authordetails/${book.writercode}`}
                                    className="author"
                                    as={`/authordetails/${book.writercode}`}
                                >
                                    {book.writer_bn}
                                </Link>
                            )}
                        </div>
                        {routeFrom == 'bundleSection' ? null : (
                            <Link
                                href={`/book/${
                                    book.bookcode
                                }/${book.bookname.replace(/ /g, '-')}`}
                                as={`/book/${
                                    book.bookcode
                                }/${book.bookname.replace(/ /g, '-')}`}
                                passHref
                            >
                                {book.isdiscounted ? (
                                    <div className="price-block">
                                        <span className="price">
                                            {book.bdt_disc}
                                        </span>{' '}
                                        <del className="price-old">
                                            {book.bdt}
                                        </del>{' '}
                                    </div>
                                ) : (
                                    <div className="price-block">
                                        <span className="price">
                                            {book.bdt}
                                        </span>{' '}
                                    </div>
                                )}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
