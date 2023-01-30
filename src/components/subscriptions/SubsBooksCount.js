import React, { useEffect } from 'react';

import Link from 'next/link';
import useSubscription from '../../hooks/useSubscription';
import useAuth from './../../hooks/useAuth';
const SubsBooksCount = () => {
    const { user } = useAuth();

    const { ebookPack, audioPack, comboPack, getSubsInfo } = useSubscription();
    useEffect(() => {
        getSubsInfo();
    }, [user?.msisdn]);

    if (!user?.msisdn || (!ebookPack && !audioPack && !comboPack)) {
        return (
            <div className="my-4 d-flex justify-content-center">
                <h3
                    className=" text-center "
                    style={{
                        fontWeight: 600,
                        color: '#374151'
                    }}
                >
                    পছন্দমতো বই লাইব্রেরিতে অ্যাড করতে এবং অডিওবুক শুনতে{'  '}
                    <Link href={'/subscribe'}>
                        <span style={{ color: '#01ABB0' ,cursor: 'pointer'}}>
                            সাবস্ক্রিপশন করুন
                        </span>
                    </Link>
                </h3>
            </div>
        );
    }
    return (
        <div>
            {ebookPack?.ebook_remaining > 0 && (
                <h3
                    className="mt-4 text-center "
                    style={{
                        fontWeight: 600,
                        color: '#374151'
                    }}
                >
                    আপনি{' '}
                    <span style={{ color: '#01ABB0' }}>
                        {ebookPack?.ebook_remaining} টি ই-বুক{' '}
                    </span>{' '}
                    আপনার লাইব্রেরি অ্যাড করতে পারবেন
                </h3>
            )}

            {ebookPack?.ebook_remaining === 0 && (
                <div className="my-4 d-flex justify-content-center">
                    <button
                        className="px-5 py-2 text-white"
                        style={{
                            backgroundColor: '#01ABB0',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: '30px'
                        }}
                    >
                        আপনার বই এড করার লিমিট শেষ
                    </button>
                </div>
            )}
            {audioPack?.audio_limit > 0 && (
                <h3
                    className=" text-center "
                    style={{
                        fontWeight: 600,
                        color: '#374151'
                    }}
                >
                    আপনি <span style={{ color: '#01ABB0' }}>আনলিমিটেড</span>{' '}
                    অডিও বুক শুনতে পারবেন
                </h3>
            )}

            {comboPack && (
                <div>
                    <h3
                        className="mt-5 text-center "
                        style={{
                            fontWeight: 600,
                            color: '#374151'
                        }}
                    >
                        আপনি{' '}
                        <span style={{ color: '#01ABB0' }}>
                            {comboPack?.ebook_remaining} টি ই-বুক{' '}
                        </span>{' '}
                        আপনার লাইব্রেরি অ্যাড করতে পারবেন
                    </h3>
                    <h3
                        className=" text-center "
                        style={{
                            fontWeight: 600,
                            color: '#374151'
                        }}
                    >
                        আপনি <span style={{ color: '#01ABB0' }}>আনলিমিটেড</span>{' '}
                        অডিও বুক শুনতে পারবেন
                    </h3>
                </div>
            )}
        </div>
    );
};

export default SubsBooksCount;
