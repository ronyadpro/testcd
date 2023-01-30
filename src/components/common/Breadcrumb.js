import React from 'react';
import Link from 'next/link'
const Breadcrumb = ({ from }) => {
    return (
        <section className="breadcrumb-section mb-3">
            <h2 className="sr-only">Site Breadcrumb</h2>
            <div className="container">
                <div className="breadcrumb-contents">
                    <nav aria-label="breadcrumb">
                        {/* <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/" style={{ fontWeight: 'bold' }} passHref>
                                    <a>Home</a>  
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">{from}</li> 
                        
                        </ol> */}
                        <Link href="/"  passHref>
                                    <a style={{ fontWeight:'bold'}}>Home</a>  
                        </Link>  <i className="fas fa-chevron-right pe-2" style={{ fontSize:'12px' }} ></i><span style={{color:'#7F8091'}}>{from}</span> 
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;
