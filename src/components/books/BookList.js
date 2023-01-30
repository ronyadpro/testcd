import React from 'react';
import BookCard from './BookCard';

const BookList = ({ booklist }) => {
    return (
        <div>
            {/* FOR BORDER ADD CLASS 'shop-border' */}
            <div className="row row-cols-5 text-center">
                {booklist?.map((book) => (
                    <BookCard key={book?.bookcode} book={book} />
                ))}
            </div>
            <div></div>
        </div>
    );
};

export default BookList;
