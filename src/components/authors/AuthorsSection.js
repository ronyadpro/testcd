import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAuthorList } from '../../services/httpServices';
import AuthorsSkeleton from '../skeletons/AuthorsSkeleton';
import AuthorSectionItem from './AuthorSectionItem';

const AuthorsSection = ({ authorsContent }) => {
    const [currentPage, setCurrentPage] = useState(2);
    const [headData, setHeadData] = useState(authorsContent);
    const [authorsData, setAuthorData] = useState(authorsContent?.contents);
    const [isLoading, setIsLoading] = useState(true);

    const scrollNext = async () => {
        if (currentPage <= headData?.pagelimit) {
            const formData = {
                page: currentPage
            };
            const nextContent = await getAuthorList(formData);

            if (nextContent.status.responseCode === '1') {
                setHeadData(nextContent.data);
                setAuthorData(authorsData.concat(nextContent?.data.contents));
                // console.log('From Next Content', nextContent);
            } else {
                alert('No Data Found!');
            }
        }
        setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <InfiniteScroll
                        style={{ overflow: 'visible' }}
                        dataLength={authorsData?.length}
                        next={scrollNext}
                        scrollThreshold={0.6}
                        hasMore={
                            authorsContent?.pagelimit < currentPage
                                ? false
                                : true
                        }
                        loader={<AuthorsSkeleton />}
                    >
                        <div className="shop-product-wrap grid with-pagination row space-db--20 shop-border">
                            {authorsData.map((content) => (
                                <AuthorSectionItem
                                    key={content.authorcode}
                                    content={content}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </main>
        </div>
    );
};

export default AuthorsSection;
