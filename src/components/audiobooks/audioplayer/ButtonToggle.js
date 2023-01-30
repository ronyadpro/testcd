import React, { useState } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
const ButtonToggle = ({ state }) => {
    const [buttonToogle, setButtonToggle] = useState(true);
    return (
        <div>
            <div
                onClick={() => setButtonToggle(!buttonToogle)}
                className="text-white"
            >
                {buttonToogle ? (
                    <AiFillPauseCircle size={25} />
                ) : (
                    <AiFillPlayCircle size={25} />
                )}
                {/* <img
                    id="playbuttonsm1"
                    src={
                        buttonToogle
                            ? 'https://boighor.com/image/pausenow.png'
                            : 'https://boighor.com/image/playnow.png'
                    }
                    alt=""
                    style={{ width: '30px' }}
                /> */}
            </div>
        </div>
    );
};

export default ButtonToggle;
