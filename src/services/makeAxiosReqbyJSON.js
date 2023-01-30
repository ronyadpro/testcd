import axios from 'axios';
function makeAxiosReqbyJSON(url, data) {
    return axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then((res) => {
            if (res.data?.status?.responseCode === '1') {
                return res.data;
            } else {
                return res.data || {};
            }
        })
        .catch((err) => {
            if (err.response) {
                /* 
            The request was made and the server responded with a status code
            that falls out of the range of 2xx
          */
                throw err.response.data;
            } else if (err.request) {
                // Client never received a response, or request never left
                throw err.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Error: ${err.message}`);
            }
        });
}

export default makeAxiosReqbyJSON;
