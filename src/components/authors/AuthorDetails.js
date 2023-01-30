import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import {
    followAuthor,
    getAuthorInfoReq,
    unFollowAuthor
} from '../../services/httpServices';
import AudioBookListCard from '../audiobooks/AudioBookListCard';
import BookList from '../books/BookList';
import SocialShare from '../custom/SocialShare/SocialShare';

const AuthorDetails = ({ authorDetail }) => {
    const [author, setAuthor] = useState(authorDetail);
    const router = useRouter();
    const [isFollow, setIsFollow] = useState(author?.isfollowing);
    const [followerCount, setFollowerCount] = useState(author?.followcount);
    const { user } = useAuth();

    if (user.msisdn) {
        const formData = {
            authorcode: author?.authorcode,
            userid: user.msisdn
        };
        getAuthorInfoReq(formData).then((res) => {
            setIsFollow(res.data.isfollowing);
        });
    }

    // ------------------------------follow----------------------
    const handleFollow = () => {
        if (!user.msisdn) {
            router.push('/signin');
        }
        const formData = {
            authorcode: author?.authorcode,
            userid: user.msisdn
        };
        followAuthor(formData)
            .then(function (res) {
                if (res?.status?.responseCode === '1') {
                    setIsFollow(1);
                    setFollowerCount(followerCount + 1);
                }
            })
            .catch(function (error) {
                // console.log(error);
            });
    };
    const handleunfollow = () => {
        const formData = {
            authorcode: author?.authorcode,
            userid: user.msisdn
        };
        unFollowAuthor(formData)
            .then(function (res) {
                if (res?.status?.responseCode === '1') {
                    setIsFollow(0);
                    setFollowerCount(followerCount - 1);
                }
            })
            .catch(function (error) {});
    };
    return (
        <div>
            <section className="breadcrumb-section mb-3">
                <h2 className="sr-only">Site Breadcrumb</h2>
                <div className="container">
                    <div className="breadcrumb-contents">
                        <nav aria-label="breadcrumb">
                            {/* <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        href="/authors"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Authors
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Author Details
                                </li>
                            </ol> */}
                            <Link href="/" passHref>
                                <a style={{ fontWeight:'bold'}}>Authors</a>
                            </Link>{' '}
                            <i
                                className="fas fa-chevron-right pe-2"
                                style={{ fontSize: '12px' }}
                            ></i>
                            <span style={{color:'#7F8091'}}> {author?.author_bn}</span> 
                           
                        </nav>
                    </div>
                </div>
            </section>

            {/* Author Info  */}
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-4 authordetailimgdiv">
                                    <img
                                        className="bio-img"
                                        src={author?.image}
                                        alt={author?.author_bn}
                                    />
                                </div>
                                <div className="col-lg-8">
                                    <div className="authorinfo mt--30">
                                        <h5>{author?.author_bn}</h5>
                                        <div className="authordob mt--10">
                                            {author?.dob !== 'N/A' ? (
                                                <div
                                                    style={{
                                                        display: 'inline'
                                                    }}
                                                >
                                                    <strong>জন্ম : </strong>{' '}
                                                    {author?.dob}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {author?.dod !== 'N/A' ? (
                                                <div
                                                    style={{
                                                        display: 'inline'
                                                    }}
                                                >
                                                    {'  — '}
                                                    <strong>
                                                        মৃত্যু :{' '}
                                                    </strong>{' '}
                                                    {author?.dod}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="authordob mt--10">
                                            <strong>Followers : </strong>{' '}
                                            {followerCount}
                                        </div>
                                        <div className="row mt-20">
                                            <div className="col-4">
                                                {isFollow === 0 ? (
                                                    <button
                                                        onClick={handleFollow}
                                                        type="button"
                                                        className="button-buy btn-sm follow-button mt--20"
                                                        id="button-follow"
                                                    >
                                                        Follow{' '}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleunfollow}
                                                        type="button"
                                                        className="button-buy btn-sm follow-button mt--20"
                                                        id="button-follow"
                                                    >
                                                        Unfollow{' '}
                                                    </button>
                                                )}
                                            </div>
                                            <div className="col-8 mt-sm-10 mb-sm-10">
                                                <SocialShare
                                                    shareURL={author?.shareurl}
                                                    title={author?.author_bn}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <p className="biodesc mt--30">
                                <strong>বায়োগ্রাফি :</strong> {author?.bio}
                            </p>
                        </div>
                    </div>
                    <div className="sb-custom-tab review-tab">
                        <ul
                            className="nav nav-tabs nav-style-2"
                            id="myTab2"
                            role="tablist"
                        >
                            {author?.books?.length ? (
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="ebook-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#ebook"
                                        type="button"
                                        role="tab"
                                        aria-controls="ebook"
                                        aria-selected="true"
                                    >
                                        Ebooks
                                    </button>
                                </li>
                            ) : (
                                ''
                            )}

                            {author?.audiobooks?.length ? (
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="audio-book-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#audio-book"
                                        type="button"
                                        role="tab"
                                        aria-controls="audio-book"
                                        aria-selected="false"
                                    >
                                        Audio Books
                                    </button>
                                </li>
                            ) : (
                                ''
                            )}
                        </ul>
                        <div className="tab-content space-db--20">
                            <div
                                className="tab-pane fade show active"
                                id="ebook"
                                role="tabpanel"
                                aria-labelledby="ebook-tab"
                            >
                                <BookList booklist={author?.books} />
                            </div>
                            <div
                                className="tab-pane fade"
                                id="audio-book"
                                role="tabpanel"
                                aria-labelledby="audio-book-tab"
                            >
                                <div className="row">
                                    {author?.audiobooks.map((book) => (
                                        <AudioBookListCard
                                            key={book.bookcode}
                                            audiobook={book}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthorDetails;
