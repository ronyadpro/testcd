import Link from 'next/link';
import React from 'react';
import AuthorSlider from '../custom/slider/AuthorSlider';

const AuthorRow = ({ title, contents }) => {
    return (
        <section className="section-margin mt--30 mb--50">
            <div className="container">
                <div className="section-title section-title--bordered">
                    <Link href="/contents/top-writer">
                        <a>
                            <h2>{title}</h2>
                        </a>
                    </Link>
                </div>
                <AuthorSlider contents={contents} />
            </div>
        </section>
    );
};

export default React.memo(AuthorRow);
