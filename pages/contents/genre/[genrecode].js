import Head from 'next/head';
import { useRouter } from 'next/router';
import FilterByGenre from '../../../src/components/books/FilterByGenre';
import CategorialBookSkeleton from '../../../src/components/skeletons/CategorialBookSkeleton';
import { getBooksByGenre } from '../../../src/services/httpServices';
function Genre({ booksContent }) {
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
                <title>{` ${booksContent?.genre_en} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${booksContent?.genre_en} | Boighor`}
                />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <FilterByGenre
                booksContent={booksContent}
                code={router.query.genrecode}
            />
        </div>
    );
}
export default Genre;

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
        genrecode: params.genrecode
    };

    // let data = {};
    // try {
    const data = await getBooksByGenre(formData);
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
            key: params?.genrecode
        },
        revalidate: 5
    };
}
