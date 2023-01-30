import Link from 'next/link';

const Footer = () => {
    return (
        <div>
            <div className="container mt--30">
                <hr />
            </div>
            <footer className="site-footer mt--30">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className=" col-xl-3 col-lg-4 col-sm-6">
                            <div className="single-footer pb--40">
                                <div className="brand-footer footer-title">
                                    <img
                                        src="/assets/image/logo.svg"
                                        className="logo"
                                        alt="logo"
                                    />
                                </div>
                                <div className="footer-contact">
                                    <p>
                                        <span className="label">Address:</span>
                                        <span className="text">
                                            E.B.Solutions Ltd, House 32,Road 2,
                                            Dhanmondi, Dhaka 1205, Bangladesh
                                        </span>
                                    </p>
                                    <p>
                                        <span className="label">Phone:</span>
                                        <span className="text">
                                            {' '}
                                            &nbsp;+8801905536011
                                        </span>
                                    </p>
                                    <p>
                                        <span className="label">Email:</span>
                                        <span className="text">
                                            &nbsp;&nbsp; info@ebsbd.com
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-3 col-lg-2 col-sm-6 mt--30">
                            <div className="single-footer pb--40">
                                <div className="footer-title">
                                    <h3>Information</h3>
                                </div>
                                <ul className="footer-list normal-list">
                                    <li className="footeritem">
                                        <Link href="/info/about">About </Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/info/help">Help</Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/info/privacy">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/info/terms">
                                            Terms & Condition
                                        </Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/info/license">
                                            License
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=" col-xl-3 col-lg-2 col-sm-6 mt--30">
                            <div className="single-footer pb--40">
                                <div className="footer-title">
                                    <h3>Extra</h3>
                                </div>
                                <ul className="footer-list normal-list">
                                    <li className="footeritem">
                                        <Link href="/account/downloadHistory">
                                            Download History
                                        </Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/account/myprofile">
                                            My Account
                                        </Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/contact">Contact</Link>
                                    </li>
                                    <li className="footeritem">
                                        <Link href="/info/refund-policy">
                                            Refund Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=" col-xl-3 col-lg-4 col-sm-6 mt--30">
                            <div className="footer-title footeritem">
                                <h3>Download App</h3>
                            </div>
                            <div className="newsletter-form footeritem">
                                <button
                                    onClick={() =>
                                        window.open(
                                            'https://apps.apple.com/app/ewap/id1588232196',
                                            '_blank'
                                        )
                                    }
                                >
                                    <img
                                        src="/assets/image/appstore.png"
                                        alt="appstore"
                                    />
                                </button>
                            </div>

                            <div className="newsletter-form footeritem">
                                <button
                                    onClick={() =>
                                        window.open(
                                            'https://play.google.com/store/apps/details?id=com.ebs.boighor',
                                            '_blank'
                                        )
                                    }
                                >
                                    <img
                                        src="/assets/image/google.png"
                                        className="mt--20"
                                        alt="playstore"
                                    />
                                </button>
                            </div>

                            <div className="social-block mt--20 footeritem">
                                <h3 className="title">STAY CONNECTED</h3>
                                <div
                                    className="fb-page fb_iframe_widget fb_iframe_widget_fluid"
                                    data-href="https://www.facebook.com/boighorltd"
                                    data-width="580"
                                    data-hide-cover="false"
                                    data-show-facepile="false"
                                    fb-xfbml-state="rendered"
                                    fb-iframe-plugin-query="app_id=&amp;container_width=146&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fboighorltd&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=false&amp;width=580"
                                >
                                    <span>
                                        <iframe
                                            name="f254d706c3db1"
                                            data-testid="fb:page Facebook Social Plugin"
                                            title="fb:page Facebook Social Plugin"
                                            allowtransparency="true"
                                            allowFullScreen={true}
                                            allow="encrypted-media"
                                            src="https://www.facebook.com/v12.0/plugins/page.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df37968a93c5b988%26domain%3Dboighor.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fboighor.com%252Ff68a1888b639b8%26relation%3Dparent.parent&amp;container_width=146&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fboighorltd&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=false&amp;width=580"
                                            className=""
                                        ></iframe>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p className="copyright-heading">
                            বইঘর-এ আছে শিল্প-সাহিত্যের সব শাখার বই। বাংলা ও
                            ইংরেজি ভাষার পুরনো বা সদ্যপ্রকাশিত কিংবা
                            এক্সক্লুসিভ বই— কী নেই এখানে ? শুধু 'বই পড়া' নয়,
                            আপনার জন্য রয়েছে 'বই শোনা'র (অডিও বুক) দারুণ
                            ব্যবস্থা।
                        </p>
                        <Link href="#" className="payment-block" passHref>
                            <img
                                src="/assets/image/payment_options.png"
                                alt=""
                            />
                        </Link>
                        <p className="copyright-text">
                            {' '}
                            <button
                                onClick={() =>
                                    window.open('https://ebsbd.com/', '_blank')
                                }
                                style={{ color: 'rgb(0,172,177)' }}
                            >
                                {' '}
                                {new Date().getFullYear()} E.B.Solutions Ltd.
                            </button>{' '}
                            All Right Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
