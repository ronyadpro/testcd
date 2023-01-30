import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const BookDetailsSkeleton = () => {
    return (
        <div>
            <section className="breadcrumb-section">
                <h2 className="sr-only">Site Breadcrumb</h2>
                <div className="container">
                    <div className="breadcrumb-contents">
                        <nav aria-label="breadcrumb">
                            <div className="row">
                                <Skeleton height={20} width={'30%'} />
                            </div>
                        </nav>
                    </div>
                </div>
            </section>

            <div className="container mt--50">
                <div className="row">
                    <div className="col-lg-5 mb--30 text-center pl-50">
                        <div className="row">
                            <Skeleton height={540} width={'90%'} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="product-details-info">
                            <h3 className="product-title">
                                <div className="row">
                                    <Skeleton height={30} width={'90%'} />
                                </div>

                                {/* {isBangla ? bookData.name_bn : bookData.name_en} */}
                            </h3>

                            <ul className="list-unstyled">
                                <div className="row mt--15">
                                    <Skeleton height={20} width={'40%'} />
                                </div>

                                <div className="row mt--15">
                                    <Skeleton height={20} width={'40%'} />
                                </div>
                                <div className="row mt--15">
                                    <Skeleton height={30} width={'40%'} />
                                </div>

                                <div className="lggenrelist">
                                    <div className="row mt--15">
                                        <Skeleton height={35} width={'60%'} />
                                    </div>
                                </div>

                                <div className="row mt--15">
                                    <Skeleton height={40} width={'40%'} />
                                </div>
                                <div className="row mt--20">
                                    <Skeleton height={20} width={'60%'} />
                                </div>
                                <div className="row mt--25">
                                    <Skeleton
                                        height={20}
                                        width={'90%'}
                                        count={2}
                                    />
                                </div>
                                <div className="row">
                                    <Skeleton height={20} width={'40%'} />
                                </div>
                            </ul>

                            <div className="row mt--15">
                                <Skeleton height={40} width={'70%'} />
                            </div>
                            <div className="row mt--15">
                                <Skeleton height={20} width={'60%'} />
                            </div>
                            <div className="compare-wishlist-row "></div>
                        </div>
                    </div>
                </div>
                <div className="container pt--30" id="summery-t">
                    <div className="col-lg-12">
                        <div className="sb-custom-tab review-tab mt--50 mtsm--30">
                            <div className="row text-center">
                                <div className="col">
                                    <div className="row">
                                        <Skeleton height={20} width={'40%'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <Skeleton height={20} width={'40%'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <Skeleton height={20} width={'40%'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-content space-db--20"
                            id="myTabContent"
                        >
                            <div className="row text-center mt--15">
                                <Skeleton height={20} width={'90%'} count={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsSkeleton;
