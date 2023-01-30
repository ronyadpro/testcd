import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    getBooksBySection,
    getBundleBooksBySection
} from '../../services/httpServices';
import SectionHeader from '../common/SectionHeader';
import CategorialBookSkeleton from '../skeletons/CategorialBookSkeleton';
import useAuth from './../../hooks/useAuth';
import BooksList from './BookList';
const FilterBySection = ({ booksContent, code }) => {
    const [data, setData] = useState(booksContent);
    const [books, setBooks] = useState(booksContent?.contents);
    const [currentPage, setCurrentPage] = useState(2);
    const router = useRouter();
    const { user } = useAuth();

    //subscription

    const routeFrom = router.asPath.split('/')[2];

    const scrollNext = async () => {
        if (currentPage <= data?.pagelimit) {
            const formData = {
                page: currentPage,
                catcode: code,
                msisdn: user?.msisdn || ''
            };
            let nextContent = {};
            if (routeFrom === 'bundleSection') {
                nextContent = await getBundleBooksBySection(formData);
            } else {
                nextContent = await getBooksBySection(formData);
            }

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
            <SectionHeader title={data?.catname_bn} />
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

export default FilterBySection;
