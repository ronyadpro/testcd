import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBooksByGenre } from '../../services/httpServices';
import Breadcrumb from '../common/Breadcrumb';
import CategorialBookSkeleton from '../skeletons/CategorialBookSkeleton';
import BooksList from './BookList';
import SectionHeader from './../common/SectionHeader';
const FilterByGenre = ({ booksContent, code }) => {
    const [data, setData] = useState(booksContent);
    const [books, setBooks] = useState(booksContent?.data);
    const [currentPage, setCurrentPage] = useState(2);

    const scrollNext = async () => {
        if (currentPage <= data?.pagelimit) {
            const formData = {
                page: currentPage,
                genrecode: code
            };

            const nextContent = await getBooksByGenre(formData);

            if (nextContent.status.responseCode === '1') {
                setData(nextContent.data);
                setBooks(books.concat(nextContent?.data.data));
            } else {
                alert('No Data Found!');
            }
        }
        setCurrentPage(currentPage + 1);
    };
    return (
        <div>
            {/* <section className="breadcrumb-section">
                <h2 className="sr-only">Site Breadcrumb</h2>
                <div className="container">
                    <div className="breadcrumb-contents">
                        <div className="row">
                            <div className="col-lg-2">
                                <Breadcrumb from={data?.genre_en} />
                            </div>
                            <div className="col-lg-10">
                                <div className="mt--10 ml-sectionheading">
                                    <h3>{data?.genre_en}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
             <SectionHeader title={data?.genre_en} />
            <div className="container">
                <main className="inner-page-sec-padding-bottom">
                    <div className="container">
                        <InfiniteScroll
                            style={{ overflow: 'visible' }}
                            dataLength={books?.length}
                            next={scrollNext}
                            scrollThreshold={0.5}
                            hasMore={
                                data?.pagelimit < currentPage ? false : true
                            }
                            loader={<CategorialBookSkeleton />}
                            // loader={<h4 className="text-center">Loading...</h4>}
                        >
                            <BooksList booklist={books} />
                        </InfiniteScroll>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FilterByGenre;
