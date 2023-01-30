import { useRouter } from 'next/router';
import ReaderUserVerify from '../../src/components/reader/ReaderUserVerify';
const ReaderRedirect = () => {
    const router = useRouter();
    const { encript } = router.query;
    return (
        <div>
            <ReaderUserVerify encript={encript} />
        </div>
    );
};

export default ReaderRedirect;
