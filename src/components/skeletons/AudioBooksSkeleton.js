import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const AudioBooksSkeleton = () => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    return (
        <div className="shop-product-wrap grid with-pagination row mt--30 space-db--30 shop-border">
            {Array(width < 990 ? 2 : 4)
                .fill()
                .map((item2, index2) => (
                    <div key={index2} className="col-lg-3 col-sm-6 col-6">
                        <div className="product-card mb--30">
                            <div className="product-grid-content">
                                <div className="product-card--body">
                                    <div className="card-image p-10 row ">
                                        {width < 990 ? (
                                            <Skeleton
                                                height={130}
                                                width={130}
                                            />
                                        ) : (
                                            <Skeleton
                                                height={180}
                                                width={180}
                                            />
                                        )}
                                    </div>

                                    <div className="product-header">
                                        <Skeleton height={20} width={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AudioBooksSkeleton;
