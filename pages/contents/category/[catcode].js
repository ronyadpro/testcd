import Head from 'next/head';
import { useRouter } from 'next/router';
import FilteringBook from '../../../src/components/books/FilteringBook';
import CategorialBookSkeleton from '../../../src/components/skeletons/CategorialBookSkeleton';
import { getBooksByCategory } from '../../../src/services/httpServices';
function Category({ booksContent }) {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="container">
                <CategorialBookSkeleton />
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{` ${booksContent?.catname_en} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${booksContent?.catname_en} | Boighor`}
                />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <FilteringBook
                booksContent={booksContent}
                type={'category'}
                code={router.query.catcode}
            />
        </div>
    );
}
export default Category;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    };
}
export async function getStaticProps(context) {
    const { params } = context;

    const formData = {
        page: 1,
        catcode: params.catcode
    };
    // let data = {};
    // try {
    const data = await getBooksByCategory(formData);
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
            booksContent: data?.data,
            key: params.catcode
        },
        revalidate: 5
    };
}
