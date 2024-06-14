import axios from 'axios';
import cookie from 'react-cookies';
const BASE_URL = 'http://localhost:8080/ApartmentManagement/api/';

export const endPoints = {
    items: (param) => `items/${param}`,
    postItems: 'items/',
};

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: cookie.load('token'),
        },
    });
};

export default axios.create({
    baseURL: BASE_URL,
});
