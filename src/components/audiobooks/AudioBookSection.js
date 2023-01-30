import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAudioBooks } from '../../services/httpServices';
import Breadcrumb from '../common/Breadcrumb';
import AudioBooksSkeleton from '../skeletons/AudioBooksSkeleton';
import AudioBookCard from './AudioBookCard';
const AudioBookSection = ({ audioContent }) => {
    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    const [data, setData] = useState(audioContent);
    const [books, setBooks] = useState(audioContent?.contents);
    const [currentPage, setCurrentPage] = useState(2);
    const scrollNext = async () => {
        if (currentPage <= data?.pagelimit) {
            const formData = {
                page: currentPage
            };

            const nextContent = await getAudioBooks(formData);

            if (nextContent.status.responseCode === '1') {
                setData(nextContent.data);
                setBooks(books.concat(nextContent?.data.contents));
            } else {
                alert('No Data Found!');
            }
        }
        setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <section className="breadcrumb-section">
                <h2 className="sr-only">Site Breadcrumb</h2>
                <div className="container">
                    <div className="breadcrumb-contents">
                        <div className="row">
                            <div className="col-lg-3">
                                <Breadcrumb from={' Audio Books'} />
                            </div>
                            <div className="col-lg-9">
                                <div className="mt--10 text-center">
                                    <h3>Audio Book</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="contaniner">
                <div id="post-audiobook">
                    <main className="inner-page-sec-padding-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 order-lg-2">
                                    <div className="audiobanner">
                                        <Link href="/book/AMAHA099" passHref>
                                            <img src="https://boighor.com/image/audioimg.jpg" />
                                        </Link>
                                    </div>

                                    {/* Show Audio books  */}

                                    <InfiniteScroll
                                        style={{ overflow: 'visible' }}
                                        dataLength={books?.length}
                                        next={scrollNext}
                                        hasMore={
                                            data?.pagelimit === currentPage
                                                ? false
                                                : true
                                        }
                                        loader={
                                            <div>
                                                <AudioBooksSkeleton />
                                            </div>
                                        }
                                    >
                                        <div className="shop-product-wrap grid with-pagination row mt--30 space-db--30 shop-border">
                                            {books.map((book) => (
                                                <AudioBookCard
                                                    key={book.bookcode}
                                                    book={book}
                                                />
                                            ))}
                                        </div>
                                    </InfiniteScroll>
                                </div>
                                <div
                                    className="col-lg-3  mt--40 mt-lg--0"
                                    style={
                                        width < 480 ? { display: 'none' } : {}
                                    }
                                >
                                    <div className="inner-page-sidebar">
                                        {/* <!-- Accordion --> */}
                                        <div className="single-block">
                                            <h3 className="sidebar-title">
                                                popular Categories
                                            </h3>
                                            <ul className="sidebar-menu--shop">
                                                <li>
                                                    <Link href="/contents/category/str">
                                                        গল্প (297)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/bio">
                                                        জীবনী (5)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/cmx">
                                                        কমিকস (11)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/otr">
                                                        বিবিধ (20)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/pom">
                                                        কবিতা (64)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/nov">
                                                        উপন্যাস (449)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/drm">
                                                        নাটক (10)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/atc">
                                                        প্রবন্ধ (44)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/trv">
                                                        ভ্রমণ (8)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/category/mem">
                                                        স্মৃতিকথা (7)
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <!-- Price --> */}
                                        <div className="single-block">
                                            <h3 className="sidebar-title">
                                                popular Genres
                                            </h3>
                                            <ul className="sidebar-menu--shop">
                                                <li>
                                                    <Link href="/contents/genre/pal">
                                                        মনস্তাত্ত্বিক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/pat">
                                                        দেশাত্মবোধক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/mys">
                                                        রহস্য
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/htl">
                                                        ঐতিহাসিক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/adv">
                                                        অ্যাডভেঞ্চার
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/thr">
                                                        থ্রিলার
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/tnn">
                                                        কিশোর
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/lov">
                                                        প্রেম
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/fic">
                                                        ফিকশন
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/sco">
                                                        সামাজিক ভাষ্য
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/ptl">
                                                        রাজনৈতিক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/cla">
                                                        চিরায়ত
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/soc">
                                                        সামাজিক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/rea">
                                                        বাস্তবধর্মী
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/cld">
                                                        শিশুতোষ
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/rom">
                                                        রোমান্টিক
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/spn">
                                                        উৎকণ্ঠা
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/lib">
                                                        মুক্তিযুদ্ধ
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/wom">
                                                        নারী
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/contents/genre/srl">
                                                        ধারাবাহিক
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AudioBookSection;
