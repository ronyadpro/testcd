import Document, { Head, Html, Main, NextScript } from 'next/document';
// import styles from './extra.module.css'
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        href="/assets/image/fav-icon.png"
                    />

                    <link
                        rel="stylesheet"
                        type="text/css"
                        media="screen"
                        href="/assets/css/plugins.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        media="screen"
                        href="/assets/css/main.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        media="screen"
                        href="/assets/css/custom.css"
                    />
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="/assets/image/fav-icon.png"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        charSet="UTF-8"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                    />

                    {/* boighor mate tag  */}

                    <meta
                        name="keywords"
                        content="humayun ahmed Pdf,bangla boi pdf,bangla golper boi,bangla e-book,golper boi download,e-book download,boighor,boi download"
                    />

                    {/* <meta property="og:title" content="Boighor - বইঘর" /> */}

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://boighor.com/" />
                    <meta
                        property="og:image"
                        content="https://boighor.com/img/assets/share.jpg"
                    />

                    <meta property="fb:app_id" content="858852647653713" />
                    <meta
                        name="google-site-verification"
                        content="google-site-verification=Jdf8_d93AsvFU_FfNVUdlQFG97kWoVOoStyiniDRZnc"
                    />

                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-5ZCXB09Y01"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}                          
                    gtag('js', new Date());
                    gtag('config', 'G-5ZCXB09Y01');`
                        }}
                    ></script>
                </Head>

                <body>
                    <Main />
                    <NextScript />
                    <script src="/assets/js/plugins.js"></script>
                    {/* <script src="/assets/js/ajax-mail.js"></script> */}
                    <script src="assets/js/custom.js"></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
