import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="section-title section-header--bordered ">
            <h2> {title}</h2>
        </div>
    );
};

export default SectionHeader;
