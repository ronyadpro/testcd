import React, { useEffect, useState } from 'react';
import Content from '../src/components/home/Content';
import HomeSkeleton from '../src/components/skeletons/HomeSkeleton';
import SubsBooksCount from '../src/components/subscriptions/SubsBooksCount';
import { getBundlePaginated } from '../src/services/httpServices';
import useAuth from './../src/hooks/useAuth';
import useSubscription from './../src/hooks/useSubscription';
const bundleSubscribe = () => {
    const [content, setContent] = useState(null);
    const { user, isLoading } = useAuth();
    const { ebookPack } = useSubscription();

    useEffect(async () => {
        if (isLoading === false) {
            const formData = {
                page: 1,
                msisdn: user?.msisdn || ''
            };
            const data = await getBundlePaginated(formData);
            setContent(data);
        }
    }, [user?.msisdn, ebookPack?.ebook_remaining, isLoading]);

    if (!content) {
        return <HomeSkeleton />;
    }

    return (
        <div>
            <SubsBooksCount />
            <Content content={content} isSubsBook={true} />
        </div>
    );
};

export default bundleSubscribe;

// export async function getStaticProps() {
//     let token = tokenGenrator(5);
//     const formData = {
//         page: 1,
//         token: token
//     };
//     // let content = {};
//     // //api call
//     // try {
//     const content = await getBundlePaginated(formData); // 1st parameter is url endpoint and 2nd parameter is formdata which is an Object.
//     // } catch (err) {
//     //     return {
//     //         notFound: true
//     //     };
//     // }

//     // if (content?.status.responseCode === '0') {
//     //     alert('No Data Found!');
//     //     return;
//     // }
//     if (content.status.responseCode !== '1') {
//         return { notFound: true };
//     }

//     return {
//         props: { content },
//         // Next.js will attempt to re-generate the page:
//         // - When a request comes in
//         // - At most once every 10 seconds
//         revalidate: 5 // In seconds
//     };
// }
