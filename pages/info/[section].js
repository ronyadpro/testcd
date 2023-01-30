import Head from 'next/head';
import { useRouter } from 'next/router';
import Breadcrumb from '../../src/components/common/Breadcrumb';
import { getAppInfo } from '../../src/services/httpServices';

const Info = (content) => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{` ${router?.query.section} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${router?.query.section} | Boighor`}
                />
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <Breadcrumb from={router.query.section} />
            <div className="container">
                <div
                    dangerouslySetInnerHTML={{ __html: content?.content }}
                ></div>
                {/* <div>{ReactHtmlParser(info)}</div> */}
            </div>
        </div>
    );
};
export default Info;

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: { section: 'about' }
            },
            {
                params: { section: 'help' }
            },
            {
                params: { section: 'privacy' }
            },
            {
                params: { section: 'terms' }
            },
            {
                params: { section: 'license' }
            },
            {
                params: { section: 'refund-policy' }
            }
        ],
        fallback: false
    };
}
export async function getStaticProps(context) {
    // let bodyFormData = new FormData();
    const { params } = context;

    const formData = {
        appinfo: params.section
    };
    let data = {};

    data = await getAppInfo(formData);
    // console.log(data);
    if (!data?.details) {
        return { notFound: true };
    }

    // if (data.status.responseCode !== '1') {
    //     return { notFound: true };
    // }

    return {
        props: {
            content: data?.details,
            key: params.section
        },
        revalidate: 5
    };
}
