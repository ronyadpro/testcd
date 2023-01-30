import React, { useState } from 'react';
import { getHomePaginatedAxios } from '../../services/httpServices';
import tokenGenrator from '../../utils/tokenGenerator';
import useAuth from './../../hooks/useAuth';
import { getBundlePaginatedAxios } from './../../services/httpServices';
import Home from './Home';

const Content = ({ content, isSubsBook }) => {
    const [data, setData] = useState(content?.data);
    const [currentPage, setCurrentPage] = useState(2);
    const [totalpage, setTotalPage] = useState(content?.pagination?.totalpage);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    let token = tokenGenrator(5);

    const scrollNext = async () => {
        if (currentPage <= totalpage) {
            const formData = {
                page: currentPage,
                token: token,
                msisdn: user?.msisdn || ''
            };

            let nextContent = {};
            if (isSubsBook) {
                nextContent = await getBundlePaginatedAxios(formData);
            } else {
                nextContent = await getHomePaginatedAxios(formData);
            }

            // console.log('From Next Content', nextContent);

            if (nextContent?.status?.responseCode === '1') {
                setData(data.concat(nextContent.data));
            } else {
                setData(data.concat([]));
            }
        }
        setCurrentPage(currentPage + 1);
    };
    return (
        <div>
            <Home
                data={data}
                totalpage={totalpage}
                currentPage={currentPage}
                scrollNext={scrollNext}
                isSubsBook={isSubsBook}
            />
        </div>
    );
};

export default Content;
