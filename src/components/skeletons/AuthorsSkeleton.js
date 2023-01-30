import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AuthorsSkeleton = () => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    return (
        <div className="shop-product-wrap grid with-pagination row space-db--20 shop-border">
            {Array(width < 990 ? 2 : 6)
                .fill()
                .map((item2, index2) => (
                    <div key={index2} className="col-lg-2 col-sm-6 col-6">
                        <div className="product-card mb--30">
                            <div className="product-grid-content">
                                <div className="product-card--body">
                                    <div className="card-image padding-0 row ">
                                        <Skeleton
                                            style={{ borderRadius: '50%' }}
                                            height={140}
                                            width={150}
                                        />
                                    </div>

                                    <div className="product-header ">
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

export default AuthorsSkeleton;
