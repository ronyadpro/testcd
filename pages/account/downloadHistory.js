import React from 'react';
import DownloadHistory from '../../src/components/account/DownloadHistory';
import AccountLayout from '../../src/components/layout/AccountLayout';

const downloadHistory = () => {
    return <DownloadHistory />;
};
downloadHistory.Layout = AccountLayout;
export default downloadHistory;
