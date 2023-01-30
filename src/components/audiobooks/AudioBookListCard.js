import Image from 'next/image';
import Link from 'next/link';
const AudioBookListCard = ({ audiobook }) => {
    return (
        <div className="col-lg-2 col-sm-6 col-6">
            <div className="product-card mb--30">
                <div className="product-grid-content">
                    <Link href={`/book/${audiobook.bookcode}`} passHref>
                        <div className="product-card--body p-10">
                            <div
                                className="card-image p-0"
                                style={{
                                    boxShadow: '3px 3px 8px gray'
                                }}
                            >
                                <Image
                                    className="image-wrapper"
                                    src={audiobook.bookcover}
                                    alt={audiobook.bookname_bn}
                                    width={250}
                                    height={250}
                                    layout="responsive"
                                    blurDataURL
                                    placeholder="blur"
                                    quality={50}
                                />
                            </div>
                        </div>
                    </Link>
                    <div className="product-header mt--5">
                        <h3
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                            title={audiobook.bookname_bn}
                        >
                            <Link href={`/book/${audiobook.bookcode}`}>
                                {audiobook.bookname_bn.length > 16
                                    ? `${audiobook.bookname_bn.slice(
                                          0,
                                          16
                                      )} ...`
                                    : audiobook.bookname_bn}
                            </Link>
                        </h3>
                    </div>
                    <Link href={`/book/${audiobook.bookcode}`} passHref>
                        <div className="price-block">
                            <span className="price">{audiobook.bdt_disc}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AudioBookListCard;
