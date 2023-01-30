import Head from 'next/head';
import Content from '../src/components/home/Content';
import HomeSkeleton from '../src/components/skeletons/HomeSkeleton';
import { getHomePaginated } from '../src/services/httpServices';
import tokenGenrator from '../src/utils/tokenGenerator';

export default function Index({ content }) {
    if (!content.status.responseCode) {
        return <HomeSkeleton />;
    }

    return (
        <div>
            <Head>
                <title>
                    {
                        ' Boighor - Read best selling e-books from the top authors'
                    }
                </title>
                <meta
                    property="og:title"
                    content=" Boighor - Read best selling e-books from the top authors"
                />
                <meta
                    property="og:description"
                    content="বই পড়ার ও অডিওবুক শোনার প্লাটফর্ম বইঘর। ট্রেন্ডিং এবং ক্লাসিক সব ধরণের ই-বই পড়তে পারবেন যখন যেখানে খুশি। দারুন সব কাস্টমাইজড ফিচার আপনার বই পড়ায় যুক্ত করবে ভিন্ন মাত্রা। ১৫০০+ ই-বুক ও অডিওবুক থেকে উপভোগ করুন আপনার প্রিয় বইটি। এছাড়াও প্রতিদিনই যুক্ত হচ্ছে নতুন নতুন বই। বইঘর চোখের জন্যও বেশ আরামদায়ক। বইয়ের রাজ্যে হারাতে আজই ডাউনলোড করুন বইঘর অ্যাপ।"
                />
            </Head>

            <Content content={content} isSubsBook={false} />
        </div>
    );
}

export async function getStaticProps() {
    let token = tokenGenrator(5);
    const formData = {
        page: 1,
        token: token
    };
    // let content = {};
    // //api call
    // try {
    const content = await getHomePaginated(formData); // 1st parameter is url endpoint and 2nd parameter is formdata which is an Object.
    // } catch (err) {
    //     return {
    //         notFound: true
    //     };
    // }

    // if (content?.status.responseCode === '0') {
    //     alert('No Data Found!');
    //     return;
    // }
    if (content.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: { content },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 5 // In seconds
    };
}
