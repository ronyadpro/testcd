import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const AudioBookCard = ({ book }) => {
    const router = useRouter();

    const handleImageClick = (id) => {
        router.push(`/book/${id}`);
    };
    // console.log(book);
    return (
        <div className="col-lg-3 col-sm-6 col-6">
            <div className="product-card">
                <div className="product-grid-content">
                    <div className="product-card--body">
                        <div className="card-image p-10">
                            <div
                                className="imgttt  book-image"
                                onClick={() => handleImageClick(book.bookcode)}
                            >
                                <Image
                                    className="image-wrapper"
                                    src={book.bookcover}
                                    alt={book.bookname_bn}
                                    width={250}
                                    height={250}
                                    layout="responsive"
                                    blurDataURL
                                    placeholder="blur"
                                    quality={50}
                                    priority={true}
                                />
                            </div>
                        </div>

                        <div className="product-header">
                            <h3
                                style={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    padding: '2px'
                                }}
                                title={book.bookname_bn}
                            >
                                <Link href={`/book/${book.bookcode}`}>
                                    {book.bookname_bn.length > 14
                                        ? `${book.bookname_bn.slice(0, 14)} ...`
                                        : book.bookname_bn}
                                </Link>
                            </h3>
                            <Link
                                href={`/authordetails/${book.writercode}`}
                                className="author"
                            >
                                {book.writer_bn}
                            </Link>
                        </div>
                        <div className="price-block">
                            <Link href={`/book/${book.bookcode}`} passHref>
                                <div className="price-block">
                                    <span className="price">
                                        {book.bdt_disc}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioBookCard;
