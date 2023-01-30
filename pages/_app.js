import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import ScrollTop from '../src/components/custom/scrolltop/ScrollTop';
import Layout from '../src/components/layout/Layout';
import AuthProvider from '../src/context/AuthProvider';
import CartProvider from '../src/context/CartProvider';
import SubscriptionProvider from '../src/context/SubscriptionProvider';
import { pageview } from '../src/lib/gtag';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const CustomLayout = Component.Layout || EmptyLayout;

    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    // Hotjar
    useEffect(() => {
        hotjar.initialize(2446540, 6);
    }, []);

    //Facebook Pixel
    function FacebookPixel() {
        useEffect(() => {
            import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                    ReactPixel.init('165110945568148');
                    ReactPixel.pageView();

                    router.events.on('routeChangeComplete', () => {
                        ReactPixel.pageView();
                    });
                });
        });
        return null;
    }

    return (
        <>
            {/* <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-5ZCXB09Y01"
                strategy="afterInteractive"
            />
            {typeof window !== 'undefined' && (
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', , 'G-5ZCXB09Y01');
        `}
                </Script>
            )} */}

            <FacebookPixel />
            <NextNProgress startPosition={0.5} color="#2d6e8e" height={2} />
            <ScrollTop />
            <AuthProvider>
                <CartProvider>
                    <SubscriptionProvider>
                        <Layout>
                            <CustomLayout>
                                <Component {...pageProps} />
                            </CustomLayout>
                        </Layout>
                    </SubscriptionProvider>
                </CartProvider>
            </AuthProvider>
        </>
    );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;
