import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FilterBySection from '../../../src/components/books/FilterBySection';
import CategorialBookSkeleton from '../../../src/components/skeletons/CategorialBookSkeleton';
import useAuth from '../../../src/hooks/useAuth';
import useSubscription from '../../../src/hooks/useSubscription';
import { getBundleBooksBySection } from '../../../src/services/httpServices';

const Section = () => {
    const [booksContent, setBookContent] = useState(null);
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const { ebookPack } = useSubscription();
    const { seccode } = router.query;
    console.log(seccode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (isLoading === false) {
            const formData = {
                page: 1,
                msisdn: user?.msisdn || '',
                catcode: seccode
            };
            const data = await getBundleBooksBySection(formData);
            if (data.status.responseCode !== '1') {
                return { notFound: true };
            }
            setBookContent(data.data);
        }
    }, [user?.msisdn, ebookPack?.ebook_remaining, isLoading, seccode]);

    if (!booksContent) {
        return (
            <div className="container">
                <CategorialBookSkeleton />
            </div>
        );
    }
    return (
        <div>
            <Head>
                <title>{` ${booksContent?.catname_en} | Boighor`}</title>
                <meta
                    property="og:title"
                    content={` ${booksContent?.catname_en} | Boighor`}
                />
            </Head>
            {booksContent && (
                <FilterBySection
                    booksContent={booksContent}
                    code={router.query.seccode}
                />
            )}
        </div>
    );
};

export default Section;
