import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import ButtonToggle from './ButtonToggle';
import CustomPlayer from './customplayer/CustomPlayer';
const AudioPlayer = ({ audiotracks, previews, access }) => {
    const router = useRouter();
    const [audioUrl, setAudioUrl] = useState('');
    const playerRef = useRef();
    const [control, setControl] = useState(false);

    function playFunc() {
        playerRef.current.play();
    }
    function pauseFunc() {
        playerRef.current.pause();
    }

    const [trackId, setTrackId] = useState('');

    const [curTime, setCurtime] = useState(0);

    const playAudio = (tracks) => {
        console.log(tracks);
        console.log(playerRef.current.currentTime);

        setControl(false);
        if (tracks.id !== trackId && playerRef.current.paused) {
            // console.log('play new');
            setTrackId(tracks.id);
            setAudioUrl(tracks.url);
            const myTimeout = setTimeout(playFunc, 10);
        } else {
            if (!playerRef.current.paused) {
                // console.log('pause ok');
                pauseFunc();
            } else {
                // console.log('play');

                const myTimeout = setTimeout(playFunc, 10);
            }
        }
    };

    const activeStyle = {
        backgroundColor: 'rgb(0,172,177)',
        color: 'rgb(255, 255, 255)'
    };
    const handleSubs = () => {
        Swal.fire({
            icon: 'info',
            title: 'সাবস্ক্রাইব করুন',
            confirmButtonText: 'Get a subscription',
            confirmButtonColor: '#00ACB1'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/subscribe');
            }
        });
    };

    return (
        <div>
            <div>
                {audiotracks?.map((track, index) => (
                    <div
                        key={index}
                        className="audiobooklist"
                        id="audiobooklist1"
                        style={trackId === track.id ? activeStyle : {}}
                    >
                        <div className="listitem lgscreen">
                            <div className="row">
                                <div
                                    className="state"
                                    style={{ display: 'none' }}
                                    id="status1"
                                >
                                    play
                                </div>
                                <div className="col-1">
                                    <div className="slnumber">
                                        <strong>{index + 1}</strong>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="title">
                                        <strong>{track.title_bn}</strong>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="duration">
                                        <strong>{track.filelength}</strong>
                                    </div>
                                </div>
                                {access === 1 ? (
                                    <div className="col-1 ">
                                        <button
                                            onClick={() => {
                                                playAudio(track);
                                            }}
                                        >
                                            {trackId === track.id ? (
                                                <ButtonToggle
                                                    state={
                                                        playerRef.current.played
                                                    }
                                                />
                                            ) : (
                                                <div>
                                                    <AiFillPlayCircle
                                                        size={25}
                                                    />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="col-1 ">
                                        <button onClick={handleSubs}>
                                            <AiFillPlayCircle size={25} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="listitem  smscreen">
                            <div className="row ">
                                <div
                                    className="state"
                                    style={{ display: 'none' }}
                                    id="status"
                                >
                                    play
                                </div>
                                <div className="col-1">
                                    <div className="slnumber">
                                        <strong> {index + 1} </strong>
                                    </div>
                                </div>
                                <div className="col-5  ">
                                    <div className="audiotitle">
                                        <strong> {track.title_bn}</strong>
                                    </div>
                                </div>

                                <div className="col-3  ">
                                    <div className="duration">
                                        <strong>{track.filelength}</strong>
                                    </div>
                                </div>
                                {access === 1 ? (
                                    <div className="col-2 ">
                                        <button
                                            onClick={() => {
                                                playAudio(track);
                                            }}
                                        >
                                            {trackId === track.id ? (
                                                <ButtonToggle
                                                    state={
                                                        playerRef.current.played
                                                    }
                                                />
                                            ) : (
                                                <div>
                                                    <AiFillPlayCircle
                                                        size={25}
                                                    />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="col-2 ">
                                        <button onClick={handleSubs}>
                                            <AiFillPlayCircle size={25} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row justify-content-center audioPlayer">
                <CustomPlayer
                    src={audioUrl}
                    playerRef={playerRef}
                    controls={control}
                    width="10%"
                    height="50"
                    hlsConfig={{
                        maxLoadingDelay: 4,
                        minAutoBitrate: 0,
                        lowLatencyMode: true
                    }}
                />
            </div>
            <div className=""></div>
        </div>
    );
};

export default React.memo(AudioPlayer);
