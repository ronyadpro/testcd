import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick/lib/slider';
const CategoriesSlider = () => {
    let catSettings = {
        infinite: false,
        slidesToShow: 9,
        slidesToScroll: 2,
        className: 'slides',
        // fade: true,
        arrows: true,

        // nextArrow: <CustomArrow />,
        // prevArrow: <CustomArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 9
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    };
    return (
        <section className="mt--10">
            <div className="container">
                <Slider {...catSettings}>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/sfi">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Science-fiction.png"
                                                alt="Science-fiction"
                                                height={74}
                                                width={74}
                                                quality={40}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/sfi">
                                        <a>Science-Fiction</a>
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    {/* <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="/audiobooks">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Audio-Book.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="/audiobooks">Audio Book</Link>
                                </h4>
                            </div>
                        </div>
                    </div> */}
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/cld">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Children.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/cld">
                                        Children
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/category/pom">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Poem.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/category/pom">
                                        Poem
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/thr">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Thriller-and-mystery.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/thr">
                                        Thriller
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/rom">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Romance.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/rom">
                                        Romance
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/lib" passHref>
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Liberation-war.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/lib">
                                        Liberation-war
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/pal">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Psychological.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/pal">
                                        Psychological
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/cla">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/classic.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/cla">
                                        Classic
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/hum">
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Humor.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/hum">
                                        Comedy-and-Humor
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <Link href="contents/genre/hor" passHref>
                                        <a>
                                            <Image
                                                src="/assets/image/genre/Horror.png"
                                                alt="Audio-Book"
                                                height={74}
                                                width={74}
                                                quality={50}
                                                blurDataURL
                                                placeholder="blur"
                                                priority={true}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="contents/genre/hor">
                                        Horror
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="single-slide">
                        <div className="product-card">
                            <div className="product-card">
                                <div className="card-image categories">
                                    <a>
                                        <Image
                                            src="/assets/image/genre/anyaprokash.png"
                                            alt="Audio-Book"
                                            height={74}
                                            width={74}
                                            quality={50}
                                            blurDataURL
                                            placeholder="blur"
                                            priority={true}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="product-header">
                                <h4 className="title-cat">
                                    <Link href="">Anyaprokash</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default React.memo(CategoriesSlider);
