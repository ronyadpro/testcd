import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const TopGenresRow = ({ title, contents }) => {
    return (
        <section className="section-margin mt--30 mb--50">
            <div className="container">
                <div className="section-title section-title--bordered">
                    <Link href="#" passHref>
                        <h2>{title}</h2>
                    </Link>
                </div>
                <div className="row mx-auto">
                    {contents.slice(0, 12).map((item) => (
                        <div
                            key={item.genre_code}
                            className="col-6 col-sm-6 col-md-3 col-lg-2  my-2"
                        >
                            <Link
                                href={`/contents/genre/${item.genre_code}`}
                                passHref
                            >
                                <div
                                    className="row"
                                    style={{
                                        width: '150px',
                                        borderRadius: '5px',
                                        boxShadow: ' 1px 1px 4px gray'
                                    }}
                                >
                                    <div
                                        className="col-3"
                                        style={{
                                            padding: '0',
                                            height: '48px'
                                        }}
                                    >
                                        <div>
                                            <Image
                                                className="image-wrapper-gen"
                                                src={item.image}
                                                alt={item.genre_bn}
                                                width={80}
                                                height={103}
                                                objectFit="cover"
                                                objectPosition={'-0% 0%'}
                                                layout="responsive"
                                                blurDataURL
                                                placeholder="blur"
                                                quality={50}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-9 my-auto ">
                                        <h6>{item.genre_bn}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(TopGenresRow);
