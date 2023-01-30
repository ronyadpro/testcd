import { useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
const ScrollTop = () => {
    const [hover, setHover] = useState(false);

    const styleScrollToTop = { zIndex: 1001, bottom: '4rem' };
    const toggleHover = () => {
        // console.log('okkk');
        styleScrollToTop = {
            zIndex: 1001,
            bottom: '4rem',
            backgroundColor: 'red'
        };
    };
    return (
        <ScrollToTop
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            smooth
            style={
                hover
                    ? {
                          ...styleScrollToTop,
                          backgroundColor: '#2d6e8e'
                      }
                    : styleScrollToTop
            }
            component={hover ? <IconWhite /> : <Icon />}
        />
    );
};

export default ScrollTop;

const Icon = () => {
    return (
        <div>
            <i
                style={{
                    display: 'block',
                    padding: 0,
                    margin: 0
                }}
                className="fas fa-chevron-up"
            ></i>
        </div>
    );
};
const IconWhite = () => {
    return (
        <div>
            <i
                style={{
                    display: 'block',
                    padding: 0,
                    margin: 0,
                    color: 'white'
                }}
                className="fas fa-chevron-up"
            ></i>
        </div>
    );
};
