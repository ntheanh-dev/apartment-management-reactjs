import axios from 'axios';
import cookie from 'react-cookies';
const BASE_URL = 'http://localhost:8080/ApartmentManagement/api/';

export const endPoints = {
    items: (param) => `items/${param}`,
    postItems: 'items/',
    relatives: 'relatives/',
    addRelative: 'relatives/add/',
};

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            // Authorization: cookie.load('token'),
            Authorization:
                'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbmhUaGVOZ3V5ZW4iLCJleHAiOjE3MTg1Mjg5MjAsInVzZXJJZCI6MTM1LCJpYXQiOjE3MTg0NDI1MjAsImp0aSI6IjgxZWIzMjQ0LWM0Y2YtNDZhZS04Zjg4LTRkYmI2MjMyNmQwNyIsInVzZXJuYW1lIjoiYWRtaW4xIn0.1v9oYe7U3Q6YoHxm_ty0p5PcE-xDR1A6pPXBjf8Z0Rg',
        },
    });
};

export default axios.create({
    baseURL: BASE_URL,
});
