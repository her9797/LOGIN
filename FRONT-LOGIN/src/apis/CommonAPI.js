import axios from "axios";

const DOMAIN = 'http://localhost:8080';

export const request = async (method, url, data) => {

    try {
        console.log('request data:', data);
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data,
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                // ContentType: 'application/json'
            },
        });

        // console.log('[request] response.data.results.result : ', response.data.results.result);
        console.log('[request] response : ', response);
        return {response};

    } catch (error) {
        console.error('API request error : ', error);
        throw error;
    }
};