import Head from 'next/head';
import { useRouter } from 'next/router';
import Breadcrumb from '../../src/components/common/Breadcrumb';
import { getPromoDetails } from '../../src/services/httpServices';
const Promotion = ({ content }) => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{'  Promotion | Boighor'}</title>
                <meta property="og:title" content=" Promotion | Boighor" />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <Breadcrumb from={'promotion'} />
            <div className="container">
                <div
                    dangerouslySetInnerHTML={{ __html: content?.promodetails }}
                ></div>
            </div>
        </div>
    );
};

export default Promotion;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    };
}
export async function getStaticProps(context) {
    const { params } = context;

    const formData = {
        promocode: params.promocode
    };
    // let data = {};
    // try {
    const data = await getPromoDetails(formData);
    // } catch (err) {
    //     return {
    //         notFound: true
    //     };
    // }
    if (data.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            content: data?.data
        },
        revalidate: 5
    };
}
