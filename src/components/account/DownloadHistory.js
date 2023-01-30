import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { ownedBooklist } from '../../services/httpServices';

const DownloadHistory = () => {
    const [ownedbookList, setOwnedBookList] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const formData = {
            userid: user.msisdn
        };
        //data fetch
        ownedBooklist(formData).then((res) => setOwnedBookList(res.data || []));
    }, [user]);

    if (ownedbookList.length === 0) {
        return (
            <div className="text-center">
                <h4>Empty</h4>
            </div>
        );
    }
    return (
        <div>
            <h4 className="mb--30">Wishlist</h4>
            <div
                className="myaccount-table table-responsive table-wrapper-scroll-y text-center purchase-scrollbar mt--30"
                style={{ textAlign: 'center' }}
            >
                <table className="table table-bordered text-center">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ width: '10%' }}>No.</th>
                            <th style={{ width: '20%' }}>Date</th>
                            <th style={{ width: '20%' }}>Book Cover</th>
                            <th style={{ width: '20%' }}>Book Name</th>
                            <th style={{ width: '20%' }}>Author</th>
                            <th style={{ width: '10%' }}>Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownedbookList?.map((book, index) => (
                            <tr key={book.bookcode}>
                                <td>{index + 1}</td>
                                <td>{book.datetime}</td>
                                <td>
                                    <Link
                                        href={`/book/${book.bookcode}`}
                                        passHref
                                    >
                                        <img
                                            style={{ width: '70px' }}
                                            src={book.imgurl}
                                            alt="{wish.bookname_bn}"
                                        />
                                    </Link>
                                </td>
                                <td>{book.bookname}</td>
                                <td>{book.writer}</td>
                                <td>
                                    <Link href={`/book/${book.bookcode}`}>
                                        <a>overview</a>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DownloadHistory;
