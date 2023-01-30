import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const BookLoadinSkeleton = () => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    return (
        <section className="section-margin mt-30 mb--50 text-center">
            <div className="container">
                <div className="col-12">
                    <div className="row" align="center">
                        <Skeleton height={20} width={'10%'} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="row mt--20 mx-auto d-flex justify-content-center">
                        {Array(width < 984 ? 4 : 6)
                            .fill()
                            .map((item2, index2) => (
                                <div
                                    className="col-6  col-md-3 col-lg-2"
                                    key={index2}
                                >
                                    <div className="row">
                                        <Skeleton height={220} width={140} />
                                        <Skeleton height={20} width={100} />
                                        <Skeleton height={20} width={90} />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookLoadinSkeleton;
