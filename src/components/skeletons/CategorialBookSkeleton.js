import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CategorialBookSkeleton = () => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (
        <div className="shop-product-wrap row">
            {Array(width < 990 ? 2 : 6)
                .fill()
                .map((item2, index2) => (
                    <div key={index2} className="col-lg-2 col-sm-6 col-6">
                        <div className="product-card mb--30">
                            <div className="product-grid-content">
                                <div className="product-card--body">
                                    <div className="card-image p-10 row ">
                                        <Skeleton height={220} width={140} />
                                    </div>

                                    <div className="product-header ">
                                        <Skeleton height={20} width={100} />
                                        <Skeleton height={20} width={90} />
                                    </div>

                                    <div className="price-block">
                                        <span className="price"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default CategorialBookSkeleton;
