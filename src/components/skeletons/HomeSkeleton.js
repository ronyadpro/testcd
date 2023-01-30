import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const HomeSkeleton = () => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (
        <div className="mb--80">
            <section className="hero-area hero-slider-2">
                <div className="container">
                    <div className="col-12 align-items-lg-center">
                        <div className="row">
                            <Skeleton height={350} width={'100%'} />
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------cat slider---------------------------- */}
            <section className="mt--10 mb--40 text-center">
                <div className="container " style={{ width: '100%' }}>
                    <div className="col-12">
                        <div className="row mx-auto d-flex justify-content-between">
                            {Array(width < 760 ? (width < 460 ? 3 : 4) : 6)
                                .fill()
                                .map((item, index) => (
                                    <div
                                        className="col-2 "
                                        style={
                                            width < 760 ? { padding: 0 } : {}
                                        }
                                        key={index}
                                    >
                                        <div className="row ">
                                            <Skeleton
                                                height={100}
                                                width={
                                                    width < 760 ? 90 : '100%'
                                                }
                                            />
                                            <Skeleton height={20} width={90} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mb--50">
                {Array(width < 984 ? 1 : 1)
                    .fill()
                    .map((item1, index1) => (
                        <section
                            key={index1}
                            className="section-margin mt--30 mb--50 text-center"
                        >
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
                                                        <Skeleton
                                                            height={220}
                                                            width={140}
                                                        />
                                                        <Skeleton
                                                            height={20}
                                                            width={100}
                                                        />
                                                        <Skeleton
                                                            height={20}
                                                            width={90}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
            </div>
        </div>
    );
};

export default HomeSkeleton;
