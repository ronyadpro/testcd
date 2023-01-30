import Head from 'next/head';
import AuthorsSection from '../src/components/authors/AuthorsSection';
import Breadcrumb from '../src/components/common/Breadcrumb';
import { getAuthorList } from '../src/services/httpServices';
const Authors = ({ authorsContent }) => {
    return (
        <div>
            <Head>
                <title>{'  Authors | Boighor'}</title>
                <meta property="og:url" content="https://boighor.com/authors" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content=" Authors | Boighor" />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <Breadcrumb from={'authors'} />
            <AuthorsSection authorsContent={authorsContent} />
        </div>
    );
};

export async function getStaticProps() {
    const formData = {
        page: 1
    };

    // let authorsContent = {};
    //api call
    // try {
    const authorsContent = await getAuthorList(formData); // 1st parameter is url endpoint and 2nd parameter is formdata which is an Object.
    if (authorsContent.status.responseCode !== '1') {
        return { notFound: true };
    }
    // } catch (err) {
    //     return {
    //         notFound: true
    //     };
    // }

    return {
        props: { authorsContent: authorsContent?.data },
        revalidate: 5
    };
}
export default Authors;
