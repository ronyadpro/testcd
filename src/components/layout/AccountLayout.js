import Link from 'next/link';
import { useRouter } from 'next/router';
import { withProtected } from '../../hooks/route';
import Breadcrumb from '../common/Breadcrumb';
const AccountLayout = ({ children }) => {
    const item = 'myprofile';
    const { asPath } = useRouter();

    return (
        <div className="container">
            <Breadcrumb from={'Account'} />

            <div className="page-section inner-page-sec-padding">
                <div className="container">
                    <div className="row">
                        {/* <!-- My Account Tab Menu Start --> */}
                        <div className="col-lg-3 col-12">
                            <div
                                className="myaccount-tab-menu nav"
                                role="tablist"
                            >
                                <Link href="/account/myprofile">
                                    <a
                                        className={
                                            asPath === '/account/myprofile'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <i className="fas fa-tachometer-alt"></i>
                                        My Profile
                                    </a>
                                </Link>
                                <Link href="/account/mylibrary">
                                    <a
                                        className={
                                            asPath === '/account/mylibrary'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <i className="fa fa-book"></i> My
                                        Library
                                    </a>
                                </Link>
                                <Link href="/account/wishlist">
                                    <a
                                        className={
                                            asPath === '/account/wishlist'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <i className="fas fa-heart"></i>{' '}
                                        Wishlist
                                    </a>
                                </Link>
                                <Link href="/account/downloadHistory">
                                    <a
                                        className={
                                            asPath ===
                                            '/account/downloadHistory'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <i className="fas fa-download"></i>{' '}
                                        Download History
                                    </a>
                                </Link>
                            </div>
                        </div>
                        {/* <!-- My Account Tab Menu End -->
                <!-- My Account Tab Content Start --> */}
                        <div className="col-lg-9 col-12 mt--30 mt-lg--0">
                            <div className="tab-content" id="myaccountContent">
                                {/* <!-- Single Tab Content Start --> */}
                                <div
                                    className="tab-pane fade show active"
                                    id="dashboad"
                                    role="tabpanel"
                                >
                                    <div className="myaccount-content">
                                        {children}
                                    </div>
                                </div>

                                {/* <!-- Single Tab Content End --> */}
                            </div>
                        </div>
                        {/* <!-- My Account Tab Content End --> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withProtected(AccountLayout);
