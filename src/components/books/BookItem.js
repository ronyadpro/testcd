import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { BsHeadphones } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import useCartContext from '../../hooks/useCartContext';
import { pixelTruck } from '../../lib/facebookPixel';
import useAuth from './../../hooks/useAuth';
import useSubscription from './../../hooks/useSubscription';
const BookItem = ({ item, isSubsBook }) => {
    const myLoader = ({ src, width, quality }) => {
        return `${item.bookcover}?w=${width}&q=${quality || 75}`;
    };

    const { addCart, cartItems, removeItem } = useCartContext();
    const [bookInCart, setBookIncart] = useState(false);
    useEffect(() => {
        setBookIncart(item.bookcode in cartItems);
    }, [cartItems, item.bookcode]);

    const handleCart = () => {
        const pricing = {
            bdt: {
                price_disc: item.bdt_disc,
                price_en_disc: item.bdt_disc_eng
            },
            usd: {
                price: item.usd
            }
        };
        addCart(
            item.bookname_bn,
            item.writer_bn,
            item.bookcode,
            item.bookcover,
            pricing
        );

        //Pixel
        const pixelData = {
            content_ids: [item.bookcode],
            content_name: item.bookname,
            content_type: parseInt(item.adb) === 0 ? 'EBOOK' : 'AUDIO_BOOK',
            contents: [
                {
                    bookcode: item.bookcode,
                    bookname: item.bookname,
                    writer: item.writer,
                    category: item.catcode
                }
            ],
            currency: 'BDT',
            value: item.bdt_disc_eng
        };

        pixelTruck('AddToCart', pixelData);
    };

    const router = useRouter();
    const handleClick = () => {
        router.push(
            `/book/${item.bookcode}/${item.bookname.replace(/ /g, '-')}`
        );
    };

    //Subscription
    const { handleBookAdd, successAddedBookCode } = useSubscription();
    const [bundleAdded, setBundleAdded] = useState(item?.book_added || 0);
    const handleSubBookAdded = (bookid) => {
        handleBookAdd(bookid);
    };

    const { user } = useAuth();
    useEffect(() => {
        if (successAddedBookCode === item.bookcode) {
            setBundleAdded(1);
        }
    }, [successAddedBookCode]);
    useEffect(() => {
        if (!user?.msisdn) {
            setBundleAdded(0);
        }
    }, [user?.msisdn]);

    return (
        <div className="single-slide books-card">
            <div className="product-card">
                <div className="product-card--body">
                    <div
                        className="card-image content"
                        style={{ cursor: 'pointer' }}
                    >
                        <Link
                            href={`/book/${
                                item.bookcode
                            }/${item.bookname.replace(/ /g, '-')}`}
                            passHref
                        >
                            <img
                                className="book-image"
                                src={item.bookcover}
                                alt={item.bookname_bn}
                                onError={(e) => {
                                    e.target.src = '/assets/image/no_img.jpg';
                                    e.target.style =
                                        'padding: 0px; margin: 0px';
                                }}
                            />
                            {/* <div className="card-image p-20"> */}
                            {/* <div className="book-image">
                                    <Image
                                        className="image-wrapper"
                                        loader={myLoader}
                                        src={item.bookcover}
                                        alt={item.bookname_bn}
                                        height={234}
                                        width={162}
                                        layout="responsive"
                                        blurDataURL
                                        placeholder="blur"
                                        quality={30}
                                        // priority={true}
                                    />
                                </div> */}
                            {/* </div> */}
                        </Link>
                        {!isSubsBook ? (
                            <div className="hover-contents">
                                <div className="hover-btns">
                                    {bookInCart || item.bdt_eng == '0' ? (
                                        <button
                                            className="single-btn"
                                            style={{ fontSize: '1.5rem' }}
                                            onClick={handleClick}
                                        >
                                            <i className="fas fa-solid fa-check"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="single-btn"
                                            onClick={handleCart}
                                        >
                                            <i
                                                className="fas fa-cart-plus "
                                                title="Add  to cart"
                                                style={{
                                                    fontSize: '22px',
                                                    color: '#2d6e8e'
                                                }}
                                            ></i>
                                        </button>
                                    )}

                                    <div className="single-btn">
                                        {' '}
                                        <FacebookShareButton
                                            hashtag="#Boighor"
                                            url={`https://boighor.com/book/${item.bookcode}`}
                                            title="Share on facebook"
                                        >
                                            <FacebookIcon size={28} round />
                                        </FacebookShareButton>
                                    </div>
                                </div>
                            </div>
                        ) : item?.adb === '1' ? (
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
                                            item.bookcode
                                        }/${item.bookname.replace(/ /g, '-')}`
                                    )
                                }
                            >
                                <BsHeadphones size={20} />
                            </button>
                        ) : (
                            <div>
                                {bundleAdded === 0 ? (
                                    <button
                                        style={{
                                            position: 'absolute',
                                            bottom: '5%',
                                            right: '13%',
                                            backgroundColor: '#01ABB0',
                                            color: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            opacity: '0.8'
                                        }}
                                        onClick={() =>
                                            handleSubBookAdded(item?.bookcode)
                                        }
                                    >
                                        <BiAddToQueue size={30} />
                                    </button>
                                ) : (
                                    <button
                                        style={{
                                            position: 'absolute',
                                            bottom: '5%',
                                            right: '13%',
                                            backgroundColor: '#5FD068',
                                            color: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            opacity: '0.8'
                                        }}
                                    >
                                        <GiCheckMark size={28} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="product-header mt--10">
                        <h3
                        // style={{
                        //     textOverflow: 'ellipsis',
                        //     overflow: 'hidden',
                        //     whiteSpace: 'nowrap'
                        // }}
                        // title={item.bookname_bn}
                        >
                            <Link
                                href={`/book/${
                                    item.bookcode
                                }/${item.bookname.replace(/ /g, '-')}`}
                            >
                                {/* <a>
                                    {item.bookname_bn.length > 14
                                        ? `${item.bookname_bn.slice(0, 14)} ...`
                                        : item.bookname_bn}
                                </a> */}
                                {item.bookname_bn}
                            </Link>
                        </h3>
                        <Link
                            href={`/authordetails/${item.writercode}`}
                            className="author"
                        >
                            {item.writer_bn}
                        </Link>
                    </div>
                    {isSubsBook ? null : (
                        <Link
                            href={`/book/${
                                item.bookcode
                            }/${item.bookname.replace(/ /g, '-')}`}
                            passHref
                        >
                            {item.isdiscounted ? (
                                <div className="price-block">
                                    <span className="price">
                                        {item.bdt_disc}
                                    </span>{' '}
                                    <del className="price-old">{item.bdt}</del>{' '}
                                </div>
                            ) : (
                                <div className="price-block">
                                    <span className="price">{item.bdt}</span>{' '}
                                </div>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookItem;
