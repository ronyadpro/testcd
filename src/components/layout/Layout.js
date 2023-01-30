import React from 'react';
import Footer from '../common/footer/Footer';
import Header from '../common/Header';
import DisplayAppInhome from '../others/DisplayAppInhome';
const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <DisplayAppInhome />
            <Footer />
        </>
    );
};

export default Layout;
