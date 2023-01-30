import Link from 'next/link';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useWishList from '../../hooks/useWishList';

const WishList = () => {
    const { wishList, getWishList, removeWishList } = useWishList();
    const { user } = useAuth();
    useEffect(() => {
        getWishList(user?.msisdn);
    }, [user]);

    const handleRemoveFromeWishList = (bookCode, userId, isAudioBook) => {
        removeWishList(bookCode, userId, isAudioBook);
    };
    if (wishList.length === 0) {
        return (
            <div className="text-center">
                <h4>Empty</h4>
            </div>
        );
    }
    return (
        <div>
            <h4 className="mb--30">Wishlist</h4>

            <table className="table table-bordered text-center">
                <thead className="thead-light">
                    <tr>
                        <th style={{ width: '10%' }}>No.</th>
                        <th style={{ width: '20%' }}>Book Cover</th>
                        <th style={{ width: '20%' }}>Book Name</th>
                        <th style={{ width: '20%' }}>Author</th>
                        <th style={{ width: '10%' }}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {wishList?.map((wish, index) => (
                        <tr key={wish.bookcode}>
                            <td>{index + 1}</td>
                            <td>
                                <Link href={`/book/${wish.bookcode}`} passHref>
                                    <img
                                        style={{ width: '70px' }}
                                        src={wish.bookcover}
                                        alt="{wish.bookname_bn}"
                                    />
                                </Link>
                            </td>
                            <td>{wish.bookname_bn}</td>
                            <td>{wish.writer_bn}</td>
                            <td>
                                <button
                                    onClick={(e) =>
                                        handleRemoveFromeWishList(
                                            wish.bookcode,
                                            user.msisdn,
                                            wish.adb
                                        )
                                    }
                                >
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishList;
