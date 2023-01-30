import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick/lib/slider';
const BannerSilder = ({ contents }) => {
    var sliderSettings = {
        autoplay: true,
        dots: true,
        infinite: true,
        arrows: false,

        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const bannerType = (item) => {
       
        if (item.type === 'single') {
            return (
                <Link key={item.code} href={`/book/${item.code}`} passHref>
                    <div
                        className="single-slide "
                        data-bg="image/slider/s1.jpg"
                    >
                        <Image
                            src={item.image_location}
                            alt="header slider"
                            title={item.title}
                            height={300}
                            width={1000}
                            layout="responsive"
                            quality={100}
                            priority={true}
                        />
                    </div>
                </Link>
            );
        } else if (item.type === 'promotion') {
            return (
                <Link key={item.code} href={`/promotion/${item.code}`} passHref>
                    <div
                        className="single-slide "
                        data-bg="image/slider/s1.jpg"
                    >
                        <Image
                            src={item.image_location}
                            alt="header slider"
                            title={item.title}
                            height={300}
                            width={1000}
                            layout="responsive"
                            quality={100}
                            priority={true}
                        />
                    </div>
                </Link>
            );
        } else if (item.type === 'section') {
            return (
                <Link
                    key={item.code}
                    href={`/contents/section/${item.code}`}
                    passHref
                >
                    <div
                        className="single-slide "
                        data-bg="image/slider/s1.jpg"
                    >
                        <Image
                            src={item.image_location}
                            alt="header slider"
                            title={item.title}
                            height={300}
                            width={1000}
                            layout="responsive"
                            quality={100}
                            priority={true}
                        />
                    </div>
                </Link>
            );
        }
    };

    return (
        <Slider {...sliderSettings}>
            {contents.map((item) => (
                <div key={item.title}>
                    {/* {item.type === 'promotion' ? (
                        <Link
                            key={item.code}
                            href={`/promotion/${item.code}`}
                            passHref
                        >
                            <div
                                className="single-slide "
                                data-bg="image/slider/s1.jpg"
                            >
                                <Image
                                    src={item.image_location}
                                    alt="header slider"
                                    title={item.title}
                                    height={300}
                                    width={1000}
                                    layout="responsive"
                                    quality={100}
                                    priority={true}
                                />
                            </div>
                        </Link>
                    ) : (
                        <Link
                            key={item.code}
                            href={`/contents/section/${item.code}`}
                            passHref
                        >
                            <div
                                className="single-slide "
                                data-bg="image/slider/s1.jpg"
                            >
                                <Image
                                    src={item.image_location}
                                    alt="header slider"
                                    title={item.title}
                                    height={342}
                                    width={1080}
                                    layout="responsive"
                                    priority={true}
                                />
                            </div>
                        </Link>
                    )} */}

                    {bannerType(item)}
                </div>
            ))}
        </Slider>
    );
};

export default BannerSilder;
