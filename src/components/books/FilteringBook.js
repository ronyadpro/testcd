import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBooksByCategory } from '../../services/httpServices';
import CategorialBookSkeleton from '../skeletons/CategorialBookSkeleton';
import SectionHeader from './../common/SectionHeader';
import BooksList from './BookList';
const FilteringBook = ({ booksContent, type, code }) => {
    const [data, setData] = useState(booksContent);
    const [books, setBooks] = useState(booksContent?.data);
    const [currentPage, setCurrentPage] = useState(2);

    const scrollNext = async () => {
        // console.log(currentPage);
        if (currentPage <= data?.pagelimit) {
            const formData = {
                page: currentPage,
                catcode: code
            };

            const nextContent = await getBooksByCategory(formData);

            if (nextContent.status.responseCode === '1') {
                setData(nextContent.data);
                setBooks(books.concat(nextContent?.data.data));

                // console.log('From Next Content', nextContent);
            } else {
                alert('No Data Found!');
            }
        }
        setCurrentPage(currentPage + 1);
    };
    // console.log(books);

    return (
        <div>
            {/* <div className="row">
                <div className="col-lg-2">
                    <Breadcrumb
                        from={
                            type === 'genre' ? data?.genre_en : data?.catname_en
                        }
                    />
                </div>
                <div className="col-lg-10">
                    <div className="mt--10 ml-sectionheading">
                        <h3>
                            {type === 'genre'
                                ? data?.genre_en
                                : data?.catname_en}
                        </h3>
                    </div>
                </div>
            </div> */}

            {/* <div className="text-center mt-3 mb-5">
                <h3> {type === 'genre' ? data?.genre_en : data?.catname_en}</h3>
            </div> */}


            <SectionHeader title={type === 'genre' ? data?.genre_en : data?.catname_en} />

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
                        >
                            <BooksList booklist={books} />
                        </InfiniteScroll>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FilteringBook;
