import Link from 'next/link';

const AuthorSectionItem = ({ content }) => {
    return (
        <div className="col-lg-2 col-sm-6 col-6">
            <div className="product-card">
                <div className="product-grid-content">
                    <Link
                        href={`/authordetails/${content.authorcode}`}
                        passHref
                    >
                        <div className="product-card--body">
                            <div className="card-image padding-0">
                                <img
                                    className="bio-img"
                                    src={content.image}
                                    alt={content.author}
                                    onError={(e) => {
                                        e.target.src =
                                            'https://boighor.com/img/authornoimg.jpg';
                                        e.target.style =
                                            'padding: 0px; margin: 0px';
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                    <div className="product-header">
                        <h3
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                            title={content.author_bn}
                        >
                            <Link href={`/authordetails/${content.authorcode}`}>
                                {content.author_bn.length > 14
                                    ? `${content.author_bn.slice(0, 14)} ...`
                                    : content.author_bn}
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorSectionItem;
