import axios from 'axios';

const api = axios.create({
    baseURL: 'https://viniciuscondev-strapi-api.herokuapp.com/',
    headers: {'Content-Type': 'application/json'}
});

export default api;