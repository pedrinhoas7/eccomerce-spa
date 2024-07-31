import axios from 'axios';

const http = axios.create({
    baseURL: "https://localhost:7165",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Allow-Control-Allow-Origin": "*"
    }
});

export default http;