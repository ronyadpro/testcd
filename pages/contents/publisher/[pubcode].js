import Head from 'next/head';
import { useRouter } from 'next/router';
import FilterByPublication from '../../../src/components/books/FilterByPublication';
import { getBooksByPublication } from '../../../src/services/httpServices';
const publisher = ({ booksContent }) => {
    // console.log(booksContent);
    // console.log(booksContent);
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{` ${booksContent?.catname_en} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${booksContent?.catname_en} | Boighor`}
                />
            </Head>
            <FilterByPublication
                booksContent={booksContent}
                code={router.query.pubcode}
            />
        </div>
    );
};

export default publisher;

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
        catcode: params.pubcode
    };

    const data = await getBooksByPublication(formData);
    // console.log(data);
    if (data.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            booksContent: data.data,
            key: params.pubcode
        },
        revalidate: 5
    };
}
