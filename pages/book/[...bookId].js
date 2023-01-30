import Head from 'next/head';
import { useRouter } from 'next/router';
import BookDetails from '../../src/components/books/BookDetails';
import BookDetailsSkeleton from '../../src/components/skeletons/BookDetailsSkeleton';
import useAuth from '../../src/hooks/useAuth';
import { getBookInfo } from '../../src/services/httpServices';
function BookDetailsPage({ bookContent }) {
    const router = useRouter();
    const { isLoading } = useAuth();

    if (router.isFallback) {
        return <BookDetailsSkeleton />;
    }
    return (
        <div>
            <Head>
                <title>
                    {bookContent?.bookdetails.name_bn +
                        ' | ' +
                        bookContent?.bookdetails.name_en +
                        ' - Book | Boighor'}
                </title>
                <meta
                    property="description"
                    content={
                        bookContent?.bookdetails.summary.length > 150
                            ? `${bookContent?.bookdetails.summary.slice(
                                  0,
                                  150
                              )} ...`
                            : bookContent?.bookdetails.summary
                    }
                />
                <meta
                    property="og:url"
                    content={bookContent?.bookdetails.shareurl}
                />
                <meta
                    property="og:title"
                    content={bookContent?.bookdetails.name_bn}
                />
                <meta
                    property="og:description"
                    content={
                        bookContent?.bookdetails.summary.length > 150
                            ? `${bookContent?.bookdetails.summary.slice(
                                  0,
                                  150
                              )} ...`
                            : bookContent?.bookdetails.summary
                    }
                />

                <meta
                    property="og:image"
                    content={bookContent?.bookdetails.shareimage}
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="" />

                <meta property="al:android:package" content="com.ebs.boighor" />
                <meta
                    property="al:android:url"
                    content={`boighor://book/${bookContent?.bookdetails.bookcode}`}
                />
                <meta property="al:android:app_name" content="Boighor" />
                {/* <meta property="al:web:should_fallback" content="true" /> */}
            </Head>
            <BookDetails bookContent={bookContent} />
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [
            // {
            //     params: { bookId: 'b447d87b' }
            // },
            // {
            //     params: { bookId: '6b344e04' }
            // }
        ],
        fallback: true
    };
}
export async function getStaticProps(context) {
    // let bodyFormData = new FormData();

    const { params } = context;

    const formData = {
        bookcode: params.bookId[0],

        versionCode: 34
    };

    const data = await getBookInfo(formData);

    if (data.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            bookContent: data?.data,
            key: params?.bookId
        },
        revalidate: 30
    };
}
export default BookDetailsPage;

// import { useRouter } from 'next/router';
// function BookDetailsPage() {
//     const router = useRouter();
//     const { bookId } = router.query;

//     console.log('bookId', bookId);

//     return <p>Post: {bookId[1]}</p>;
// }

// export default BookDetailsPage;
