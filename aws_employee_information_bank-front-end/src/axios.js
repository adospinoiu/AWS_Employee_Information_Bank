import axios from 'axios';

const instance = axios.create({
    // For Development
    baseURL: "http://localhost:3000"

    // For Production
    // baseURL:
})

export default instance;