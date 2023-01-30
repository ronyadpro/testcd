import React, { useEffect, useState } from 'react';

const DisplayAppInhome = () => {
    const [appstore, setAppstore] = useState(false);

    const [width, setWidth] = useState(990);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    const openApp = () => {
        window.open(`http://onelink.to/ud682n`);
    };

    if (width < 680) {
        return (
            <div
                className="card "
                style={{
                    position: 'fixed',
                    width: '100%',
                    zIndex: 1000,
                    bottom: '0',
                    height: '70px',
                    borderTop: '1px solid #B8B8B8',
                    padding: '0 0 0 10px'
                }}
            >
                <div className="card-body " style={{ paddingTop: '10px' }}>
                    <div className="row">
                        <div
                            className="col-2"
                            style={{ padding: '5px', marginBottom: '2px' }}
                        >
                            <img
                                width={40}
                                src="/assets/image/fav-icon.png"
                                alt="app logo"
                            />
                        </div>

                        <div className="col-6">
                            <h6
                                style={{
                                    fontSize: '1.0rem',
                                    marginBottom: '1px'
                                }}
                            >
                                Boighor
                            </h6>
                            <p
                                style={{
                                    fontSize: '.8rem',
                                    marginBottom: '1px'
                                }}
                            >
                                Download Boighor App
                            </p>
                        </div>
                        <div className="col-4 align-self-center">
                            <button
                                onClick={openApp}
                                style={{
                                    padding: '2px 8px',
                                    borderRadius: '25px',
                                    backgroundColor: 'rgb(0,172,177)',
                                    color: '#ffff',
                                    fontWeight: '500'
                                }}
                            >
                                Open App
                            </button>
                        </div>
                    </div>

                    {/* <div className="d-flex justify-content-evenly">
                    <div className="newsletter-form footeritem">
                        <button onClick={() => setAppstore(true)}>
                            <img
                                width="160"
                                height={50}
                                src="image/appstore.png"
                                alt="appstore"
                            />
                        </button>
                    </div>

                    <div className="newsletter-form footeritem">
                        <button onClick={() => setPlaystore(true)}>
                            <img
                                width="160"
                                height={50}
                                src="image/google.png"
                                alt="playstore"
                            />
                        </button>
                    </div>
                </div> */}
                </div>
            </div>
        );
    }
    return <div></div>;
};

export default DisplayAppInhome;
