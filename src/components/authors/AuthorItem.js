import Image from 'next/image';
import Link from 'next/link';

const AuthorItem = ({ author }) => {
    return (
        <div className="single-slide">
            <div className="product-card">
                <div className="product-card--body mt--20">
                    <div className="card-image content">
                        <Link
                            href={`authordetails/${author.authorcode}`}
                            passHref
                        >
                            <Image
                                className="bio-img"
                                src={author.image}
                                alt={author.author_bn}
                                width={162}
                                height={162}
                                layout="responsive"
                                blurDataURL
                                placeholder="blur"
                                priority={true}
                            />
                        </Link>
                    </div>
                    <div className="product-header mt--10">
                        <h3
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Link href={`authordetails/${author.authorcode}`}>
                                <a> {author.author_bn}</a>
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorItem;
