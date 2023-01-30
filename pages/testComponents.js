import React, { useState } from 'react';
import AudioBooksSkeleton from '../src/components/skeletons/AudioBooksSkeleton';
import AuthorsSkeleton from '../src/components/skeletons/AuthorsSkeleton';
import CategorialBookSkeleton from '../src/components/skeletons/CategorialBookSkeleton';
// import { ReactReader } from 'react-reader';
function Test() {
    const [location, setLocation] = useState(null);
    const locationChanged = (epubcifi) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi);
    };
    return (
        <div className="container">
            <CategorialBookSkeleton />
            <AuthorsSkeleton />
            <AudioBooksSkeleton />
        </div>
    );
}
export default Test;
