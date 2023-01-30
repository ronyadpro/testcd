import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {
    checkUserSubscriptionHistory,
    subscriptionBookAddRequest
} from '../services/httpServices';
import useAuth from './useAuth';
const useSubscriptionService = () => {
    const [ebookPack, setEbookPack] = useState(null);
    const [audioPack, setAudioPack] = useState(null);
    const [comboPack, setComboPack] = useState(null);
    const [successAddedBookCode, setSuccessAddedBookCode] = useState('');

    const { user } = useAuth();
    const router = useRouter();

    const getSubsInfo = async () => {
        if (user?.msisdn) {
            const data = {
                userid: user?.msisdn
            };
            checkUserSubscriptionHistory(data).then((res) => {
                const ebook = res.data.find(
                    (subs) => subs.pack_type === 'ebook'
                );
                setEbookPack(ebook);
                const audioBook = res.data.find(
                    (subs) => subs.pack_type === 'audiobook'
                );

                setAudioPack(audioBook);
                const combo = res.data.find(
                    (subs) => subs.pack_type === 'combo'
                );

                setComboPack(combo);
            });
        }
    };

    const handleBookAdd = (bookcode) => {
        if (!user?.msisdn) {
            router.push('/signin');
            return;
        }
        const formData = {
            userid: user?.msisdn,
            bookcode: bookcode
        };

        Swal.fire({
            title: 'আপনি কি বইটি অ্যাড করতে চান?',

            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#00ACB1'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await subscriptionBookAddRequest(formData);

                getSubsInfo();
                if (res.data.status === 'success') {
                    setSuccessAddedBookCode(bookcode);
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        confirmButtonText: 'Go to my Library',
                        confirmButtonColor: '#00ACB1'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/account/mylibrary');
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: res.data.message,
                        confirmButtonText: 'Get a subscription',
                        confirmButtonColor: '#00ACB1'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/subscribe');
                        }
                    });
                }
            }
        });
    };

    return {
        successAddedBookCode,
        ebookPack,
        audioPack,
        comboPack,
        getSubsInfo,
        handleBookAdd
    };
};
export default useSubscriptionService;
