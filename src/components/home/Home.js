import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoriesSlider from '../custom/slider/CategoriesSlider';
import BookLoadinSkeleton from '../skeletons/BookLoadingSkeleton';
import AuthorRow from './AuthorRow';
import Banner from './Banner';
import BookRow from './BookRow';
// import TopGenresRow from './TopGenresRow';
const Home = ({ data, totalpage, scrollNext, currentPage, isSubsBook }) => {
    const callComponent = (mainObject, index) => {
        if (mainObject.itemtype === '5') {
            return (
                <div key={`${index}+${mainObject.catcode}`}>
                    <Banner contents={mainObject.contents} />
                    <CategoriesSlider />
                </div>
            );
        } else if (
            mainObject.itemtype === '1' &&
            mainObject.contents.length != 0
        ) {
            return (
                <BookRow
                    key={`${index}+${mainObject.catcode}`}
                    catcode={mainObject.catcode}
                    title={mainObject.catname_bn}
                    contents={mainObject.contents}
                    isSubsBook={isSubsBook}
                />
            );
        } else if (
            mainObject.itemtype === '3' &&
            mainObject.contents.length != 0
        ) {
            return (
                <AuthorRow
                    key={`${index}+${mainObject.catcode}`}
                    title={mainObject.catname_bn}
                    contents={mainObject.contents}
                />
            );
        } else if (mainObject.itemtype === '7') {
            return;
        }
    };
    return (
        <div>
            {/* <Banner /> */}

            <InfiniteScroll
                dataLength={data?.length}
                next={scrollNext}
                hasMore={totalpage < currentPage ? false : true}
                scrollThreshold={0.5}
                loader={<BookLoadinSkeleton />}
            >
                {data?.map((mainObject, index) =>
                    callComponent(mainObject, index)
                )}
            </InfiniteScroll>
        </div>
    );
};

export default Home;
