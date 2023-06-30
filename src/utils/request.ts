import {Toast} from '@/components/Toast/Toast';

import axios from 'axios';
import {BASE_URL} from '../../config';

// Create an axios instance
const whiteList = [];
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 1 * 1000, // request timeout
});

export const post = async (api, options = {}, config = {}) => {
    const response = await service.post(api, options, config);
    return response;
};

export const get = async (api, config = {}) => {
    const response = await service.get(api, config);
    return response;
};

service.interceptors.response.use(
    (response) => {
        // debugger;

        const res = response.data;
        // if the custom code is not 20000, it is judged as an error.
        if (response.status !== 200) {
                
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return response;
        }
    },
    (error) => {
        // debugger;

        let status = error.response ? error.response.status : false;
        if (!whiteList.includes(error.config.url)) {
            let message;
            if (status) {
                message = error.response.data.message;
                return error.response;
            } else {
                message = 'Vui lòng kiểm tra kết nối mạng!';
            }
            Toast.show(message);
        }

        return Promise.reject(error);
    },
);

export default service;
