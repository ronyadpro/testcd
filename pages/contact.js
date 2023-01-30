import Head from 'next/head';
import Contact from '../src/components/common/footer/Contact';
const Contactpage = () => {
    return (
        <div>
            <Head>
                <title>{'  Contact | Boighor'}</title>
                <meta property="og:title" content=" Contact | Boighor" />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <Contact />
        </div>
    );
};

export default Contactpage;
