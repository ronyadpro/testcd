import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ReaderMsg from './ReaderMsg';
const ReaderUserVerify = ({ encript }) => {
    const { user } = useAuth();
    const [ip, setIP] = useState('');
    const [access, setAccess] = useState(true);
    const getData = async () => {
        const res = await axios.get(
            'https://api.boighor.com/api/getappsettings?fromsrc=web'
        );
        setIP(res.data.data.ip_addr);
    };
    const readerRedirect = (bookcode, ip, msisdn) => {
        const readerUrl = process.env.NEXT_PUBLIC_READER_URL;
        // const readerUrl = 'http://localhost:3001/reader';
        const redirectTime = Date.now();
        const preEncriptStr = `${bookcode}////${redirectTime}////${ip}////${msisdn}`; //this is split by '////' from reader app.
        // console.log(preEncriptStr);
        const encriptedUrl = CryptoJS.AES.encrypt(
            JSON.stringify(preEncriptStr),
            'eb$bdre@derb0!gh0r##'
        ).toString();
        return `${readerUrl}/${encriptedUrl}`;
    };

    useEffect(() => {
        getData();

        if (encript && ip) {
            const decrypt = CryptoJS.AES.decrypt(
                encript.join('/'), //as encripted url, it gives '/' many times. so nextjs takes as diffrent route params. so ignore this issue to join via /
                'eb$bdre@derb0!gh0r##'
            );
            const decryptStr = decrypt.toString(CryptoJS.enc.Utf8);
            const decryptInfo = decryptStr.slice(1, -1).split('////'); // slice use for removeing quotation("") from first and last string.
            const [bookcode, reqTime, reqIP, msisdn] = decryptInfo;

            if (decryptInfo.length === 4 && user?.msisdn === msisdn) {
                setAccess(true);
                window.open(readerRedirect(bookcode, ip, msisdn), '_self'); // If matches userid thn it will redirect to the reader.
            } else {
                setAccess(false);
            }
        }
    }, [ip, encript]);

    return (
        <div>
            {access ? (
                <ReaderMsg msg={'Please wait...'} />
            ) : (
                <ReaderMsg msg={'Permissions not granted'} />
            )}
        </div>
    );
};

export default ReaderUserVerify;
