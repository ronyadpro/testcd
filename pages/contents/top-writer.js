import Head from 'next/head';
import AuthorSectionItem from '../../src/components/authors/AuthorSectionItem';
import Breadcrumb from '../../src/components/common/Breadcrumb';
import { getAuthorList } from '../../src/services/httpServices';
const TopAuthor = ({ authorsContent }) => {
    return (
        <div>
            <Head>
                <title>{`Top Author | Boighor`}</title>
                <meta property="og:title" content={`Top Author | Boighor`} />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <Breadcrumb from={'authors'} />
            <div className="container">
                <div className="shop-product-wrap grid with-pagination row space-db--20 ">
                    {authorsContent?.contents.map((content) => (
                        <AuthorSectionItem
                            key={content.authorcode}
                            content={content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopAuthor;

export async function getStaticProps() {
    const formData = {
        page: 1,
        catcode: 'top-writer'
    };
    // let authorsContent = {};
    // try {
    const authorsContent = await getAuthorList(formData);
    // } catch (err) {
    //     return {
    //         notFound: true
    //     };
    // }
    if (authorsContent.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: { authorsContent: authorsContent?.data },
        revalidate: 5
    };
}
