import Slider from 'react-slick';
import BookItem from '../../books/BookItem';

const BookSlider = ({ contents, isSubsBook }) => {
    let bookSettings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: [
            {
                default: true
            }
        ],
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div>
            <Slider {...bookSettings}>
                {contents.map((item) => (
                    <BookItem
                        key={item.bookcode}
                        item={item}
                        isSubsBook={isSubsBook}
                       
                    />
                ))}
            </Slider>
        </div>
    );
};

export default BookSlider;
