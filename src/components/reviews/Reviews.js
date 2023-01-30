import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { postReview } from '../../services/httpServices';
import Review from './Review';

const Reviews = ({ reviewsData, user, bookcode }) => {
    const router = useRouter();

    const { reviews, bookname } = reviewsData;
    const [userRating, setRating] = useState(5.0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        setName(user.fullname);
    }, [user]);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleComment = async (event) => {
        event.preventDefault();
        setCommentError('');
        setNameError('');
        if (!user.msisdn) {
            // navigate('/signin', { state: { from: location } });
            router.push('/signin');

            return;
        }
        if (comment.length > 1000) {
            setCommentError(
                'Comments cannot exceed a maximum of 5000 characters'
            );
            return;
        } else if (name.length === 0) {
            setNameError('Please give your name');
            return;
        }

        const formData = {
            userid: user?.msisdn,
            username: name,
            review: comment,
            rating: userRating
            // bookcode: bookcode
        };
        // console.log(formData);

        //API CALL
        postReview(formData).then((res) => {
            // console.log(res);
            if (res?.status?.responseCode === '1') {
                alert('Successfully Review Added');
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                alert('Review not Added');
            }
        });
    };
    return (
        <div className="review-wrapper">
            <form onSubmit={handleComment}>
                <h1
                    className="title-lg mb--20 pt--10"
                    style={{ fontSize: '1.5rem', color: 'rgb(0,172,177)' }}
                >
                    ADD A REVIEW
                </h1>
                <div className="rating-row pt-2">
                    <p className="d-block">Your Rating</p>

                    <ReactStars
                        count={5}
                        size={30}
                        value={userRating}
                        half={false}
                        activeColor="#ffd700"
                        onChange={ratingChanged}
                    />

                    <div className="mt--15 site-form ">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="message">Comment</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="10"
                                        className="form-control"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></textarea>
                                    {commentError && (
                                        <div
                                            className="alert alert-danger mt--10 h-2"
                                            role="alert"
                                        >
                                            {commentError}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="col-lg-4 padding-0">
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        {nameError && (
                                            <div
                                                className="alert alert-danger mt--10 h-2"
                                                role="alert"
                                            >
                                                {nameError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="submit-btn">
                                    <button
                                        type="submit"
                                        className="btn btn-black"
                                        // onClick={handleComment}
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="mt--30">
                <h1 className="title-lg mb--20" style={{ fontSize: '1.2rem' }}>
                    {reviews.length} REVIEW for {bookname} !{' '}
                </h1>
                {reviews.map((review, index) => (
                    <Review key={index} review={review} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;
