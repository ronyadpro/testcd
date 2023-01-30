import Head from 'next/head';
import ViewCart from '../src/components/cart/ViewCart';
const Cart = () => {
    return (
        <div>
            <Head>
                <title>{'  Cart | Boighor'}</title>
                <meta property="og:title" content=" Cart | Boighor" />
            </Head>
            <ViewCart />;
        </div>
    );
};

export default Cart;
