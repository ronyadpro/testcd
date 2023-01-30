import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FcFlashOn } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import { search_quick } from '../../services/httpServices';
const Header = () => {
    const { user, logout } = useAuth();
    // const loaction = useLocation();
    // const navigate = useNavigate();
    const router = useRouter();
    const loaction = router.pathname;
    //show category
    const [showCat, setShowCat] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    //mobile canvas browser open and close
    const [mobBrowser, setMobBrowser] = useState(false);
    const [popGen, setPopGen] = useState(false);
    const [popAuthor, setPopAuthor] = useState(false);
    const [high, setHigh] = useState(false);
    const [topPics, setTopPics] = useState(false);
    const [myAccount, setMyAccount] = useState(false);

    // //Show Cart
    const { cartItems } = useCartContext();
    const [allCartItems, setAllCartItems] = useState(cartItems);

    let total = 0;
    useEffect(() => {
        setAllCartItems(cartItems);
    }, [cartItems]);

    // ______________Search Implement_____________

    const [sugBooks, setSuggBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [searchKey, setSerchKey] = useState('');
    const [totalFound, setTotalFound] = useState(0);

    const handleSearch = (value) => {
        setSerchKey(value);
        setAuthors([]);
        setSuggBooks([]);
        setTotalFound(0);
        if (value.length > 1 && value) {
            const formData = {
                key: value
            };

            search_quick(formData).then((res) => {
                setTotalFound(res?.data?.totalfound);
                setSuggBooks(res?.data?.searchresult[0]?.contents);
                setAuthors(res?.data?.searchresult[1]?.contents);
            });
        }
    };

    // SUGGESTION MENU CONTROL
    const [openSuggMenu, setOpenSuggMenu] = useState(false);
    const handleBtnClick = () => setOpenSuggMenu(true);
    const closeMenu = () => setOpenSuggMenu(false);
    const refSug = useOnclickOutside(() => closeMenu());

    // BROWSWE CATEGORY CONTROL
    const [openBrowseCtrl, setOpenBrowseCtrl] = useState(false);
    const handleBrowseBtnClick = () => {
        if (openBrowseCtrl) setOpenBrowseCtrl(false);
        else setOpenBrowseCtrl(true);
    };
    const closeMenuBrowse = () => setOpenBrowseCtrl(false);
    const refBrowse = useOnclickOutside(() => closeMenuBrowse());

    const handleShowAll = (searchKey) => {
        router.push(`/search?key=${searchKey}`);
        closeMenu();
        setShowCanvas(false);
    };

    function showSearchSuggestion() {
        if (totalFound > 0) {
            return (
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        backgroundColor: '#ffff',
                        padding: '10px',
                        zIndex: '5'
                    }}
                >
                    <div>
                        {sugBooks?.map((book, index) => (
                            <Link
                                key={book.bookcode}
                                href={`/book/${book.bookcode}`}
                                passHref
                            >
                                <div
                                    style={{
                                        border: '1px solid #d6d6d6',
                                        padding: '3px 0 0 0',
                                        margin: '5px 0',
                                        width: '100%'
                                    }}
                                    onClick={() => setOpenSuggMenu(false)}
                                >
                                    <div
                                        className="cart-product"
                                        style={{ width: '425px' }}
                                    >
                                        <div
                                            style={{
                                                width: '60px',
                                                padding: '0 10px'
                                            }}
                                        >
                                            <img src={book.bookcover} alt="" />
                                        </div>
                                        <div className="content">
                                            <h6 id="title-cartitem ">
                                                {book.bookname_bn}
                                            </h6>

                                            <p
                                                style={{
                                                    color: 'gray'
                                                }}
                                            >
                                                {' '}
                                                <Link
                                                    href={`/authordetails/${book.writercode}`}
                                                >
                                                    {book.writer_bn}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {authors?.map((author) => (
                            <Link
                                key={author?.authorcode}
                                href={`/authordetails/${author?.authorcode}`}
                                passHref
                            >
                                <div
                                    style={{
                                        border: '1px solid #d6d6d6',
                                        padding: '7px 0 ',
                                        margin: '5px 0',
                                        width: '100%'
                                    }}
                                >
                                    <div
                                        className="cart-product"
                                        style={{ width: '425px' }}
                                    >
                                        <div
                                            style={{
                                                width: '60px',
                                                padding: '0 10px'
                                            }}
                                        >
                                            <img
                                                src={author?.image}
                                                alt={author?.author_bn}
                                            />
                                        </div>
                                        <div className="content my-auto">
                                            <div>
                                                <h6 id="title-cartitem ">
                                                    {author?.author_bn}{' '}
                                                    <span
                                                        style={{
                                                            color: 'gray',
                                                            fontSize: '.8rem'
                                                        }}
                                                    >
                                                        ( লেখক )
                                                    </span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {/* show Result  */}
                        <div
                            style={{
                                padding: '3px 0 ',
                                width: '100%'
                            }}
                        >
                            <div
                                className="content  "
                                style={{ width: '425px' }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        color: 'gray',
                                        fontSize: '.3 rem',
                                        textAlign: 'right'
                                    }}
                                >
                                    Resutls Found {totalFound}
                                </p>

                                <div
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        textAlign: 'center',
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    <button
                                        style={{
                                            color: 'rgb(45,110,142)'
                                        }}
                                        // href={`/search?key=${searchKey}`}
                                        onClick={() => handleShowAll(searchKey)}
                                    >
                                        <h6>Show All</h6>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (totalFound === 0 && searchKey.length !== 0) {
            return (
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        backgroundColor: '#ffff',
                        padding: '10px',
                        zIndex: '5'
                    }}
                >
                    <div
                        style={{
                            border: '1px solid #d6d6d6',
                            padding: '7px 0 ',
                            margin: '5px 0',
                            width: '425px',
                            textAlign: 'center'
                        }}
                    >
                        <div className="content" style={{ width: '425px' }}>
                            <h6
                                id="title-cartitem "
                                style={{
                                    color: 'rgb(45,110,142)'
                                }}
                            >
                                No Results Found
                            </h6>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {/* <Head></Head> */}
            <div className="site-header header-2 mb--20 d-none d-lg-block">
                <div
                    className="header-middle pt--10 pb--10"
                    style={{ backgroundColor: '#fff' }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <Link href="/" className="site-brand" passHref>
                                    {/* <Image
                                        className="logo"
                                        src="/assets/image/logo.svg"
                                        alt={'logo'}
                                        width={130}
                                        height={35}
                                        layout="responsive"
                                        blurDataURL
                                        placeholder="blur"
                                        quality={70}
                                        priority={true}
                                    /> */}
                                    <a>
                                        <img
                                            className="logo"
                                            src="/assets/image/logo.svg"
                                            alt={'logo'}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div
                                className="col-lg-5"
                                style={{ position: 'relative' }}
                                ref={refSug}
                            >
                                <div className="header-search-block">
                                    <input
                                        type="text"
                                        placeholder="Book name, author, genre, category..."
                                        onChange={(e) =>
                                            handleSearch(e.target.value)
                                        }
                                        onClick={handleBtnClick}
                                    />
                                    {searchKey ? (
                                        <button
                                            onClick={() => {
                                                closeMenu();
                                                router.push(
                                                    `/search?key=${searchKey}`
                                                );
                                            }}
                                        >
                                            111 Search
                                        </button>
                                    ) : (
                                        <button>Search</button>
                                    )}
                                </div>
                                {openSuggMenu && showSearchSuggestion()}
                            </div>
                            <div className="col-lg-4">
                                <div className="main-navigation flex-lg-right">
                                    <div className="cart-widget">
                                        <button
                                            className="px-3 py-2 text-white"
                                            style={{
                                                backgroundColor: '#141414',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                borderRadius: '30px'
                                            }}
                                            onClick={() =>
                                                router.push('/subscribe')
                                            }
                                        >
                                            <FcFlashOn size={25} /> Join Pro
                                            Club
                                        </button>

                                        <div className="cart-block mx-4">
                                            <div
                                                className="text-center"
                                                style={{
                                                    padding: '2px 8px 0 8px',
                                                    borderRadius: '8px',
                                                    boxShadow:
                                                        'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                                }}
                                            >
                                                <i
                                                    className="fas fa-shopping-cart "
                                                    style={{
                                                        fontSize: '16px',
                                                        color: '#2d6e8e',
                                                        marginRight: '5px',
                                                        marginBottom: '10px'
                                                    }}
                                                ></i>
                                                <div className="cart-total">
                                                    <span
                                                        className="fs-5"
                                                        id="text-number"
                                                    >
                                                        {
                                                            Object.keys(
                                                                allCartItems
                                                            ).length
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            {Object.keys(allCartItems)
                                                .length === 0 ? (
                                                <div
                                                    className="cart-dropdown-block"
                                                    id="empty-block"
                                                >
                                                    <div className="single-cart-block">
                                                        <div className="cart text-center ">
                                                            <h5>
                                                                {' '}
                                                                Cart is empty
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="cart-dropdown-block"
                                                    id="cartlist"
                                                >
                                                    <div className="single-cart-block">
                                                        <div id="allitemlist">
                                                            <div className="cart-itemlist">
                                                                {Object.keys(
                                                                    allCartItems
                                                                ).map(
                                                                    (item) => (
                                                                        <div
                                                                            key={
                                                                                item
                                                                            }
                                                                            className="single-cart-block"
                                                                        >
                                                                            <div className="cart-product">
                                                                                <div className="image">
                                                                                    <img
                                                                                        src={
                                                                                            allCartItems[
                                                                                                item
                                                                                            ]
                                                                                                .imgUrl
                                                                                        }
                                                                                        alt="Image"
                                                                                    />
                                                                                </div>
                                                                                <div className="content">
                                                                                    <h3
                                                                                        className="title"
                                                                                        id="title-cartitem"
                                                                                    >
                                                                                        {
                                                                                            allCartItems[
                                                                                                item
                                                                                            ]
                                                                                                .title
                                                                                        }
                                                                                    </h3>
                                                                                    <p>
                                                                                        {
                                                                                            allCartItems[
                                                                                                item
                                                                                            ]
                                                                                                .author
                                                                                        }
                                                                                    </p>
                                                                                    <p
                                                                                        className="price"
                                                                                        id="price-cartitem"
                                                                                    >
                                                                                        {
                                                                                            allCartItems[
                                                                                                item
                                                                                            ]
                                                                                                .price
                                                                                                .bdt
                                                                                                .price_disc
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className=" single-cart-block ">
                                                            <div className="btn-block">
                                                                <Link
                                                                    href="/cart"
                                                                    passHref
                                                                >
                                                                    <button className="btn btn-primary text-white w-100  m-3">
                                                                        CHECKOUT
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="login-block">
                                            {user.msisdn ? (
                                                <button
                                                    onClick={logout}
                                                    className="font-weight-bold"
                                                >
                                                    Sign out
                                                </button>
                                            ) : (
                                                <Link href="/signin">
                                                    <a className="font-weight-bold">
                                                        Sign In
                                                    </a>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom bg-primary">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3" ref={refBrowse}>
                                <nav
                                    className={`category-nav white-nav  ${
                                        openBrowseCtrl ? `show` : ''
                                    } `}
                                >
                                    <div>
                                        <button
                                            onClick={handleBrowseBtnClick}
                                            // onClick={() => setShowCat(!showCat)}
                                            className="category-trigger"
                                            style={{ width: '100%' }}
                                        >
                                            <i className="fa fa-bars"></i>Browse
                                            categories
                                        </button>
                                        <ul
                                            className="category-menu "
                                            onClick={() =>
                                                setOpenBrowseCtrl(false)
                                            }
                                        >
                                            {/* <li className="cat-item">
                                                <Link href="/audiobooks">
                                                    <a>Audio Books</a>
                                                </Link>
                                            </li> */}
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/str`}
                                                >
                                                    <a>Story</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link href="/contents/category/nov">
                                                    <a>Novel</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/pom`}
                                                >
                                                    <a>poem</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link href="/contents/category/atc">
                                                    <a>Article</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/drm`}
                                                >
                                                    <a>Drama</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/cmx`}
                                                >
                                                    <a>Commics</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/trv`}
                                                >
                                                    <a>Travel</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/abi`}
                                                >
                                                    <a>Autobiography</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/his`}
                                                >
                                                    <a>History</a>
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/otr`}
                                                >
                                                    <a>Others</a>
                                                </Link>
                                            </li>
                                            {/* <li className="cat-item">
                                                <a href="#">More Categories</a>
                                            </li> */}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            {/* <div className="col-lg-3"></div> */}
                            <div className="col-lg-9">
                                <div className="main-navigation flex-lg-right">
                                    <ul className="main-menu menu-right main-menu--white li-last-0">
                                        <li className="menu-item">
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/bundle_books">
                                                Pro Club
                                            </Link>
                                        </li>
                                        {/* <!-- Shop --> */}
                                        <li className="menu-item has-children mega-menu">
                                            <a href={'#'}>
                                                Browse{' '}
                                                <i className="fas fa-chevron-down dropdown-arrow"></i>
                                            </a>
                                            <ul className="sub-menu four-column">
                                                <li className="cus-col-25">
                                                    <h3 className="menu-title">
                                                        <Link href="">
                                                            <a>Popular Genre</a>
                                                        </Link>
                                                    </h3>
                                                    <ul className="mega-single-block">
                                                        <li className="menu-item nav-item">
                                                            <Link
                                                                href={
                                                                    '/contents/genre/adv'
                                                                }
                                                            >
                                                                Adventure
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/genre/mys">
                                                                Mystery
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/contents/genre/rom">
                                                                Romance
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/genre/hor">
                                                                Horror
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            {' '}
                                                            <Link href="/contents/genre/dec">
                                                                Detective
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="cus-col-25">
                                                    <h3 className="menu-title">
                                                        {' '}
                                                        <Link href="">
                                                            Popular Authors
                                                        </Link>
                                                    </h3>
                                                    <ul className="mega-single-block">
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A03F0">
                                                                Humayun Ahmed
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A0500">
                                                                Mouri Morium
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A0534">
                                                                <a>
                                                                    Mohammad
                                                                    Nazim Uddin
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A04FB">
                                                                Shanjana Alam
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A03EC">
                                                                Anisul Hoque
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li className="cus-col-25">
                                                    <h3 className="menu-title">
                                                        {' '}
                                                        <Link href="">
                                                            Highlights
                                                        </Link>
                                                    </h3>
                                                    <ul className="mega-single-block">
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/section/new">
                                                                Hot & New
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/section/feb">
                                                                Featured Event
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/authordetails/A0500">
                                                                Featured Authors
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item">
                                                            <Link href="/contents/section/bes">
                                                                Best Seller
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href="/contents/section/ect">
                                                                Editors Choice
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="cus-col-25">
                                                    <h3 className="menu-title">
                                                        <Link href="">
                                                            Publications
                                                        </Link>
                                                    </h3>
                                                    <ul className="mega-single-block">
                                                        {/* <li className="menu-item nav-item">
                                                            <Link href="/contents/section/aub">
                                                                Best Audio book
                                                            </Link>
                                                        </li> */}

                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/publisher/P03F2">
                                                                ANYAPROKASH
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/publisher/P03F4">
                                                                Anyadhara
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/publisher/P03F6">
                                                                Aajob Prokash
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/publisher/P03F8">
                                                                Bibliophile
                                                            </Link>
                                                        </li>
                                                        <li className="menu-item nav-item">
                                                            <Link href="/contents/publisher/P03F7">
                                                                Afsar Brothers
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        {/* <!-- Pages --> */}
                                        {/* <li className="menu-item">
                                            <Link href="/audiobooks">
                                                Audio Books
                                            </Link>
                                        </li> */}
                                        {/* <!-- AUthors --> */}
                                        <li className="menu-item">
                                            <Link href="/authors">Authors</Link>
                                        </li>
                                        {user.msisdn && (
                                            <li className="menu-item has-children">
                                                <a href={void 0}>
                                                    My Account &nbsp;
                                                    <i className="fas fa-chevron-down dropdown-arrow"></i>
                                                </a>
                                                <ul className="sub-menu">
                                                    <li className="menu-item nav-item">
                                                        {' '}
                                                        <Link href="/account/myprofile">
                                                            My Profile
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        {' '}
                                                        <Link href="/account/mylibrary">
                                                            My Library
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/account/wishlist">
                                                            Wish List
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/account/downloadHistory">
                                                            Download History
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/subscribe">
                                                            Subscription
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile  */}
            <div className="site-mobile-menu">
                <header className="mobile-header d-block d-lg-none pt--10 pb-md--10">
                    <div className="container">
                        <div className="row align-items-sm-end align-items-center">
                            <div className="col-md-4 col-7">
                                <Link href="/" className="site-brand">
                                    <a>
                                        <img
                                            src="/assets/image/logo.svg"
                                            className="logo"
                                            alt="logo"
                                        />
                                    </a>

                                    {/* <Image
                                        className="logo"
                                        src="/assets/image/logo.svg"
                                        alt={'logo'}
                                        width={130}
                                        height={35}
                                        layout="responsive"
                                        blurDataURL
                                        placeholder="blur"
                                        quality={70}
                                        priority={true}
                                    /> */}
                                </Link>
                            </div>
                            <div
                                className="col-md-5 order-3 order-md-2"
                                ref={refBrowse}
                            >
                                <nav
                                    className={`category-nav  ${
                                        openBrowseCtrl ? `show` : ''
                                    } `}
                                >
                                    <div>
                                        <button
                                            onClick={handleBrowseBtnClick}
                                            // onClick={() => setShowCat(!showCat)}
                                            className="category-trigger"
                                            style={{ width: '100%' }}
                                        >
                                            <i className="fa fa-bars"></i>Browse
                                            categories
                                        </button>
                                        <ul
                                            className="category-menu "
                                            onClick={() =>
                                                setOpenBrowseCtrl(false)
                                            }
                                        >
                                            {/* <li className="cat-item">
                                                <Link href="/audiobooks">
                                                    Audio Books
                                                </Link>
                                            </li> */}
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/str`}
                                                >
                                                    Story
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/nov`}
                                                >
                                                    Novel
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/pom`}
                                                >
                                                    poem
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/atc`}
                                                >
                                                    Article
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/drm`}
                                                >
                                                    Drama
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/cmx`}
                                                >
                                                    Commics
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/trv`}
                                                >
                                                    Travel
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/abi`}
                                                >
                                                    Autobiography
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/his`}
                                                >
                                                    History
                                                </Link>
                                            </li>
                                            <li className="cat-item">
                                                <Link
                                                    href={`/contents/category/otr`}
                                                >
                                                    Others
                                                </Link>
                                            </li>
                                            {/* <li className="cat-item">
                                                <a href="#">More Categories</a>
                                            </li> */}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-md-3 col-5  order-md-3 text-right">
                                <div className="mobile-header-btns header-top-widget">
                                    <ul className="header-links">
                                        <li className="sin-link menu-item">
                                            <Link
                                                href="/cart"
                                                className="cart-link link-icon cartbtn"
                                            >
                                                <a>
                                                    <div className="cart-total">
                                                        <i
                                                            className="fas fa-shopping-cart"
                                                            style={{
                                                                fontSize:
                                                                    '20px',
                                                                color: '#2d6e8e'
                                                            }}
                                                        ></i>
                                                        <span
                                                            className="text-number"
                                                            id="text-numbersm"
                                                        >
                                                            {
                                                                Object.keys(
                                                                    allCartItems
                                                                ).length
                                                            }
                                                        </span>
                                                    </div>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className="sin-link">
                                            <button
                                                href={void 0}
                                                onClick={() =>
                                                    setShowCanvas(!showCanvas)
                                                }
                                                className="link-icon hamburgur-icon off-canvas-btn"
                                            >
                                                <i
                                                    className="fas fa-bars"
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        color: '#2d6e8e'
                                                    }}
                                                ></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!--Off Canvas Navigation Start--> */}
                <aside
                    className={`off-canvas-wrapper ${showCanvas ? `open` : ''}`}
                >
                    <div
                        className="btn-close-off-canvas"
                        onClick={() => setShowCanvas(!showCanvas)}
                    >
                        <AiOutlineClose />
                    </div>
                    <div className="off-canvas-inner">
                        {/* <!-- search box start --> */}
                        <div className="search-box offcanvas" ref={refSug}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="searchkey"
                                    placeholder="Book name, author, genre, category..."
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    onFocus={handleBtnClick}
                                />
                                <button
                                    className="search-btn"
                                    onClick={() => {
                                        closeMenu();
                                        navigate(`/search/${searchKey}`);
                                    }}
                                >
                                    {/* <i className="fas fa-search"></i> */}
                                    <BsSearch />
                                </button>
                            </div>
                            <div>
                                {openSuggMenu && (
                                    <div style={{ positon: 'relative' }}>
                                        {sugBooks?.map((book) => (
                                            <div
                                                key={book.bookcode}
                                                style={{
                                                    border: '1px solid #d6d6d6',
                                                    padding: '3px 0 0 0',
                                                    margin: '5px 0',
                                                    width: '100%'
                                                }}
                                            >
                                                <div className="cart-product">
                                                    <div
                                                        style={{
                                                            width: '60px',
                                                            padding: '0 10px'
                                                        }}
                                                    >
                                                        <img
                                                            src={book.bookcover}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <Link
                                                            href={`/book/${book.bookcode}`}
                                                            passHref
                                                        >
                                                            <h6 id="title-cartitem ">
                                                                {
                                                                    book.bookname_bn
                                                                }
                                                                <span
                                                                    style={{
                                                                        color: 'gray',
                                                                        fontSize:
                                                                            '.6rem'
                                                                    }}
                                                                >
                                                                    ( বই )
                                                                </span>
                                                            </h6>
                                                        </Link>

                                                        {/* <p
                                                            style={{
                                                                color: 'gray'
                                                            }}
                                                        >
                                                            {' '}
                                                            <Link
                                                                href={`/authordetails/${book.writercode}`}
                                                            >
                                                                {book.writer_bn}
                                                            </Link>
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {authors?.map((author) => (
                                            <div
                                                key={author?.authorcode}
                                                style={{
                                                    border: '1px solid #d6d6d6',
                                                    padding: '7px 0 ',
                                                    margin: '5px 0',
                                                    width: '100%'
                                                }}
                                            >
                                                <div className="cart-product">
                                                    <div
                                                        style={{
                                                            width: '60px',
                                                            padding: '0 10px'
                                                        }}
                                                    >
                                                        <img
                                                            src={author?.image}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <Link
                                                            href={`/authordetails/${author.authorcode}`}
                                                            passHref
                                                        >
                                                            <div>
                                                                <h6 id="title-cartitem ">
                                                                    {
                                                                        author?.author_bn
                                                                    }
                                                                    <span
                                                                        style={{
                                                                            color: 'gray',
                                                                            fontSize:
                                                                                '.6rem'
                                                                        }}
                                                                    >
                                                                        ( লেখক )
                                                                    </span>
                                                                </h6>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {totalFound > 0 ? (
                                            <div style={{}}>
                                                <div className="content  ">
                                                    <p
                                                        style={{
                                                            margin: 0,
                                                            padding: 0,
                                                            color: 'gray',
                                                            fontSize: '.3 rem',
                                                            textAlign: 'right'
                                                        }}
                                                    >
                                                        Resutls Found{' '}
                                                        {totalFound}
                                                    </p>
                                                    <h6
                                                        style={{
                                                            margin: '3px 0 0 0',
                                                            padding: 0,
                                                            textAlign: 'center',
                                                            color: 'rgb(45,110,142)'
                                                        }}
                                                    >
                                                        <h6
                                                            style={{
                                                                color: 'rgb(45,110,142)'
                                                            }}
                                                            onClick={() =>
                                                                handleShowAll(
                                                                    searchKey
                                                                )
                                                            }
                                                        >
                                                            Show All
                                                        </h6>
                                                    </h6>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    backgroundColor: '#ffff',
                                                    padding: '10px',
                                                    zIndex: '5'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '7px 0 ',
                                                        margin: '5px 0',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <div className="content">
                                                        <h6
                                                            id="title-cartitem "
                                                            style={{
                                                                color: 'rgb(45,110,142)'
                                                            }}
                                                        >
                                                            No Results Found
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <!-- search box end -->
                    <!-- mobile menu start --> */}
                        <div className="mobile-navigation">
                            {/* <!-- mobile menu navigation start --> */}
                            <nav className="off-canvas-nav">
                                <ul className="mobile-menu main-mobile-menu">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li
                                        onClick={() =>
                                            setShowCanvas(!showCanvas)
                                        }
                                    >
                                        <Link href="/bundle_books">
                                            Pro Club
                                        </Link>
                                    </li>

                                    <li className="menu-item-has-children">
                                        <button
                                            onClick={() =>
                                                setMobBrowser(!mobBrowser)
                                            }
                                        >
                                            Browse
                                        </button>
                                        <ul
                                            className="sub-menu"
                                            style={
                                                mobBrowser
                                                    ? { display: 'block' }
                                                    : { display: 'none' }
                                            }
                                        >
                                            <li className="menu-item menu-item-has-children">
                                                <button
                                                    href={void 0}
                                                    onClick={() =>
                                                        setPopGen(!popGen)
                                                    }
                                                >
                                                    Popular Genre
                                                </button>
                                                <ul
                                                    className="sub-menu"
                                                    style={
                                                        popGen
                                                            ? {
                                                                  display:
                                                                      'block'
                                                              }
                                                            : {
                                                                  display:
                                                                      'none'
                                                              }
                                                    }
                                                >
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/genre/adv">
                                                            Adventure
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/genre/mys">
                                                            Mystery
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/genre/rom">
                                                            Romance
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/genre/hor">
                                                            Horror
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/genre/dec">
                                                            Detective
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="menu-item-has-children">
                                                <button
                                                    href={void 0}
                                                    onClick={() =>
                                                        setPopAuthor(!popAuthor)
                                                    }
                                                >
                                                    Popular Authors
                                                </button>
                                                <ul
                                                    className="sub-menu"
                                                    style={
                                                        popAuthor
                                                            ? {
                                                                  display:
                                                                      'block'
                                                              }
                                                            : {
                                                                  display:
                                                                      'none'
                                                              }
                                                    }
                                                >
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A03F0">
                                                            Humayun Ahmed
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A0500">
                                                            Mouri Morium
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A0534">
                                                            Mohammad Nazim Uddin
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A04FB">
                                                            Shanjana Alam
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A03EC">
                                                            Anisul Hoque
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <button
                                                    href={void 0}
                                                    onClick={() =>
                                                        setHigh(!high)
                                                    }
                                                >
                                                    Highlights
                                                </button>
                                                <ul
                                                    className="sub-menu"
                                                    style={
                                                        high
                                                            ? {
                                                                  display:
                                                                      'block'
                                                              }
                                                            : {
                                                                  display:
                                                                      'none'
                                                              }
                                                    }
                                                >
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/new">
                                                            Hot & New
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/feb">
                                                            Featured Event
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="authordetails/A0500">
                                                            Featured Authors
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/section/bes">
                                                            Best Seller
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/section/ect">
                                                            Editors Choice
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <button
                                                    onClick={() =>
                                                        setTopPics(!topPics)
                                                    }
                                                >
                                                    Publications
                                                </button>
                                                <ul
                                                    className="sub-menu"
                                                    style={
                                                        topPics
                                                            ? {
                                                                  display:
                                                                      'block'
                                                              }
                                                            : {
                                                                  display:
                                                                      'none'
                                                              }
                                                    }
                                                >
                                                    {/* <li className="menu-item nav-item">
                                                        <Link href="/contents/section/aub">
                                                            Best Audio book
                                                        </Link>
                                                    </li> */}
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/publisher/P03F2">
                                                            ANYAPROKASH
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/publisher/P03F4">
                                                            Anyadhara
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/publisher/P03F6">
                                                            Aajob Prokash
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/publisher/P03F8">
                                                            Bibliophile
                                                        </Link>
                                                    </li>
                                                    <li
                                                        className="menu-item nav-item"
                                                        onClick={() =>
                                                            setShowCanvas(
                                                                !showCanvas
                                                            )
                                                        }
                                                    >
                                                        <Link href="/contents/publisher/P03F7">
                                                            Afsar Brothers
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <li>
                                        <Link href="/audiobooks">
                                            Audio Books
                                        </Link>
                                    </li> */}
                                    <li
                                        onClick={() =>
                                            setShowCanvas(!showCanvas)
                                        }
                                    >
                                        <Link href="/authors">Authors</Link>
                                    </li>
                                    {user.msisdn && (
                                        <li className="menu-item-has-children">
                                            <button
                                                onClick={() =>
                                                    setMyAccount(!myAccount)
                                                }
                                            >
                                                My Account &nbsp;
                                            </button>
                                            <ul
                                                className="sub-menu"
                                                style={
                                                    myAccount
                                                        ? { display: 'block' }
                                                        : { display: 'none' }
                                                }
                                            >
                                                <li
                                                    className="menu-item nav-item"
                                                    onClick={() =>
                                                        setShowCanvas(
                                                            !showCanvas
                                                        )
                                                    }
                                                >
                                                    {' '}
                                                    <Link href="/account/myprofile">
                                                        My Profile
                                                    </Link>
                                                </li>
                                                <li
                                                    className="menu-item nav-item"
                                                    onClick={() =>
                                                        setShowCanvas(
                                                            !showCanvas
                                                        )
                                                    }
                                                >
                                                    {' '}
                                                    <Link href="/account/mylibrary">
                                                        My Library
                                                    </Link>
                                                </li>
                                                <li
                                                    className="menu-item nav-item"
                                                    onClick={() =>
                                                        setShowCanvas(
                                                            !showCanvas
                                                        )
                                                    }
                                                >
                                                    <Link href="/account/wishlist">
                                                        Wish List
                                                    </Link>
                                                </li>
                                                <li
                                                    className="menu-item nav-item"
                                                    onClick={() =>
                                                        setShowCanvas(
                                                            !showCanvas
                                                        )
                                                    }
                                                >
                                                    <Link href="/account/downloadHistory">
                                                        Download History
                                                    </Link>
                                                </li>
                                                <li
                                                    className="menu-item nav-item"
                                                    onClick={() =>
                                                        setShowCanvas(
                                                            !showCanvas
                                                        )
                                                    }
                                                >
                                                    <Link href="/subscribe">
                                                        Subscription
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}

                                    <li
                                        onClick={() =>
                                            setShowCanvas(!showCanvas)
                                        }
                                    >
                                        <Link href="/subscibe">
                                            Join Pro Club
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() =>
                                            setShowCanvas(!showCanvas)
                                        }
                                    >
                                        {user.msisdn ? (
                                            <button
                                                onClick={logout}
                                                className="font-weight-bold"
                                            >
                                                Sign out
                                            </button>
                                        ) : (
                                            <Link
                                                state={{ from: loaction }}
                                                replace
                                                href="/signin"
                                                className="font-weight-bold"
                                            >
                                                Sign In
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </nav>
                            {/* <!-- mobile menu navigation end --> */}
                        </div>
                        {/* <!-- mobile menu end --> */}
                        {/* <nav className="off-canvas-nav">
                        
                    </nav> */}
                        <div className="off-canvas-nav">
                            <div className="contact-list mb--10">
                                <p className="sin-contact">
                                    <i className="fas fa-mobile-alt"></i> +880
                                    1914457857
                                </p>
                                <p className="sin-contact">
                                    <i className="fas fa-envelope"></i>{' '}
                                    info@ebsbd.com
                                </p>
                            </div>
                            <div className="off-canvas-social">
                                <button
                                    onClick={() =>
                                        window.open(
                                            'https://www.facebook.com/boighorltd/',
                                            '_blank'
                                        )
                                    }
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* <!--Off Canvas Navigation End--> */}
            </div>
            <div className="sticky-init fixed-header common-sticky">
                <div className="container d-none d-lg-block">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <Link href="/" className="site-brand" passHref>
                                <a>
                                    <img
                                        src="/assets/image/logo.svg"
                                        className="logo"
                                        alt="logo"
                                    />
                                </a>
                            </Link>
                        </div>

                        <div className="col-lg-8">
                            <div className="main-navigation flex-lg-right">
                                <ul className="main-menu menu-right ">
                                    <li className="menu-item">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link href="/bundle_books">
                                            Pro Club
                                        </Link>
                                    </li>
                                    {/* <!-- Shop --> */}
                                    <li className="menu-item has-children mega-menu">
                                        <a href={void 0}>
                                            Browser{' '}
                                            <i className="fas fa-chevron-down dropdown-arrow"></i>
                                        </a>
                                        <ul className="sub-menu four-column">
                                            <li className="cus-col-25">
                                                <h3 className="menu-title">
                                                    <Link href="">
                                                        Popular Genre
                                                    </Link>
                                                </h3>
                                                <ul className="mega-single-block">
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/genre/adv">
                                                            Adventure
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/genre/mys">
                                                            Mystery
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/contents/genre/rom">
                                                            Romance
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/genre/hor">
                                                            Horror
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/contents/genre/dec">
                                                            Detective
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="cus-col-25">
                                                <h3 className="menu-title">
                                                    <Link href="">
                                                        Popular Authors
                                                    </Link>
                                                </h3>
                                                <ul className="mega-single-block">
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A03F0">
                                                            Humayun Ahmed
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A0500">
                                                            Mouri Morium
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A0534">
                                                            Mohammad Nazim Uddin
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A04FB">
                                                            Shanjana Alam
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A03EC">
                                                            Anisul Hoque
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="cus-col-25">
                                                <h3 className="menu-title">
                                                    {' '}
                                                    <Link href="">
                                                        Highlights
                                                    </Link>
                                                </h3>
                                                <ul className="mega-single-block">
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/section/new">
                                                            Hot & New
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/section/feb">
                                                            Featured Event
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="authordetails/A0500">
                                                            Featured Authors
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="cus-col-25">
                                                <h3 className="menu-title">
                                                    <Link href="">
                                                        Publications
                                                    </Link>
                                                </h3>
                                                <ul className="mega-single-block">
                                                    <li className="menu-item">
                                                        <Link href="/contents/section/bes">
                                                            Best Seller
                                                        </Link>
                                                    </li>
                                                    {/* <li className="menu-item nav-item">
                                                        <Link href="content/aub">
                                                            Best Audio book
                                                        </Link>
                                                    </li> */}
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/section/topten">
                                                            Top 10 Books This
                                                            Week
                                                        </Link>
                                                    </li>
                                                    <li className="menu-item nav-item">
                                                        <Link href="/contents/section/top-writer">
                                                            Top Authors this
                                                            week
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/contents/section/ect">
                                                            Editors Choice
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <!-- Pages --> */}
                                    {/* <li className="menu-item">
                                        <Link href="/audiobooks">
                                            Audio Books
                                        </Link>
                                    </li> */}
                                    {/* <!-- Blog --> */}
                                    <li className="menu-item">
                                        <Link href="/authors">Authors</Link>
                                    </li>
                                    {user.fullname && (
                                        <li className="menu-item has-children">
                                            <a href={void 0}>
                                                My Account &nbsp;
                                                <i className="fas fa-chevron-down dropdown-arrow"></i>
                                            </a>
                                            <ul className="sub-menu">
                                                <li className="menu-item nav-item">
                                                    {' '}
                                                    <Link href="/account/myprofile">
                                                        My Profile
                                                    </Link>
                                                </li>
                                                <li className="menu-item nav-item">
                                                    {' '}
                                                    <Link href="/account/mylibrary">
                                                        My Library
                                                    </Link>
                                                </li>
                                                <li className="menu-item nav-item">
                                                    <Link href="/account/wishlist">
                                                        Wish List
                                                    </Link>
                                                </li>
                                                <li className="menu-item nav-item">
                                                    <Link href="/account/downloadHistory">
                                                        Download History
                                                    </Link>
                                                </li>
                                                <li className="menu-item nav-item">
                                                    <Link href="/subscribe">
                                                        Subspription
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
