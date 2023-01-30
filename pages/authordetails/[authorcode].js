import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthorDetails from '../../src/components/authors/AuthorDetails';
import { getAuthorInfo } from '../../src/services/httpServices';
function AuthorDetailspage({ authorContent }) {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>loading</h1>;
    }
    // if (!data?.data) return <h1>loading</h1>;

    return (
        <div>
            <Head>
                <title>{`${authorContent?.author_bn} | Boighor`}</title>
                <meta
                    property="description"
                    content={
                        authorContent?.bio.length > 150
                            ? `${authorContent?.bio.slice(0, 150)} ...`
                            : authorContent?.bio
                    }
                />
                <meta
                    property="og:title"
                    content={`${authorContent?.author_bn} | Boighor`}
                />
                <meta property="og:url" content={authorContent?.shareurl} />
                <meta
                    property="og:description"
                    content={
                        authorContent?.bio.length > 150
                            ? `${authorContent?.bio.slice(0, 150)} ...`
                            : authorContent?.bio
                    }
                />

                <meta property="og:image" content={authorContent?.image} />
            </Head>

            <AuthorDetails authorDetail={authorContent} />
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    };
}
export async function getStaticProps(context) {
    // let bodyFormData = new FormData();
    const { params } = context;

    const formData = {
        authorcode: params.authorcode
    };

    const data = await getAuthorInfo(formData);
    // console.log(data);

    if (data.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            authorContent: data?.data,
            key: params?.authorcode
        },
        revalidate: 1
    };
}

export default AuthorDetailspage;
