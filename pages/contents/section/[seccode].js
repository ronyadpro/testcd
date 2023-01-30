import Head from 'next/head';
import { useRouter } from 'next/router';
import FilterBySection from '../../../src/components/books/FilterBySection';
import CategorialBookSkeleton from '../../../src/components/skeletons/CategorialBookSkeleton';
import { getBooksBySection } from '../../../src/services/httpServices';
function Section({ booksContent }) {
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
            {/* {router.query.catcode} */}
            <Head>
                <title>{` ${booksContent?.catname_en} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${booksContent?.catname_en} | Boighor`}
                />
            </Head>
            <FilterBySection
                booksContent={booksContent}
                code={router.query.seccode}
            />
        </div>
    );
}
export default Section;

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
        catcode: params.seccode
    };

    const data = await getBooksBySection(formData);
    if (data.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            booksContent: data.data,
            key: params.seccode
        },
        revalidate: 5
    };
}
