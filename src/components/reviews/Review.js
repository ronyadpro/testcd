import React from 'react';
import ReactStars from 'react-stars';

const Review = ({ review }) => {
    return (
        <div className="review-comment mb--20">
            <div className="text">
                <div className="author-rating">
                    <div className="rating-block mb--15">
                        <ReactStars
                            count={5}
                            size={30}
                            value={parseFloat(review.ratingpoint)}
                            edit={false}
                            isHalf={true}
                            activeColor="#ffd700"
                        />
                    </div>
                </div>

                <p>{review.reviewtext}</p>
                <h6 className="author">
                    {review.username}
                    {'   '}
                    <span
                        className="font-weight-400"
                        style={{ fontSize: '12px', color: 'gray' }}
                    >
                        {review.datetime}
                    </span>
                </h6>
            </div>
        </div>
    );
};

export default Review;
