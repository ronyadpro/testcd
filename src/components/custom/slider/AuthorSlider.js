import React from 'react';
import Slider from 'react-slick/lib/slider';
import AuthorItem from '../../authors/AuthorItem';

const AuthorSlider = ({ contents }) => {
    let authorSetting = {
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
        <Slider {...authorSetting}>
            {contents.map((author) => (
                <AuthorItem key={author.authorcode} author={author} />
            ))}
        </Slider>
    );
};

export default AuthorSlider;
