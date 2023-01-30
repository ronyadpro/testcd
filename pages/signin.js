import Head from 'next/head';
import SigninPage from '../src/components/Authentications/SigninPage/SigninPage';
import { withPublic } from '../src/hooks/route';
function singin({ user }) {
    return (
        <div>
            <Head>
                <title>{'  Home | Boighor'}</title>
                <meta property="og:title" content=" Home | Boighor" />
            </Head>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <SigninPage />;
        </div>
    );
}
export default withPublic(singin);

// export async function getServerSideProps(context) {
//     return {
//         props: {
//             con: context.req.headers.referer
//         }
//     };
// }
