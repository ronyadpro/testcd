import Head from 'next/head';
import AudioBookSection from '../src/components/audiobooks/AudioBookSection';
import { getAudioBooks } from '../src/services/httpServices';
function Audiobooks({ audioContent }) {
    return (
        <div>
            <Head>
                <title>{' Audio Books | Boighor'}</title>
                <meta
                    property="og:url"
                    content="https://boighor.com/audiobook/"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content=" Audio Books | Boighor"
                ></meta>
                <meta
                    name="og:description"
                    content="Download top rated & best selling bangla e-books from the renowned authors.
    Boighor is the largest library of Bengali e-books of all time & genre, Captivating Audio-books with the smartest & simplest
    UI for your utmost eBook reading experience."
                />
            </Head>
            <AudioBookSection audioContent={audioContent} />;
        </div>
    );
}
export default Audiobooks;

export async function getStaticProps() {
    const formData = {
        page: 1,
        
    };

    //api call

    const content = await getAudioBooks(formData); // 1st parameter is url endpoint and 2nd parameter is formdata which is an Object.
    console.log(content);
    if (content.status.responseCode !== '1') {
        return { notFound: true };
    }

    return {
        props: {
            audioContent: content?.data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 5 // In seconds
    };
}
