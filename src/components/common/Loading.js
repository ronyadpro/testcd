import React, { useEffect } from 'react';
import { FillingBottle } from 'react-cssfx-loading';
export default function Loading() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [typeof window]);
    return (
        <div
            className=" d-flex align-items-center justify-content-center"
            style={{ width: '100%', height: '68vh' }}
        >
            <div className="d-flex align-items-center justify-content-center">
                <h1 className="me-3">Please wait</h1>
                <FillingBottle color="#00ACB1" />
            </div>
        </div>
    );
}
