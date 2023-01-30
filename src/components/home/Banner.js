import React from 'react';
import BannerSilder from '../custom/slider/BannerSilder';
const Banner = ({ contents }) => {
    return (
        <section className="hero-area hero-slider-2">
            <div className="container">
                <div className="row align-items-lg-center">
                    <div className="col-12">
                        <BannerSilder contents={contents} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Banner);
