import axios from "axios";

const _baseAPI = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const getData = async (url) => await axios.get(_baseAPI + url);

export const postData = async (url, token, data) => await axios({
    method: 'post',
    url: _baseAPI + url,
    headers: {
        'Token': token
    },
    data: data
});