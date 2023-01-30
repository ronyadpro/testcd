import Link from 'next/link';
import React from 'react';
import BookSlider from '../custom/slider/BookSlider';

const BookRow = ({ title, catcode, contents, isSubsBook }) => {
    return (
        <section className="section-margin mt--30 mb--50">
            <div className="container">
                <div className="section-title section-title--bordered">
                    {catcode ? (
                        <Link
                            href={`${
                                isSubsBook
                                    ? '/contents/bundleSection/'
                                    : '/contents/section/'
                            }${catcode}`}
                        >
                            <a>
                                <h2>{title}</h2>
                            </a>
                        </Link>
                    ) : (
                        <h2>{title}</h2>
                    )}
                </div>
                <BookSlider contents={contents} isSubsBook={isSubsBook} />
            </div>
        </section>
    );
};

export default React.memo(BookRow);
