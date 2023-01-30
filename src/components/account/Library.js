import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { getMyBooks } from '../../services/httpServices';
import SectionHeader from '../common/SectionHeader';

const Library = () => {
    const [myBooks, setMyBooks] = useState([]);
    const [mySubsBooks, setMySubsBooks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const formData = {
            msisdn: user.msisdn
        };
        getMyBooks(formData).then((res) => {
            setMyBooks(res.data || []);
            setMySubsBooks(res.subscription_info.books || []);
        });
    }, [user]);

    if (myBooks.length === 0 && mySubsBooks.length === 0) {
        return (
            <div className="text-center">
                <h4>Empty</h4>
            </div>
        );
    }
    return (
        <div>
            {myBooks.length > 0 && (
                <div>
                    <SectionHeader title={'Single purchased books'} />

                    <div className="row">
                        {myBooks?.map((book) => (
                            <div
                                key={book.bookcode}
                                className="col-lg-3 col-sm-6 col-6"
                            >
                                <div className="product-card">
                                    <div className="product-grid-content">
                                        <div className="product-card--body">
                                            <Link
                                                href={`/book/${book.bookcode}`}
                                                passHref
                                            >
                                                <div className="card-image p-10">
                                                    <img
                                                        src={book.bookcover}
                                                        alt={book.bookname_bn}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="product-header">
                                                <h3>
                                                    <Link
                                                        href={`/book/${book.bookcode}`}
                                                    >
                                                        {book.bookname_bn}
                                                    </Link>
                                                </h3>
                                                <Link
                                                    href={`/book/${book.bookcode}`}
                                                >
                                                    {book.writer_bn}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ----- */}
                    </div>
                </div>
            )}

            {mySubsBooks.length > 0 && (
                <div>
                    <SectionHeader title={'My Subscribed Books'} />

                    <div className="row">
                        {mySubsBooks?.map((book) => (
                            <div
                                key={book.bookcode}
                                className="col-lg-3 col-sm-6 col-6"
                            >
                                <div className="product-card">
                                    <div className="product-grid-content">
                                        <div className="product-card--body">
                                            <Link
                                                href={`/book/${book.bookcode}`}
                                                passHref
                                            >
                                                <div className="card-image p-10">
                                                    <img
                                                        src={book.bookcover}
                                                        alt={book.bookname_bn}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="product-header">
                                                <h3>
                                                    <Link
                                                        href={`/book/${book.bookcode}`}
                                                    >
                                                        {book.bookname_bn}
                                                    </Link>
                                                </h3>
                                                <Link
                                                    href={`/book/${book.bookcode}`}
                                                >
                                                    {book.writer_bn}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ----- */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Library;
